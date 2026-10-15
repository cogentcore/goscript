// Generated file based on interface_async_callback_param.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as errors from "@goscript/errors/index.js"
import * as sync from "@goscript/sync/index.js"

export type scanner = {
	Scan(_p0: ((_p0: number) => $.GoError | globalThis.Promise<$.GoError>) | null): $.GoError
}

$.registerInterfaceType(
	"main.scanner",
	null,
	[{ name: "Scan", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }] }]
);

export class listScanner {
	constructor(__goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): listScanner {
		return new listScanner(true)
	}

	public __goscriptAssign(source: listScanner): this {
		return this
	}

	public Scan(fn: ((_p0: number) => $.GoError | globalThis.Promise<$.GoError>) | null): $.GoError {
		return (fn!(7) as $.GoError)
	}

	static __typeInfo = $.registerStructType(
		"main.listScanner",
		() => new listScanner(),
		() => [{ name: "Scan", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }] }],
		listScanner,
		() => []
	)
}

export function run(s: scanner | null): $.GoError {
	return (s !== null && (s as any).__isVarRef !== true && ((s as any).__goValue === undefined || (s as any).__goType?.charCodeAt(0) !== 42) ? (s as Exclude<scanner, null>) : $.pointerValue<Exclude<scanner, null>>(s)).Scan($.functionValue((v: number): $.GoError => {
		if (v != 7) {
			return errors.New("wrong value")
		}
		return null
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: ["error"] } as $.FunctionTypeInfo)))
}

export async function main(): globalThis.Promise<void> {
	await $.println(run($.interfaceValue<scanner | null>(new listScanner(true), "main.listScanner", "main.listScanner")) == null)

	let m = $.varRef($.markAsStructValue(new sync.Map()))
	let callbacks = $.arrayValue([$.functionValue((v: number): $.GoError => {
		m.value.Load($.basicInterfaceValue(v, "int"))
		return null
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: ["error"] } as $.FunctionTypeInfo))])
	await $.println(($.arrayIndex(callbacks, 0)!(1) as $.GoError) == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}
