// Generated file based on struct_reserved_field_names.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class odd {
	public declare ___proto__: number

	public declare _constructor: string

	public declare Name: string

	constructor(init?: Partial<{___proto__?: number, _constructor?: string, Name?: string}>, __goscriptValue?: boolean) {
		this.___proto__ = init?.___proto__ ?? (0 as number)
		this._constructor = init?._constructor ?? ("" as string)
		this.Name = init?.Name ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): odd {
		return new odd(this, true)
	}

	public __goscriptAssign(source: odd): this {
		this.___proto__ = source.___proto__
		this._constructor = source._constructor
		this.Name = source.Name
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.odd",
		() => new odd(),
		() => [],
		odd,
		() => [/* @__PURE__ */ $.structField("__proto__", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { key: "___proto__", pkgPath: "github.com/s4wave/goscript/tests/tests/struct_reserved_field_names" }), /* @__PURE__ */ $.structField("constructor", /* @__PURE__ */ $.basicType("string"), [1], 8, false, { key: "_constructor", pkgPath: "github.com/s4wave/goscript/tests/tests/struct_reserved_field_names" }), /* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [2], 24, true, { tag: "json:\"name\"" })]
	)
}

export async function main(): globalThis.Promise<void> {
	// Fields named like JavaScript object internals are ordinary fields.
	let v = new odd({___proto__: 7, _constructor: "c", Name: "n"}, true)
	let w = (v).clone()
	w.___proto__ = 8
	let p = $.fieldRef(v, "___proto__")
	p!.value += 1
	await fmt.Println($.basicInterfaceValue(v.___proto__, "int"), v._constructor, v.Name, $.basicInterfaceValue(w.___proto__, "int"))

	// The struct keeps its type and methods.
	await fmt.Printf("%v %+v\n", $.interfaceValue((v).clone(), "main.odd", "main.odd"), $.interfaceValue((w).clone(), "main.odd", "main.odd"))
	await fmt.Println((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue((v).clone(), "main.odd", "main.odd"))).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.basicInterfaceValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue((v).clone(), "main.odd", "main.odd")))).Field(0))).Int(), "int64"), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue((v).clone(), "main.odd", "main.odd")))).Field(1))).String())
	await fmt.Println($.structEqual(v, new odd({___proto__: 8, _constructor: "c", Name: "n"}, true)))
	let __goscriptTuple0: any = json.Marshal($.interfaceValue((v).clone(), "main.odd", "main.odd"))
	let data: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	await fmt.Println($.bytesToString(data), err == null)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
