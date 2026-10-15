package main

import "sync"

// A Lock is sync when no critical section of its mutex, told apart by the
// struct field or package variable that holds it, can suspend.

// counter's critical sections never suspend, so its methods are sync.
type counter struct {
	mu sync.Mutex
	n  int
}

func (c *counter) add(k int) {
	c.mu.Lock()
	c.n += k
	c.mu.Unlock()
}

func (c *counter) get() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.n
}

// queue's push holds its lock across a channel send, so every Lock of
// queue.mu is async, also the one in size.
type queue struct {
	mu    sync.Mutex
	items []int
	ready chan int
}

func (q *queue) push(v int) {
	q.mu.Lock()
	q.items = append(q.items, v)
	q.ready <- v
	q.mu.Unlock()
}

func (q *queue) size() int {
	q.mu.Lock()
	defer q.mu.Unlock()
	return len(q.items)
}

// registry's reads and writes share an RWMutex package variable whose
// sections are sync.
var (
	registryMu sync.RWMutex
	registry   = map[string]int{}
)

func register(name string, v int) {
	registryMu.Lock()
	defer registryMu.Unlock()
	registry[name] = v
}

func lookup(name string) int {
	registryMu.RLock()
	v := registry[name]
	registryMu.RUnlock()
	return v
}

// shared's address escapes to code the analysis does not follow, so its
// Lock stays async.
type shared struct {
	mu sync.Mutex
	n  int
}

func lockWith(mu *sync.Mutex, f func()) {
	mu.Lock()
	defer mu.Unlock()
	f()
}

func (s *shared) inc() {
	s.mu.Lock()
	s.n++
	s.mu.Unlock()
}

// gate's poll holds the lock that TryLock took across a channel receive,
// so the Lock in open must wait for it.
type gate struct {
	mu      sync.Mutex
	started chan int
	wake    chan int
	log     []string
}

func (g *gate) poll() {
	if g.mu.TryLock() {
		g.log = append(g.log, "poll start")
		g.started <- 1
		<-g.wake
		g.log = append(g.log, "poll end")
		g.mu.Unlock()
	}
}

func (g *gate) open() {
	g.mu.Lock()
	g.log = append(g.log, "open")
	g.mu.Unlock()
}

// relay's begin returns holding the lock that end releases, so the Lock in
// open must wait across the receive between them.
type relay struct {
	mu      sync.Mutex
	started chan int
	wake    chan int
	log     []string
}

func (r *relay) begin(hold bool) bool {
	r.mu.Lock()
	if !hold {
		r.mu.Unlock()
		return false
	}
	r.log = append(r.log, "begin")
	return true
}

func (r *relay) end() {
	r.log = append(r.log, "end")
	r.mu.Unlock()
}

func (r *relay) run() {
	if r.begin(true) {
		r.started <- 1
		<-r.wake
		r.end()
	}
}

func (r *relay) open() {
	r.mu.Lock()
	r.log = append(r.log, "open")
	r.mu.Unlock()
}

// Once.Do and sync.Map suspend only when a function they call does.
var (
	setupOnce sync.Once
	setupDone int
	cache     sync.Map
)

func setup() int {
	setupOnce.Do(func() { setupDone++ })
	return setupDone
}

func cached(k string) int {
	if v, ok := cache.Load(k); ok {
		return v.(int)
	}
	cache.Store(k, len(k))
	return len(k)
}

func cacheSize() int {
	n := 0
	cache.Range(func(k, v any) bool {
		n++
		return true
	})
	return n
}

// sumAll's goroutine ranges over a channel, which suspends, though nothing
// else in it does.
var total int

func sumAll(ch chan int, wg *sync.WaitGroup) {
	go func() {
		defer wg.Done()
		for v := range ch {
			total += v
		}
	}()
}

func main() {
	c := &counter{}
	c.add(2)
	c.add(3)
	println("counter:", c.get())

	q := &queue{ready: make(chan int, 1)}
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		println("received:", <-q.ready)
	}()
	q.push(7)
	wg.Wait()
	println("queue:", q.size())

	register("a", 1)
	register("b", 2)
	println("lookup:", lookup("a")+lookup("b"))

	s := &shared{}
	s.inc()
	lockWith(&s.mu, func() { s.n += 10 })
	println("shared:", s.n)

	g := &gate{started: make(chan int), wake: make(chan int)}
	go g.poll()
	<-g.started
	go func() { g.wake <- 1 }()
	g.open()
	for _, entry := range g.log {
		println("gate:", entry)
	}

	r := &relay{started: make(chan int), wake: make(chan int)}
	go r.run()
	<-r.started
	go func() { r.wake <- 1 }()
	r.open()
	for _, entry := range r.log {
		println("relay:", entry)
	}

	println("setup:", setup(), setup())
	println("cached:", cached("abc"), cached("abc"), cacheSize())

	ch := make(chan int)
	var sums sync.WaitGroup
	sums.Add(1)
	sumAll(ch, &sums)
	ch <- 1
	ch <- 2
	close(ch)
	sums.Wait()
	println("total:", total)
}
