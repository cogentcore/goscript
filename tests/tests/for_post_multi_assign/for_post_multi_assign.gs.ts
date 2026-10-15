// Generated file based on for_post_multi_assign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class frame {
	public declare name: string

	constructor(init?: Partial<{name?: string}>, __goscriptValue?: boolean) {
		this.name = init?.name ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): frame {
		return new frame(this, true)
	}

	public __goscriptAssign(source: frame): this {
		this.name = source.name
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.frame",
		() => new frame(),
		() => [],
		frame,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class iterator {
	public declare idx: number

	constructor(init?: Partial<{idx?: number}>, __goscriptValue?: boolean) {
		this.idx = init?.idx ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): iterator {
		return new iterator(this, true)
	}

	public __goscriptAssign(source: iterator): this {
		this.idx = source.idx
		return this
	}

	public Next(): [frame, boolean] {
		let it: iterator | $.VarRef<iterator> | null = this;
		const it$: iterator = it == null ? $.pointerTarget<iterator>(it) : (it as any).__isVarRef === true ? (it as any).value : (it as any).__goValue === undefined ? (it as any) : $.pointerTarget<iterator>(it);
		;(it$ as iterator).idx++
		switch ((it$ as iterator).idx) {
			case 1:
			{
				return [new frame({name: "first"}, true), true]
				break
			}
			case 2:
			{
				return [new frame({name: "second"}, true), true]
				break
			}
			default:
			{
				return [new frame(undefined, true), false]
				break
			}
		}
		throw new globalThis.Error("goscript: unreachable return")
	}

	static __typeInfo = $.registerStructType(
		"main.iterator",
		() => new iterator(),
		() => [{ name: "Next", args: [], returns: [{ type: "main.frame" }, { type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }],
		iterator,
		() => [{ name: "idx", key: "idx", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function findFrame(): frame | $.VarRef<frame> | null {
	let it = new iterator()
	for (let __goscriptTuple0 = (it !== null && (it as any).__isVarRef !== true && (it as any).__goValue === undefined ? ((it as any) as iterator).Next() : iterator.prototype.Next.call(it)), f = $.varRef(__goscriptTuple0[0]), again = __goscriptTuple0[1]; again; [f.value, again] = (it !== null && (it as any).__isVarRef !== true && (it as any).__goValue === undefined ? ((it as any) as iterator).Next() : iterator.prototype.Next.call(it))) {
		if ($.stringEqual(f.value.name, "second")) {
			return f
		}
	}
	return null
}

export async function main(): globalThis.Promise<void> {
	for (let i = 0, j = 5; i < j; [i, j] = [i + 1, j - 1]) {
		await $.println(i, j)
	}
	let found = findFrame()
	if (found != null) {
		await $.println("frame:", $.pointerValue<frame>(found).name)
	}
	await $.println("done")
}

if ($.isMainScript(import.meta)) {
	await main()
}
