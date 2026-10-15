// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/interface_embedded_parent_async/dep/index.js"

export type Specific = {
	Name(): string | globalThis.Promise<string>
	Validate(): $.GoError | globalThis.Promise<$.GoError>
}

$.registerInterfaceType(
	"main.Specific",
	null,
	[{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "Validate", args: [], returns: [{ type: "error" }] }]
);

export class impl {
	constructor(__goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): impl {
		return new impl(true)
	}

	public __goscriptAssign(source: impl): this {
		return this
	}

	public async Name(): globalThis.Promise<string> {
		const i: impl | $.VarRef<impl> | null = this;
		await $.chanSend(ready, true)
		await $.chanRecv(ready)
		return "ok"
	}

	public async Validate(): globalThis.Promise<$.GoError> {
		const i: impl | $.VarRef<impl> | null = this;
		await $.chanSend(ready, true)
		await $.chanRecv(ready)
		return null
	}

	static __typeInfo = $.registerStructType(
		"main.impl",
		() => new impl(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Validate", args: [], returns: [{ type: "error" }], pointerReceiver: true }],
		impl,
		() => []
	)
}

export let ready: $.Channel<boolean> | null = $.makeChannel<boolean>(1, false, "both")

export function __goscript_set_ready(__goscriptValue: $.Channel<boolean> | null): void {
	ready = __goscriptValue
}

export function NewSpecific(): Specific | null {
	return $.interfaceValue<Specific | null>(new impl(), "*main.impl", /* @__PURE__ */ $.pointerType("main.impl"))
}

export async function main(): globalThis.Promise<void> {
	let s = NewSpecific()
	await $.println("embedded directive", dep.Accept((s as dep.Directive | null)), (__goscriptAwait = (s !== null && (s as any).__isVarRef !== true && ((s as any).__goValue === undefined || (s as any).__goType?.charCodeAt(0) !== 42) ? (s as Exclude<Specific, null>) : $.pointerValue<Exclude<Specific, null>>(s)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
