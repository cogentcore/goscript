// Generated file based on inner.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as tx from "@goscript/github.com/s4wave/goscript/tests/tests/package_import_embedded_forwarder/dep/tx/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/package_import_embedded_forwarder/dep/tx/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/package_import_embedded_forwarder/dep/inner", ["inner.CoreStore"])

export class CoreStore {
	public declare Prefix: string

	constructor(init?: Partial<{Prefix?: string}>, __goscriptValue?: boolean) {
		this.Prefix = init?.Prefix ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): CoreStore {
		return new CoreStore(this, true)
	}

	public __goscriptAssign(source: CoreStore): this {
		this.Prefix = source.Prefix
		return this
	}

	public NewTransaction(write: boolean): tx.Tx | $.VarRef<tx.Tx> | null {
		const s: CoreStore | $.VarRef<CoreStore> | null = this;
		const s$: CoreStore = s == null ? $.pointerTarget<CoreStore>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<CoreStore>(s)
		if (write) {
			return new tx.Tx({Name: (s$ as CoreStore).Prefix + ":write"})
		}
		return new tx.Tx({Name: (s$ as CoreStore).Prefix + ":read"})
	}

	static __typeInfo = $.registerStructType(
		"inner.CoreStore",
		() => new CoreStore(),
		() => [{ name: "NewTransaction", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("tx.Tx") }], pointerReceiver: true }],
		CoreStore,
		() => [{ name: "Prefix", key: "Prefix", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export function NewCoreStore(prefix: string): CoreStore | $.VarRef<CoreStore> | null {
	return new CoreStore({Prefix: prefix})
}
