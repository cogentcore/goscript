// Generated file based on goto_general.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export function outOfNestedLoops(n: number): number {
	let total = 0
	let tries = 0
	let __goscriptGotoState0 = 0
	__goscriptGotoLoop0: for (;;) {
		switch (__goscriptGotoState0) {
			case 0:
			{
				tries++
				for (let i = 0; i < n; i++) {
					for (let j = 0; j < n; j++) {
						if ((i * j) == 6) {
							__goscriptGotoState0 = 1
							continue __goscriptGotoLoop0
						}
						if (((i + j) == 5) && (tries < 3)) {
							total++
							__goscriptGotoState0 = 0
							continue __goscriptGotoLoop0
						}
					}
				}
				return -total
			}
			case 1:
			{
				return (total * 100) + tries
				break
			}
		}
		break
	}
	throw new globalThis.Error("goscript: unreachable return")
}

export function siblingBlocks(v: number): number {
	let out = 0
	let __goscriptGotoState1 = 0
	__goscriptGotoLoop1: for (;;) {
		switch (__goscriptGotoState1) {
			case 0:
			{
				{
					if (v > 10) {
						__goscriptGotoState1 = 1
						continue __goscriptGotoLoop1
					}
					out += v
				}
				{
					if ((v % 2) == 0) {
						v += 7
						__goscriptGotoState1 = 0
						continue __goscriptGotoLoop1
					}
					out *= 2
				}
			}
			case 1:
			{
				{
					out += 1000
					if (out < 2000) {
						v = 3
						__goscriptGotoState1 = 0
						continue __goscriptGotoLoop1
					}
				}
				return out
				break
			}
		}
		break
	}
	throw new globalThis.Error("goscript: unreachable return")
}

export function labelsInLoop(n: number): number {
	let sum = 0
	__goscriptLoop0: for (let i = 0; i < n; i++) {
		let k = i
		top: while (true) {
			if (k > 20) {
				continue __goscriptLoop0
			}

			mid: {

				switch (k % 3) {
					case 0:
					{
						k += 5
						continue top
						break
					}
					case 1:
					{
						for (let j = 0; j < 2; j++) {
							if (j == 1) {
								break mid
							}
						}
						break
					}
				}
				sum += k
			}
			sum += 100
			if (sum > 1500) {
				break __goscriptLoop0
			}
			if ((k % 2) == 1) {
				k += 3
				continue top
			}
			break
		}
	}
	return sum
}

export function gotoLabeledLoop(n: number): number {
	let count = 0
	let __goscriptGotoState2 = 0
	__goscriptGotoLoop2: for (;;) {
		switch (__goscriptGotoState2) {
			case 0:
			{
				if (n < 0) {
					__goscriptGotoState2 = 1
					continue __goscriptGotoLoop2
				}
				count = 10
			}
			case 1:
			{
				loop: for (let i = 0; i < n; i++) {
					if ((i % 2) == 0) {
						continue loop
					}
					if (i == 7) {
						break loop
					}
					count++
				}
				if (count < 20) {
					n++
					__goscriptGotoState2 = 1
					continue __goscriptGotoLoop2
				}
				return count
				break
			}
		}
		break
	}
	throw new globalThis.Error("goscript: unreachable return")
}

export function gotoInSwitchCase(v: number): number {
	let out = 0
	__goscriptSwitch0: switch ((true as boolean)) {
		case v > 0:
		{
			{
				again: while (true) {
					out++

					if (out == 3) {
						break __goscriptSwitch0
					}
					if (out < 10) {
						continue again
					}
					break
				}
			}
			out += 1000
			break
		}
		case v < 0:
		{
			out = -1
		}
		default:
		{
			out += 50
			break
		}
	}
	return out
}

export function withDefer(n: number): number {
	let result = 0
	using __defer = new $.DisposableStack()
	__defer.defer(() => { (() => {
		result *= 2
	})() })
	let i = 0
	loop: while (true) {
		if (i < n) {
			result += i
			i++
			continue loop
		}

		const __goscriptReturn0: number = result
		result = __goscriptReturn0
		__defer.dispose()
		return result
		break
	}
	throw new globalThis.Error("goscript: unreachable return")
}

