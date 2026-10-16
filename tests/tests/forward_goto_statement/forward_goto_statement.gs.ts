// Generated file based on forward_goto_statement.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export function skipToLabel(v: number): number {
	let total = 0
	done: {
		if (v < 0) {
			break done
		}
		total += 1
	}
	total += 10
	return total
}

export function skipLoop(v: number): number {
	let total = 0
	afterLoop: {
		if (v == 0) {
			break afterLoop
		}
		for (let i = 0; i < 3; i++) {
			total += i
		}
	}
	return total + 1
}

export function mixedForwardBackward(limit: number): number {
	let total = 0
	__goscriptLoop0: while (total < limit) {
		total++
		let __goscriptSkip0 = true
		checkAndLoop: while (true) {
			if (!__goscriptSkip0) {
				if (total >= limit) {
					continue __goscriptLoop0
				}
			}
			__goscriptSkip0 = false

			skipVisit: {
				switch (total % 3) {
					case 0:
					{
						total += 2
						continue checkAndLoop
						break
					}
					case 1:
					{
						total += 3
						continue checkAndLoop
						break
					}
				}
			}
			break
		}
		break __goscriptLoop0
	}
	return total
}

export function labelBeforeShortDecl(v: number): number {
	skip: {
		if (v > 0) {
			break skip
		}
		return 0
	}
	let x = v + 1
	return x
}

export function overlappingSequentialForward(v: number): number {
	let total = 1
	exit: {
		exponent: {
			if (v == 1) {
				break exponent
			}
			if (v == 2) {
				total += 10
				break exit
			}
			total += 100
		}
		total *= 2
		if (v == 3) {
			break exit
		}
		total += 3
	}
	return total + 5
}

export function mixedForwardBackwardDecl(limit: number): number {
	let total = 0
	__goscriptLoop1: while (total < limit) {
		let __goscriptSkip1 = true
		check: while (true) {
			if (!__goscriptSkip1) {
				if (total >= limit) {
					continue __goscriptLoop1
				}
			}
			__goscriptSkip1 = false

			skip:;
			var x: number = total + 1
			total = x
			continue check
			break
		}
	}
	return total
}

export function stateMachineGoto(start: number): number {
	let total = start
	let __goscriptGotoState0 = 0
	__goscriptGotoLoop0: for (;;) {
		switch (__goscriptGotoState0) {
			case 0:
			{
				if (start == 0) {
					__goscriptGotoState0 = 1
					continue __goscriptGotoLoop0
				}
				__goscriptGotoState0 = 2
				continue __goscriptGotoLoop0
			}
			case 1:
			{
				{
					total++
					if (total < 2) {
						__goscriptGotoState0 = 1
						continue __goscriptGotoLoop0
					}
					__goscriptGotoState0 = 2
					continue __goscriptGotoLoop0
				}
			}
			case 2:
			{
				{
					total += 10
					if (total < 15) {
						__goscriptGotoState0 = 1
						continue __goscriptGotoLoop0
					}
				}
				return total
				break
			}
		}
		break
	}
	throw new globalThis.Error("goscript: unreachable return")
}

export function nestedBackwardGoto(limit: number): number {
	let total = 0
	restart: while (true) {
		if (total >= limit) {
			return total
		}

		__goscriptLoop2: while (true) {
			next: while (true) {
				total++

				if ((total % 2) == 0) {
					continue restart
				}
				if (total < limit) {
					continue next
				}
				return total
				break
			}
		}
		break
	}
	throw new globalThis.Error("goscript: unreachable return")
}

export function nestedInnerBreakWithGoto(limit: number): number {
	let total = 0
	restart: while (true) {
		if (total >= limit) {
			return total
		}

		__goscriptLoop3: while (true) {
			next: while (true) {
				for (let i = 0; i < 3; i++) {
					if (i == 1) {
						break
					}
					total += 10
				}

				total++
				if (total < limit) {
					continue next
				}
				break
			}
			if (total < (limit + 3)) {
				continue restart
			}
			return total
		}
		break
	}
	throw new globalThis.Error("goscript: unreachable return")
}

export async function rangeFuncBreakIterator(_yield: ((_p0: number) => boolean | globalThis.Promise<boolean>) | null): globalThis.Promise<void> {
	for (let i = 0; i < 3; i++) {
		if (!(__goscriptAwait = _yield!(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)) {
			return
		}
	}
}

export async function main(): globalThis.Promise<void> {
	await $.println("skip negative:", skipToLabel(-1))
	await $.println("skip positive:", skipToLabel(1))
	await $.println("loop skipped:", skipLoop(0))
	await $.println("loop included:", skipLoop(2))
	await $.println("mixed small:", mixedForwardBackward(1))
	await $.println("mixed large:", mixedForwardBackward(5))
	await $.println("label decl:", labelBeforeShortDecl(2))
	await $.println("overlap fallthrough:", overlappingSequentialForward(0))
	await $.println("overlap exponent:", overlappingSequentialForward(1))
	await $.println("overlap exit:", overlappingSequentialForward(2))
	await $.println("mixed decl:", mixedForwardBackwardDecl(2))
	await $.println("state zero:", stateMachineGoto(0))
	await $.println("state one:", stateMachineGoto(1))
	await $.println("nested restart:", nestedBackwardGoto(5))
	await $.println("nested break:", nestedInnerBreakWithGoto(25))

	let rangeTotal = 0
	rangeDone: {
		rangeRestart: while (true) {
			if (rangeTotal >= 25) {
				break rangeDone
			}

			__goscriptLoop4: while (true) {
				rangeNext: while (true) {
					let __goscriptRangeReturn0 = false
					;await (async () => {
						await rangeFuncBreakIterator!(async (v) => {
							if (v == 0) {
								rangeTotal += 5
								return true
							}
							if (v == 1) {
								return false
							}
							rangeTotal += 10
							return true
						})
					})()
					if (__goscriptRangeReturn0) {
						return
					}

					rangeTotal++
					if (rangeTotal < 25) {
						continue rangeNext
					}
					break
				}
				if (rangeTotal < 28) {
					continue rangeRestart
				}
				break __goscriptLoop4
			}
			break
		}
	}
	await $.println("range func break:", rangeTotal)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
