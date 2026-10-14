// Generated file based on package_import_errors_as_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as errors from "@goscript/errors/index.js"
import "@goscript/errors/index.js"

export type healthError = {
	Error(): string | globalThis.Promise<string>
	Health(): string
}

$.registerInterfaceType(
	"main.healthError",
	null,
	[{ name: "Error", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "Health", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class wrappedHealthError {
	public get err(): $.GoError {
		return this._fields.err
	}

	public set err(value: $.GoError) {
		this._fields.err = value
	}

	public _fields: {
		err: $.GoError
	}

	constructor(init?: Partial<{err?: $.GoError}>) {
		this._fields = {
			err: init?.err ?? (null! as $.GoError)
		}
	}

	public clone(): wrappedHealthError {
		return $.markAsStructValue(new wrappedHealthError(this))
	}

	public __goscriptAssign(source: wrappedHealthError): void {
		const target = this._fields
		const values = source._fields
		target.err = $.assignFieldValue(target.err, values.err, "error")
	}

	public async Error(): globalThis.Promise<string> {
		const e: wrappedHealthError | $.VarRef<wrappedHealthError> | null = this;
		return $.pointerValue<Exclude<$.GoError, null>>($.pointerValue<wrappedHealthError>(e).err).Error()
	}

	public Health(): string {
		const e: wrappedHealthError | $.VarRef<wrappedHealthError> | null = this;
		return "closed"
	}

	public Unwrap(): $.GoError {
		const e: wrappedHealthError | $.VarRef<wrappedHealthError> | null = this;
		return $.pointerValue<wrappedHealthError>(e).err
	}

	static __typeInfo = $.registerStructType(
		"main.wrappedHealthError",
		() => new wrappedHealthError(),
		() => [{ name: "Error", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Health", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Unwrap", args: [], returns: [{ type: "error" }], pointerReceiver: true }],
		wrappedHealthError,
		() => [{ name: "err", key: "err", type: "error" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let err: wrappedHealthError | $.VarRef<wrappedHealthError> | null = (() => { const __goscriptLiteralField0 = errors.New("root"); return new wrappedHealthError({err: __goscriptLiteralField0}) })()

	let target: $.VarRef<healthError | null> = $.varRef(null! as healthError | null)
	let ok = errors.As($.pointerValueOrNil($.interfaceValue<$.GoError>(err, "*main.wrappedHealthError", /* @__PURE__ */ $.pointerType("main.wrappedHealthError")))!, $.interfaceValue(target, "*main.healthError", /* @__PURE__ */ $.pointerType("main.healthError")))
	await $.println("matched:", ok)
	if (ok) {
		await $.println("health:", (__goscriptAwait = $.pointerValue<Exclude<healthError, null>>(target.value).Health(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}

	let healthTarget: $.VarRef<any> = $.varRef(null! as any)
	ok = errors.As($.pointerValueOrNil($.interfaceValue<$.GoError>(err, "*main.wrappedHealthError", /* @__PURE__ */ $.pointerType("main.wrappedHealthError")))!, $.interfaceValue(healthTarget, "*interface{Health() string}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [$.methodSignature("Health", [], [/* @__PURE__ */ $.basicType("string")])] })))
	await $.println("anonymous matched:", ok)
	if (ok) {
		await $.println("anonymous health:", (__goscriptAwait = $.pointerValue<any>(healthTarget.value).Health(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