export async function closures(): globalThis.Promise<number> {
	let fns: $.Slice<(() => number | globalThis.Promise<number>) | null> = null! as $.Slice<(() => number | globalThis.Promise<number>) | null>
	let n = 0
	done: {
		if (n > 100) {
			break done
		}
		again: while (true) {
			{
				let v = n * 10
				fns = $.appendOne(fns, $.functionValue((): number => {
					return v
				}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), $.appendZeros.nil)
			}

			n++
			if (n < 3) {
				continue again
			}
			break
		}
		__goscriptLoop1: for (let i = 0; i < 2; i++) {
			let w = i
			inner: while (true) {
				w += 100

				fns = $.appendOne(fns, $.functionValue((): number => {
					return w
				}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), $.appendZeros.nil)
				if (w < 150) {
					w += 30
					continue inner
				}
				break
			}
		}
	}
	let total = 0
	for (let __goscriptRangeTarget0 = fns, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let fn = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as (() => number | globalThis.Promise<number>) | null)
		total += (fn!() as number)
		await $.println("closure:", (fn!() as number))
	}
	return total
}

export async function shadowed(v: number): globalThis.Promise<number> {
	let x = 1
	{
		let y = x
		let __goscriptGotoState3 = 0
		__goscriptGotoLoop3: for (;;) {
			switch (__goscriptGotoState3) {
				case 0:
				{
					if (v > 0) {
						__goscriptGotoState3 = 1
						continue __goscriptGotoLoop3
					}
					y = 5
				}
				case 1:
				{
					let __goscriptShadow0: number = y + 10
					if (__goscriptShadow0 < 30) {
						y = __goscriptShadow0
						__goscriptGotoState3 = 1
						continue __goscriptGotoLoop3
					}
					await $.println("inner x:", __goscriptShadow0)
					break
				}
			}
			break
		}
	}
	return x
}

export function chained(v: number): number {
	let out = 0
	let __goscriptGotoState4 = 0
	__goscriptGotoLoop4: for (;;) {
		switch (__goscriptGotoState4) {
			case 0:
			{
				if (v > 2) {
					__goscriptGotoState4 = 1
					continue __goscriptGotoLoop4
				}
				__goscriptGotoState4 = 1
				continue __goscriptGotoLoop4
			}
			case 1:
			{
				out += v
				v--
				if (v > 0) {
					__goscriptGotoState4 = 1
					continue __goscriptGotoLoop4
				}
				return out
				break
			}
		}
		break
	}
	throw new globalThis.Error("goscript: unreachable return")
}

export function webStyle(input: $.Slice<number>): [number, number] {
	let p = 0
	let q = 0
	let acc = 0
	let s = 0
	let steps = 0
	let __goscriptGotoState5 = 0
	__goscriptGotoLoop5: for (;;) {
		switch (__goscriptGotoState5) {
			case 0:
			{
				steps++
				if (steps > 50) {
					__goscriptGotoState5 = 4
					continue __goscriptGotoLoop5
				}
				p = 0
			}
			case 1:
			{
				if (p >= $.sliceLen(input)) {
					__goscriptGotoState5 = 3
					continue __goscriptGotoLoop5
				}
				q = $.plainSliceIndex(input!, p)
				switch ((true as boolean)) {
					case q < 0:
					{
						p++
						__goscriptGotoState5 = 1
						continue __goscriptGotoLoop5
						break
					}
					case q == 0:
					{
						for (let i = 0; i < 3; i++) {
							for (let j = 0; j < 3; j++) {
								if ((i + j) == 3) {
									acc += i * j
									p++
									__goscriptGotoState5 = 1
									continue __goscriptGotoLoop5
								}
							}
						}
						break
					}
					case q > 100:
					{
						$.sliceElems(input!)[$.sliceSlot(input!, p)] = globalThis.Math.trunc(q / 2)
						__goscriptGotoState5 = 0
						continue __goscriptGotoLoop5
						break
					}
				}
				acc += q
				if ((acc % 7) == 0) {
					__goscriptGotoState5 = 2
					continue __goscriptGotoLoop5
				}
				p++
				__goscriptGotoState5 = 1
				continue __goscriptGotoLoop5
			}
			case 2:
			{
				s++
				p++
				if (s < 4) {
					__goscriptGotoState5 = 1
					continue __goscriptGotoLoop5
				}
			}
			case 3:
			{
				if ((s == 0) && (acc > 1000)) {
					acc = globalThis.Math.trunc(acc / 3)
					__goscriptGotoState5 = 0
					continue __goscriptGotoLoop5
				}
			}
			case 4:
			{
				return [acc, steps]
				break
			}
		}
		break
	}
	throw new globalThis.Error("goscript: unreachable return")
}

