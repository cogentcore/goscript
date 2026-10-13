package main

import "sync"

type embeddedMutex struct {
	sync.Mutex
	value int
}

type embeddedRWMutex struct {
	sync.RWMutex
	value int
}

// queue uses the zero value of sync.Cond, setting its Locker lazily, as in
// a struct that holds both the mutex and the condition.
type queue struct {
	Mu    sync.Mutex
	Cond  sync.Cond
	items []int
}

func (q *queue) lockAndInit() {
	q.Mu.Lock()
	if q.Cond.L == nil {
		q.Cond.L = &q.Mu
	}
}

func (q *queue) push(v int) {
	q.lockAndInit()
	q.items = append(q.items, v)
	q.Cond.Signal()
	q.Mu.Unlock()
}

func (q *queue) pop() int {
	q.lockAndInit()
	defer q.Mu.Unlock()
	for len(q.items) == 0 {
		q.Cond.Wait()
	}
	v := q.items[0]
	q.items = q.items[1:]
	return v
}

func main() {
	// Test Mutex
	var mu sync.Mutex
	mu.Lock()
	println("Mutex locked")
	mu.Unlock()
	println("Mutex unlocked")

	var embedded embeddedMutex
	embedded.Lock()
	embedded.value = 7
	embedded.Unlock()
	println("Embedded Mutex value:", embedded.value)

	var embeddedRW embeddedRWMutex
	embeddedRW.RLock()
	println("Embedded RWMutex read lock")
	embeddedRW.RUnlock()
	embeddedRW.Lock()
	embeddedRW.value = 9
	embeddedRW.Unlock()
	println("Embedded RWMutex value:", embeddedRW.value)

	// Test TryLock
	if mu.TryLock() {
		println("TryLock succeeded")
		mu.Unlock()
	} else {
		println("TryLock failed")
	}

	// Test WaitGroup
	var wg sync.WaitGroup
	wg.Add(1)
	println("WaitGroup counter set to 1")
	wg.Done()
	println("WaitGroup counter decremented")
	wg.Wait()
	println("WaitGroup wait completed")

	// Test Once
	var once sync.Once
	counter := 0
	once.Do(func() {
		counter++
		println("Once function executed, counter:", counter)
	})
	once.Do(func() {
		counter++
		println("This should not execute")
	})
	println("Final counter:", counter)

	// Test OnceFunc
	onceFunc := sync.OnceFunc(func() {
		println("OnceFunc executed")
	})
	onceFunc()
	onceFunc() // Should not execute again

	// Test OnceValue
	onceValue := sync.OnceValue(func() int {
		println("OnceValue function executed")
		return 42
	})
	val1 := onceValue()
	val2 := onceValue()
	println("OnceValue results:", val1, val2)

	// Test sync.Map
	var m sync.Map
	m.Store("key1", "value1")
	println("Stored key1")

	if val, ok := m.Load("key1"); ok {
		println("Loaded key1:", val)
	}

	if val, loaded := m.LoadOrStore("key2", "value2"); !loaded {
		println("Stored key2:", val)
	}

	if val, loaded := m.Swap("key2", "value3"); loaded {
		println("Swapped key2 previous:", val)
	}
	if val, ok := m.Load("key2"); ok {
		println("Loaded key2 after swap:", val)
	}
	if !m.CompareAndDelete("key2", "other") {
		println("CompareAndDelete mismatch preserved key2")
	}
	if m.CompareAndDelete("key2", "value3") {
		println("CompareAndDelete removed key2")
	}
	if _, ok := m.Load("key2"); !ok {
		println("key2 compare deleted successfully")
	}

	m.Range(func(key, value any) bool {
		println("Range:", key, "->", value)
		return true
	})

	m.Delete("key1")
	if _, ok := m.Load("key1"); !ok {
		println("key1 deleted successfully")
	}

	// Test Pool
	pool := &sync.Pool{
		New: func() any {
			println("Pool creating new object")
			return "new object"
		},
	}

	obj1 := pool.Get()
	println("Got from pool:", obj1)
	pool.Put("reused object")
	obj2 := pool.Get()
	println("Got from pool:", obj2)

	condZeroValue()

	println("test finished")
}

// condZeroValue waits on a Cond whose Locker is set after its zero value
// to the address of a Mutex field.
func condZeroValue() {
	var zero sync.Cond
	println("zero L is nil:", zero.L == nil)

	// The consumer starts first and each push waits for its pop to print,
	// so that the consumer waits on the Cond for every value.
	q := &queue{}
	started := make(chan bool)
	results := make(chan int)
	go func() {
		started <- true
		for range 3 {
			results <- q.pop()
		}
	}()
	<-started
	for i := 1; i <= 3; i++ {
		q.push(i * 10)
		println("got:", <-results)
	}

	c := sync.NewCond(&sync.Mutex{})
	println("NewCond L is nil:", c.L == nil)
}
