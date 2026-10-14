// Generated file based on tuple_interface_assignment.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type reader = {
	Read(): number
}

$.registerInterfaceType(
	"main.reader",
	null,
	[{ name: "Read", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export class concrete {
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): concrete {
		return new concrete(this, true)
	}

	public __goscriptAssign(source: concrete): void {
	}

	public Read(): number {
		return 7
	}

	static __typeInfo = $.registerStructType(
		"main.concrete",
		() => new concrete(),
		() => [{ name: "Read", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		concrete,
		() => []
	)
}

export function makeReader(): [concrete | $.VarRef<concrete> | null, $.GoError] {
	return [new concrete(), null]
}

export async function main(): globalThis.Promise<void> {
	let r: reader | null = null! as reader | null
	let err: $.GoError = null! as $.GoError
	let __goscriptTuple0: any = makeReader()
	r = $.interfaceValue<reader | null>(__goscriptTuple0[0], "*main.concrete", /* @__PURE__ */ $.pointerType("main.concrete"))
	err = __goscriptTuple0[1]
	await $.println("ok", ((__goscriptAwait = $.pointerValue<Exclude<reader, null>>(r).Read(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 7) && (err == null))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
