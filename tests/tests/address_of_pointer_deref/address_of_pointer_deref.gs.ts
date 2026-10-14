// Generated file based on address_of_pointer_deref.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Col {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Default(): $.VarRef<number> | null {
		return this._fields.Default
	}

	public set Default(value: $.VarRef<number> | null) {
		this._fields.Default = value
	}

	public _fields: {
		Name: string
		Default: $.VarRef<number> | null
	}

	constructor(init?: Partial<{Name?: string, Default?: $.VarRef<number> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Default: init?.Default ?? (null! as $.VarRef<number> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Col {
		return new Col(this, true)
	}

	public __goscriptAssign(source: Col): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Default = values.Default
	}

	static __typeInfo = $.registerStructType(
		"main.Col",
		() => new Col(),
		() => [],
		Col,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Default", key: "Default", type: /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")) }]
	)
}

export function cloneColField(c: Col | $.VarRef<Col> | null): Col | $.VarRef<Col> | null {
	let out = $.varRef(($.pointerValue<Col>(c)).clone())
	if (out.value.Default != null) {
		out.value.Default = out.value.Default
	}
	return out
}

export async function main(): globalThis.Promise<void> {
	let v = $.varRef(10)
	let p = v

	// Local: q := &*p must alias v, so writing through q changes v.
	let q = p
	q!.value = 20
	await $.println("alias write through &*p:", v.value)

	// Field selector: out.Default = &(*out.Default) keeps the same pointee.
	let c: Col | $.VarRef<Col> | null = new Col({Name: "c", Default: v})
	let out: Col | $.VarRef<Col> | null = cloneColField(c)
	await $.println("field alias same pointee:", $.pointerEqual($.pointerValue<Col>(out).Default, $.pointerValue<Col>(c).Default))
	$.pointerValue<Col>(out).Default!.value = 30
	await $.println("field alias write:", v.value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
