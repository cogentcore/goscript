// Generated file based on method_receiver_with_call_expr.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class State {
	public declare value: number

	public declare index: $.VarRef<number> | null

	constructor(__goscriptValue?: boolean, value$?: number, index$?: $.VarRef<number> | null) {
		this.value = value$ ?? 0
		this.index = index$ ?? (null! as $.VarRef<number> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): State {
		return new State(true, this.value, this.index)
	}

	public __goscriptAssign(source: State): this {
		this.value = source.value
		this.index = source.index
		return this
	}

	public Process(): void {
		const s: State | $.VarRef<State> | null = this;
		// This should generate:
		// const s = this
		// ;(getProcessor())!(s)
		// The semicolon is important to prevent: const s = this(getProcessor())!(s)
		getProcessor()!(s)
	}

	public markIndex(): void {
		const s: State | $.VarRef<State> | null = this;
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
	return $.functionValue((s: State | $.VarRef<State> | null) => {
		$.pointerValue<State>(s).value = 42
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.State")], results: [] } as $.FunctionTypeInfo))
}

export async function main(): globalThis.Promise<void> {
	let state = new State()
	let state$: State = state == null ? $.pointerTarget<State>(state) : (state as any).__isVarRef === true ? (state as any).value : (state as any).__goValue === undefined ? (state as any) : $.pointerTarget<State>(state)
	void (state !== null && (state as any).__isVarRef !== true && (state as any).__goValue === undefined ? ((state as any) as State).Process() : State.prototype.Process.call(state))
	await $.println("value:", (state$ as State).value)
	let index = $.varRef(7);
	;(state$ as State).index = index
	void (state !== null && (state as any).__isVarRef !== true && (state as any).__goValue === undefined ? ((state as any) as State).markIndex() : State.prototype.markIndex.call(state))
	await $.println("index:", index.value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
