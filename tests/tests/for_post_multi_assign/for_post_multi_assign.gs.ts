// Generated file based on for_post_multi_assign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class frame {
	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	public _fields: {
		name: string
	}

	constructor(init?: Partial<{name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			name: init?.name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): frame {
		return new frame(this, true)
	}

	public __goscriptAssign(source: frame): void {
		const target = this._fields
		const values = source._fields
		target.name = values.name
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
	public get idx(): number {
		return this._fields.idx
	}

	public set idx(value: number) {
		this._fields.idx = value
	}

	public _fields: {
		idx: number
	}

	constructor(init?: Partial<{idx?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			idx: init?.idx ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): iterator {
		return new iterator(this, true)
	}

	public __goscriptAssign(source: iterator): void {
		const target = this._fields
		const values = source._fields
		target.idx = values.idx
	}

	public Next(): [frame, boolean] {
		let it: iterator | $.VarRef<iterator> | null = this;
		const it$ = $.pointerTarget<iterator>(it);
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
	let it: iterator | $.VarRef<iterator> | null = new iterator()
	for (let __goscriptTuple0 = iterator.prototype.Next.call(it), f = $.varRef(__goscriptTuple0[0]), again = __goscriptTuple0[1]; again; [f.value, again] = iterator.prototype.Next.call(it)) {
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
	let found: frame | $.VarRef<frame> | null = findFrame()
	if (found != null) {
		await $.println("frame:", $.pointerValue<frame>(found).name)
	}
	await $.println("done")
}

if ($.isMainScript(import.meta)) {
	await main()
}