export async function main(): globalThis.Promise<void> {
	await $.println("outOfNestedLoops:", outOfNestedLoops(5), outOfNestedLoops(2))
	await $.println("siblingBlocks:", siblingBlocks(4), siblingBlocks(5), siblingBlocks(20))
	await $.println("labelsInLoop:", labelsInLoop(10), labelsInLoop(40))
	await $.println("gotoLabeledLoop:", gotoLabeledLoop(5), gotoLabeledLoop(-1))
	await $.println("gotoInSwitchCase:", gotoInSwitchCase(1), gotoInSwitchCase(-1), gotoInSwitchCase(0))
	await $.println("withDefer:", withDefer(5))
	await $.println("closures:", await closures())
	await $.println("stateClosures:", await stateClosures())
	await $.println("dispatchInLoop:", dispatchInLoop(5), dispatchInLoop(20))
	await $.println("shadowed:", await shadowed(1), await shadowed(0))
	await $.println("chained:", chained(3), chained(1))
	let [acc, steps] = webStyle($.arrayToSlice<number>([3, -1, 0, 4, 250, 7, 0, 9, 14, 21]))
	await $.println("webStyle:", acc, steps)
	let __goscriptTuple0: any = webStyle($.arrayToSlice<number>([5000, 600]))
	acc = __goscriptTuple0[0]
	steps = __goscriptTuple0[1]
	await $.println("webStyle:", acc, steps)
}

export async function stateClosures(): globalThis.Promise<number> {
	let fns: $.Slice<(() => number | globalThis.Promise<number>) | null> = null! as $.Slice<(() => number | globalThis.Promise<number>) | null>
	let n = 0
	let k!: number
	let __goscriptGotoState6 = 0
	__goscriptGotoLoop6: for (;;) {
		switch (__goscriptGotoState6) {
			case 0:
			{
				if (n == 0) {
					__goscriptGotoState6 = 1
					continue __goscriptGotoLoop6
				}
				n = 100
			}
			case 1:
			{
				{
					let v = n
					fns = $.appendOne(fns, $.functionValue((): number => {
						return (v * 10) + n
					}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), $.appendZeros.nil)
				}
				k = n * 2
				n++
				if (n < 3) {
					__goscriptGotoState6 = 1
					continue __goscriptGotoLoop6
				}
				__goscriptGotoState6 = 2
				continue __goscriptGotoLoop6
			}
			case 2:
			{
				fns = $.appendOne(fns, $.functionValue((): number => {
					return k
				}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), $.appendZeros.nil)
				let total = 0
				for (let __goscriptRangeTarget1 = fns, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
					let fn = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as (() => number | globalThis.Promise<number>) | null)
					await $.println("state closure:", (fn!() as number))
					total += (fn!() as number)
				}
				return total
				break
			}
		}
		break
	}
	throw new globalThis.Error("goscript: unreachable return")
}

export function dispatchInLoop(n: number): number {
	let total = 0
	__goscriptLoop2: for (let i = 0; i < n; i++) {
		let __goscriptGotoState7 = 0
		__goscriptGotoLoop7: for (;;) {
			switch (__goscriptGotoState7) {
				case 0:
				{
					if ((i % 3) == 0) {
						__goscriptGotoState7 = 1
						continue __goscriptGotoLoop7
					}
					total++
				}
				case 1:
				{
					if (i == 7) {
						break __goscriptLoop2
					}
					if ((i % 2) == 1) {
						continue __goscriptLoop2
					}
					total += 10
					if ((total % 7) == 3) {
						total++
						__goscriptGotoState7 = 1
						continue __goscriptGotoLoop7
					}
					break
				}
			}
			break
		}
	}
	return total
}

if ($.isMainScript(import.meta)) {
	await main()
}
