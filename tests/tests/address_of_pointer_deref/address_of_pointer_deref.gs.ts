// Generated file based on address_of_pointer_deref.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Col {
	public declare Name: string

	public declare Default: $.VarRef<number> | null

	constructor(__goscriptValue?: boolean, Name$?: string, Default$?: $.VarRef<number> | null) {
		this.Name = Name$ ?? ""
		this.Default = Default$ ?? (null! as $.VarRef<number> | null)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Col {
		return new Col(true, this.Name, this.Default)
	}

	public __goscriptAssign(source: Col): this {
		this.Name = source.Name
		this.Default = source.Default
		return this
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
	let c = new Col(false, "c", v)
	let out = cloneColField(c)
	let out$: Col = out == null ? $.pointerTarget<Col>(out) : (out as any).__isVarRef === true ? (out as any).value : (out as any).__goValue === undefined ? (out as any) : $.pointerTarget<Col>(out)
	await $.println("field alias same pointee:", ((out$ as Col).Default === $.pointerValue<Col>(c).Default || ($.pointerAliasesMade || ((out$ as Col).Default as any)?.__goElementBacking !== undefined) && $.pointerEqual((out$ as Col).Default, $.pointerValue<Col>(c).Default)));
	;(out$ as Col).Default!.value = 30
	await $.println("field alias write:", v.value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
