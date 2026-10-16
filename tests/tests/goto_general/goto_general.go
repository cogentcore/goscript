package main

// outOfNestedLoops jumps forward and backward out of nested loops to labels
// of the function body.
func outOfNestedLoops(n int) int {
	total := 0
	tries := 0
retry:
	tries++
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if i*j == 6 {
				goto found
			}
			if i+j == 5 && tries < 3 {
				total++
				goto retry
			}
		}
	}
	return -total
found:
	return total*100 + tries
}

// siblingBlocks jumps between sibling blocks through the enclosing block.
func siblingBlocks(v int) int {
	out := 0
again:
	{
		if v > 10 {
			goto second
		}
		out += v
	}
	{
		if v%2 == 0 {
			v += 7
			goto again
		}
		out *= 2
	}
second:
	{
		out += 1000
		if out < 2000 {
			v = 3
			goto again
		}
	}
	return out
}

// labelsInLoop has labels inside a loop body, reached from nested ifs,
// switches and loops, with a continue of the loop in between.
func labelsInLoop(n int) int {
	sum := 0
	for i := 0; i < n; i++ {
		k := i
	top:
		if k > 20 {
			continue
		}
		switch k % 3 {
		case 0:
			k += 5
			goto top
		case 1:
			for j := 0; j < 2; j++ {
				if j == 1 {
					goto mid
				}
			}
		}
		sum += k
	mid:
		sum += 100
		if sum > 1500 {
			break
		}
		if k%2 == 1 {
			k += 3
			goto top
		}
	}
	return sum
}

// gotoLabeledLoop names a loop label with both goto and continue.
func gotoLabeledLoop(n int) int {
	count := 0
	if n < 0 {
		goto loop
	}
	count = 10
loop:
	for i := 0; i < n; i++ {
		if i%2 == 0 {
			continue loop
		}
		if i == 7 {
			break loop
		}
		count++
	}
	if count < 20 {
		n++
		goto loop
	}
	return count
}

// gotoInSwitchCase has a goto loop in a nested block of a switch case,
// whose unlabeled break leaves the switch.
func gotoInSwitchCase(v int) int {
	out := 0
	switch {
	case v > 0:
		{
		again:
			out++
			if out == 3 {
				break
			}
			if out < 10 {
				goto again
			}
		}
		out += 1000
	case v < 0:
		out = -1
		fallthrough
	default:
		out += 50
	}
	return out
}

// withDefer runs a deferred call from a function with gotos.
func withDefer(n int) (result int) {
	defer func() {
		result *= 2
	}()
	i := 0
loop:
	if i < n {
		result += i
		i++
		goto loop
	}
	return result
}

// closures captures variables of the states of a state machine.
func closures() int {
	var fns []func() int
	n := 0
	if n > 100 {
		goto done
	}
again:
	{
		v := n * 10
		fns = append(fns, func() int { return v })
	}
	n++
	if n < 3 {
		goto again
	}
	for i := 0; i < 2; i++ {
		w := i
	inner:
		w += 100
		fns = append(fns, func() int { return w })
		if w < 150 {
			w += 30
			goto inner
		}
	}
done:
	total := 0
	for _, fn := range fns {
		total += fn()
		println("closure:", fn())
	}
	return total
}

// shadowed declares a variable in one state that another uses, shadowing an
// outer variable.
func shadowed(v int) int {
	x := 1
	{
		y := x
		if v > 0 {
			goto later
		}
		y = 5
	later:
		x := y + 10
		if x < 30 {
			y = x
			goto later
		}
		println("inner x:", x)
	}
	return x
}

// chained has a statement with two labels.
func chained(v int) int {
	out := 0
	if v > 2 {
		goto b
	}
	goto a
a:
b:
	out += v
	v--
	if v > 0 {
		goto a
	}
	return out
}

// webStyle follows the shape of procedures translated from WEB: several
// labels, gotos from nested loops and ifs, backward and forward, and
// variables declared before the labels.
func webStyle(input []int) (int, int) {
	var p, q int
	var acc int
	s := 0
	steps := 0
restart:
	steps++
	if steps > 50 {
		goto done
	}
	p = 0
continueLabel:
	if p >= len(input) {
		goto finish
	}
	q = input[p]
	switch {
	case q < 0:
		p++
		goto continueLabel
	case q == 0:
		for i := 0; i < 3; i++ {
			for j := 0; j < 3; j++ {
				if i+j == 3 {
					acc += i * j
					p++
					goto continueLabel
				}
			}
		}
	case q > 100:
		input[p] = q / 2
		goto restart
	}
	acc += q
	if acc%7 == 0 {
		goto common_ending
	}
	p++
	goto continueLabel
common_ending:
	s++
	p++
	if s < 4 {
		goto continueLabel
	}
finish:
	if s == 0 && acc > 1000 {
		acc = acc / 3
		goto restart
	}
done:
	return acc, steps
}

func main() {
	println("outOfNestedLoops:", outOfNestedLoops(5), outOfNestedLoops(2))
	println("siblingBlocks:", siblingBlocks(4), siblingBlocks(5), siblingBlocks(20))
	println("labelsInLoop:", labelsInLoop(10), labelsInLoop(40))
	println("gotoLabeledLoop:", gotoLabeledLoop(5), gotoLabeledLoop(-1))
	println("gotoInSwitchCase:", gotoInSwitchCase(1), gotoInSwitchCase(-1), gotoInSwitchCase(0))
	println("withDefer:", withDefer(5))
	println("closures:", closures())
	println("stateClosures:", stateClosures())
	println("dispatchInLoop:", dispatchInLoop(5), dispatchInLoop(20))
	println("shadowed:", shadowed(1), shadowed(0))
	println("chained:", chained(3), chained(1))
	acc, steps := webStyle([]int{3, -1, 0, 4, 250, 7, 0, 9, 14, 21})
	println("webStyle:", acc, steps)
	acc, steps = webStyle([]int{5000, 600})
	println("webStyle:", acc, steps)
}

// stateClosures captures variables of the states of a state machine: one
// local to its state, fresh at each entry, and one that a later state uses.
func stateClosures() int {
	var fns []func() int
	n := 0
	if n == 0 {
		goto body
	}
	n = 100
body:
	{
		v := n
		fns = append(fns, func() int { return v*10 + n })
	}
	k := n * 2
	n++
	if n < 3 {
		goto body
	}
	goto tail
tail:
	fns = append(fns, func() int { return k })
	total := 0
	for _, fn := range fns {
		println("state closure:", fn())
		total += fn()
	}
	return total
}

// dispatchInLoop has a state machine in a loop body, with unlabeled breaks
// and continues of the loop in its states.
func dispatchInLoop(n int) int {
	total := 0
	for i := 0; i < n; i++ {
		if i%3 == 0 {
			goto check
		}
		total++
	check:
		if i == 7 {
			break
		}
		if i%2 == 1 {
			continue
		}
		total += 10
		if total%7 == 3 {
			total++
			goto check
		}
	}
	return total
}
