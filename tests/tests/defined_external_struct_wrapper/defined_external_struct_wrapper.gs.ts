// Generated file based on defined_external_struct_wrapper.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/defined_external_struct_wrapper/dep/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/defined_external_struct_wrapper/dep/index.js"

export class Wrapped {
	public get Value(): string {
		return this._fields.Value
	}

	public set Value(value: string) {
		this._fields.Value = value
	}

	public get Hidden(): dep.hidden {
		return this._fields.Hidden
	}

	public set Hidden(value: dep.hidden) {
		this._fields.Hidden = value
	}

	public _fields: {
		Value: string
		Hidden: dep.hidden
	}

	constructor(init?: Partial<{Value?: string, Hidden?: dep.hidden}>, __goscriptValue?: boolean) {
		this._fields = {
			Value: init?.Value ?? ("" as string),
			Hidden: init?.Hidden ? init.Hidden.clone() : new dep.hidden(undefined, true)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Wrapped {
		return new Wrapped(this, true)
	}

	public __goscriptAssign(source: Wrapped): void {
		const target = this._fields
		const values = source._fields
		target.Value = values.Value
		$.assignStruct(target.Hidden, values.Hidden)
	}

	public ["public"](): dep.Public | $.VarRef<dep.Public> | null {
		const w: Wrapped | $.VarRef<Wrapped> | null = this;
		return $.unsafePointerCast<dep.Public | $.VarRef<dep.Public> | null>(w, dep.Public)
	}

	static __typeInfo = $.registerStructType(
		"main.Wrapped",
		() => new Wrapped(),
		() => [{ name: "public", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("dep.Public") }], pointerReceiver: true }],
		Wrapped,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("string") }, { name: "Hidden", key: "Hidden", type: "dep.hidden" }]
	)
}

export function wrap(p: dep.Public | $.VarRef<dep.Public> | null): Wrapped | $.VarRef<Wrapped> | null {
	return $.unsafePointerCast<Wrapped | $.VarRef<Wrapped> | null>(p, Wrapped)
}

export async function main(): globalThis.Promise<void> {
	await $.println("ok")
}

if ($.isMainScript(import.meta)) {
	await main()
}
