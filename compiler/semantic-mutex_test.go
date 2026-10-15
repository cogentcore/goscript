package compiler

import (
	"strings"
	"testing"
)

func TestMutexLocksByCriticalSection(t *testing.T) {
	model, diagnostics, _ := buildDirectiveModel(t, strings.Join([]string{
		"package main",
		"import \"sync\"",
		// plain's sections are sync.
		"type plain struct{ mu sync.Mutex; n int }",
		"func (p *plain) inc() { p.mu.Lock(); p.n++; p.mu.Unlock() }",
		"func (p *plain) get() int { p.mu.Lock(); defer p.mu.Unlock(); return p.n }",
		// slow's section calls a function that receives from a channel.
		"type slow struct{ mu sync.Mutex; ch chan int }",
		"func (s *slow) wait() int { return <-s.ch }",
		"func (s *slow) take() int { s.mu.Lock(); defer s.mu.Unlock(); return s.wait() }",
		"func (s *slow) peek() int { s.mu.Lock(); defer s.mu.Unlock(); return cap(s.ch) }",
		// The section of outer locks inner, whose section suspends.
		"type nested struct{ outer, inner sync.Mutex; ch chan int }",
		"func (n *nested) in() { n.inner.Lock(); <-n.ch; n.inner.Unlock() }",
		"func (n *nested) out() { n.outer.Lock(); n.inner.Lock(); n.inner.Unlock(); n.outer.Unlock() }",
		"func (n *nested) outOnly() { n.outer.Lock(); n.outer.Unlock() }",
		// held locks without unlocking, so its mutex escapes.
		"type held struct{ mu sync.Mutex }",
		"func (h *held) lock() { h.mu.Lock() }",
		"func (h *held) unlock() { h.mu.Unlock() }",
		"func (h *held) touch() { h.mu.Lock(); h.mu.Unlock() }",
		// valued takes a method value of its mutex.
		"type valued struct{ mu sync.Mutex }",
		"func (v *valued) touch() { v.mu.Lock(); v.mu.Unlock() }",
		"func (v *valued) unlocker() func() { return v.mu.Unlock }",
		// A mutex in a local variable is not known.
		"func local() { var mu sync.Mutex; mu.Lock(); mu.Unlock() }",
		"func main() {",
		"  p := &plain{}; p.inc(); _ = p.get()",
		"  s := &slow{ch: make(chan int, 1)}; s.ch <- 1; _ = s.take(); _ = s.peek()",
		"  n := &nested{ch: make(chan int, 1)}; n.in(); n.out(); n.outOnly()",
		"  h := &held{}; h.lock(); h.unlock(); h.touch()",
		"  v := &valued{}; v.touch(); _ = v.unlocker()",
		"  local()",
		"}",
		"",
	}, "\n"))
	if diagnosticsHaveErrors(diagnostics) {
		t.Fatalf("semantic model build failed: %#v", diagnostics)
	}
	for name, want := range map[string]bool{
		"(*example.test/directives.plain).inc":      false,
		"(*example.test/directives.plain).get":      false,
		"(*example.test/directives.slow).take":      true,
		"(*example.test/directives.slow).peek":      true,
		"(*example.test/directives.nested).out":     true,
		"(*example.test/directives.nested).outOnly": true,
		"(*example.test/directives.held).touch":     true,
		"(*example.test/directives.valued).touch":   true,
		"example.test/directives.local":             true,
	} {
		semFn := model.functionsByFullName[name]
		if semFn == nil || semFn.async != want {
			t.Errorf("%s async = %v, want %v", name, semFn != nil && semFn.async, want)
		}
	}
}
