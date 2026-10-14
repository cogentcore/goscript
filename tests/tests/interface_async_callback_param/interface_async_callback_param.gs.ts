// Generated file based on interface_async_callback_param.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as errors from "@goscript/errors/index.js"

import * as sync from "@goscript/sync/index.js"
import "@goscript/errors/index.js"
import "@goscript/sync/index.js"

export type scanner = {
	Scan(_p0: ((_p0: number) => $.GoError | globalThis.Promise<$.GoError>) | null): $.GoError | globalThis.Promise<$.GoError>
}

$.registerInterfaceType(
	"main.scanner",
	null,
	[{ name: "Scan", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }] }]
);

export class listScanner {
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): listScanner {
		return new listScanner(this, true)
	}

	public __goscriptAssign(source: listScanner): void {
	}

	public async Scan(fn: ((_p0: number) => $.GoError | globalThis.Promise<$.GoError>) | null): globalThis.Promise<$.GoError> {
		return fn!(7)
	}

	static __typeInfo = $.registerStructType(
		"main.listScanner",
		() => new listScanner(),
		() => [{ name: "Scan", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }] }],
		listScanner,
		() => []
	)
}

export async function run(s: scanner | null): globalThis.Promise<$.GoError> {
	return $.pointerValue<Exclude<scanner, null>>(s).Scan($.functionValue((v: number): $.GoError => {
		if (v != 7) {
			return errors.New("wrong value")
		}
		return null
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: ["error"] } as $.FunctionTypeInfo)))
}

export async function main(): globalThis.Promise<void> {
	await $.println(await run($.interfaceValue<scanner | null>(new listScanner(undefined, true), "main.listScanner", "main.listScanner")) == null)

	let m: $.VarRef<sync.Map> = $.varRef($.markAsStructValue(new sync.Map()))
	let callbacks = $.arrayValue([$.functionValue(async (v: number): globalThis.Promise<$.GoError> => {
		await m.value.Load($.basicInterfaceValue(v, "int"))
		return null
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: ["error"] } as $.FunctionTypeInfo))])
	await $.println((__goscriptAwait = $.arrayIndex(callbacks, 0)!(1), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == null)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
