// Generated file based on method_receiver_with_call_expr.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class State {
	public get value(): number {
		return this._fields.value
	}

	public set value(value: number) {
		this._fields.value = value
	}

	public get index(): $.VarRef<number> | null {
		return this._fields.index
	}

	public set index(value: $.VarRef<number> | null) {
		this._fields.index = value
	}

	public _fields: {
		value: number
		index: $.VarRef<number> | null
	}

	constructor(init?: Partial<{value?: number, index?: $.VarRef<number> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			value: init?.value ?? (0 as number),
			index: init?.index ?? (null! as $.VarRef<number> | null)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): State {
		return new State(this, true)
	}

	public __goscriptAssign(source: State): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
		target.index = values.index
	}

	public async Process(): globalThis.Promise<void> {
		const s: State | $.VarRef<State> | null = this;
		// This should generate:
		// const s = this
		// ;(getProcessor())!(s)
		// The semicolon is important to prevent: const s = this(getProcessor())!(s)
		void (__goscriptAwait = getProcessor()!(s), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	}

	public markIndex(): void {
		let s: State | $.VarRef<State> | null = this;
		// The first body statement begins with a parenthesized pointer expression.
		$.pointerValue<State>(s).index!.value = -1
	}

	static __typeInfo = $.registerStructType(
		"main.State",
		() => new State(),
		() => [{ name: "Process", args: [], returns: [], pointerReceiver: true }, { name: "markIndex", args: [], returns: [], pointerReceiver: true }],
		State,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }, { name: "index", key: "index", type: /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")) }]
	)
}

export function getProcessor(): ((_p0: State | $.VarRef<State> | null) => void) | null {
	return $.functionValue((s: State | $.VarRef<State> | null): void => {
		$.pointerValue<State>(s).value = 42
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.State")], results: [] } as $.FunctionTypeInfo))
}

export async function main(): globalThis.Promise<void> {
	let state: State | $.VarRef<State> | null = new State()
	await State.prototype.Process.call(state)
	await $.println("value:", $.pointerValue<State>(state).value)
	let index = $.varRef(7)
	$.pointerValue<State>(state).index = index
	State.prototype.markIndex.call(state)
	await $.println("index:", index.value)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
