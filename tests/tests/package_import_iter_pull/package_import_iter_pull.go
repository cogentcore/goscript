package main

import "iter"

// count yields 0 through n-1 and reports each yield result.
func count(n int, log *[]string) iter.Seq[int] {
	return func(yield func(int) bool) {
		defer func() { *log = append(*log, "count done") }()
		for i := range n {
			if !yield(i) {
				*log = append(*log, "yield false")
				return
			}
		}
	}
}

// naturals yields the natural numbers without end.
func naturals(yield func(int) bool) {
	for i := 0; ; i++ {
		if !yield(i) {
			return
		}
	}
}

// pairs yields each key with its square.
func pairs(n int) iter.Seq2[int, int] {
	return func(yield func(int, int) bool) {
		for i := range n {
			if !yield(i, i*i) {
				return
			}
		}
	}
}

// doubled ranges over another sequence and yields each value twice over.
func doubled(seq iter.Seq[int]) iter.Seq[int] {
	return func(yield func(int) bool) {
		for v := range seq {
			if !yield(v * 2) {
				return
			}
		}
	}
}

// pullIterator holds the next and stop functions of one pulled sequence.
type pullIterator struct {
	next func() (int, bool)
	stop func()
}

// lexer emits values from a stack of pulled sequences, as chroma's
// LexerState does for nested lexers.
type lexer struct {
	stack []pullIterator
}

// push starts pulling seq on top of the stack.
func (l *lexer) push(seq iter.Seq[int]) {
	next, stop := iter.Pull(seq)
	l.stack = append(l.stack, pullIterator{next, stop})
}

// drain yields the values of the stack from the top down.
func (l *lexer) drain(yield func(int) bool) bool {
	for len(l.stack) > 0 {
		n := len(l.stack) - 1
		v, ok := l.stack[n].next()
		if !ok {
			l.stack[n].stop()
			l.stack = l.stack[:n]
			continue
		}
		// A value of 10 pushes a nested sequence, as a delegating rule does.
		if v == 10 {
			l.push(count(3, new([]string)))
		}
		if !yield(v) {
			return false
		}
	}
	return true
}

// stopAll stops every sequence on the stack.
func (l *lexer) stopAll() {
	for _, entry := range l.stack {
		entry.stop()
	}
	l.stack = nil
}

// tokens returns a sequence over the lexer's values.
func (l *lexer) tokens() iter.Seq[int] {
	return func(yield func(int) bool) {
		defer l.stopAll()
		l.push(func(yield func(int) bool) {
			for _, v := range []int{1, 10, 2} {
				if !yield(v) {
					return
				}
			}
		})
		l.drain(yield)
	}
}

func finite() {
	// Every value comes in order, then the end is reported twice.
	var log []string
	next, stop := iter.Pull(count(3, &log))
	for {
		v, ok := next()
		println("next:", v, ok)
		if !ok {
			break
		}
	}
	v, ok := next()
	println("after end:", v, ok)
	stop()
	v, ok = next()
	println("after stop:", v, ok)
	for _, line := range log {
		println("log:", line)
	}
}

func stopEarly() {
	// Stopping runs the sequence's defers before stop returns.
	var log []string
	next, stop := iter.Pull(count(5, &log))
	v, ok := next()
	println("first:", v, ok)
	println("log before stop:", len(log))
	stop()
	for _, line := range log {
		println("log:", line)
	}
	v, ok = next()
	println("after stop:", v, ok)
	stop()

	// Stopping before the first next never runs the sequence.
	var unused []string
	_, stop = iter.Pull(count(5, &unused))
	stop()
	println("unstarted log:", len(unused))
}

func infinite() {
	// An endless sequence runs only as far as next asks.
	next, stop := iter.Pull(naturals)
	sum := 0
	for range 5 {
		v, _ := next()
		sum += v
	}
	stop()
	println("infinite sum:", sum)
}

func pull2() {
	// Pull2 returns pairs and then zero values.
	next, stop := iter.Pull2(pairs(3))
	defer stop()
	for {
		k, v, ok := next()
		println("pair:", k, v, ok)
		if !ok {
			break
		}
	}
}

func nilSeq() {
	// A nil sequence panics on the first next.
	defer func() {
		println("nil seq recovered:", recover() != nil)
	}()
	var seq iter.Seq[int]
	next, _ := iter.Pull(seq)
	next()
	println("not reached")
}

func panicking() {
	// A panic in the sequence propagates out of next, and the iterator ends.
	var next func() (int, bool)
	func() {
		defer func() {
			println("recovered:", recover().(string))
		}()
		var stop func()
		next, stop = iter.Pull(func(yield func(int) bool) {
			yield(1)
			panic("seq failed")
		})
		defer stop()
		v, ok := next()
		println("before panic:", v, ok)
		next()
	}()
	v, ok := next()
	println("after panic:", v, ok)
}

func nested() {
	// A sequence that ranges over another one suspends inside the range.
	next, stop := iter.Pull(doubled(count(4, new([]string))))
	defer stop()
	for {
		v, ok := next()
		if !ok {
			break
		}
		println("doubled:", v)
	}
}

func interleaved() {
	// Two pulled sequences advance independently.
	nextA, stopA := iter.Pull(count(3, new([]string)))
	nextB, stopB := iter.Pull(naturals)
	defer stopA()
	defer stopB()
	for {
		a, okA := nextA()
		b, okB := nextB()
		println("interleaved:", a, okA, b, okB)
		if !okA {
			break
		}
	}
}

func lexerStack() {
	// A stack of pulled sequences grows and shrinks while it is drained.
	l := &lexer{}
	for v := range l.tokens() {
		println("token:", v)
		if v == 2 {
			break
		}
	}
	println("stack after break:", len(l.stack))
}

func main() {
	finite()
	stopEarly()
	infinite()
	pull2()
	nilSeq()
	panicking()
	nested()
	interleaved()
	lexerStack()
	println("done")
}
