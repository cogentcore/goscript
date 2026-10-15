// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as inner from "@goscript/github.com/s4wave/goscript/tests/tests/package_import_embedded_forwarder/dep/inner/index.js"

import * as tx from "@goscript/github.com/s4wave/goscript/tests/tests/package_import_embedded_forwarder/dep/tx/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/package_import_embedded_forwarder/dep/inner/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/package_import_embedded_forwarder/dep/tx/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/package_import_embedded_forwarder/dep", ["dep.Store", "dep.BaseStore"])

export type Tx = tx.Tx

export type Store = {
	NewTransaction(write: boolean): tx.Tx | $.VarRef<tx.Tx> | null
}

$.registerInterfaceType(
	"dep.Store",
	null,
	[{ name: "NewTransaction", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("tx.Tx") }] }]
);

export class BaseStore {
	public declare CoreStore: inner.CoreStore | $.VarRef<inner.CoreStore> | null

	constructor(init?: Partial<{CoreStore?: inner.CoreStore | $.VarRef<inner.CoreStore> | null}>, __goscriptValue?: boolean) {
		this.CoreStore = init?.CoreStore ?? (null! as inner.CoreStore | $.VarRef<inner.CoreStore> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): BaseStore {
		return new BaseStore(this, true)
	}

	public __goscriptAssign(source: BaseStore): this {
		this.CoreStore = source.CoreStore
		return this
	}

	public NewTransaction(write: any): any {
		return $.pointerValue<inner.CoreStore>(this.CoreStore).NewTransaction(write)
	}

	static __typeInfo = $.registerStructType(
		"dep.BaseStore",
		() => new BaseStore(),
		() => [{ name: "NewTransaction", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("tx.Tx") }] }],
		BaseStore,
		() => [{ name: "CoreStore", key: "CoreStore", type: /* @__PURE__ */ $.pointerType("inner.CoreStore"), anonymous: true }]
	)
}

export function NewBaseStore(prefix: string): BaseStore | $.VarRef<BaseStore> | null {
	return (() => { const __goscriptLiteralField0 = inner.NewCoreStore(prefix); return new BaseStore({CoreStore: __goscriptLiteralField0}) })()
}
