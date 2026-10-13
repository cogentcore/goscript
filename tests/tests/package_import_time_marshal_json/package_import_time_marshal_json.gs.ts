// Generated file based on package_import_time_marshal_json.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"

import * as time from "@goscript/time/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/time/index.js"

export class geom {
	public declare Name: string

	public declare At: time.Time

	public _fields: {
		Name: string
		At: time.Time
	}

	constructor(init?: Partial<{Name?: string, At?: time.Time}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			At: init?.At ? $.markAsStructValue($.cloneStructValue(init.At)) : $.markAsStructValue(new time.Time())
		}
	}

	public clone(): geom {
		return $.markAsStructValue(new geom(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "At"])
	}

	static __typeInfo = $.registerStructType(
		"main.geom",
		() => new geom(),
		() => [],
		geom,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "At", key: "At", type: "time.Time" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let t = $.markAsStructValue($.cloneStructValue(time.Date(2025, 5, 15, 1, 10, 42, 123456789, time.UTC)))

	// Direct method calls, as core's windowgeometry does.
	let __goscriptTuple0: any = $.markAsStructValue($.cloneStructValue(t)).MarshalJSON()
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	await $.println($.bytesToString(b), err == null)
	let u: $.VarRef<time.Time> = $.varRef($.markAsStructValue(new time.Time()))
	err = u.value.UnmarshalJSON(b)
	await $.println(err == null, $.markAsStructValue($.cloneStructValue(u.value)).Equal($.markAsStructValue($.cloneStructValue(t))))
	await $.println(u.value.UnmarshalJSON(new Uint8Array([110, 117, 108, 108])) == null, $.markAsStructValue($.cloneStructValue(u.value)).Equal($.markAsStructValue($.cloneStructValue(t))))
	await $.println(u.value.UnmarshalJSON(new Uint8Array([49, 50])) != null)

	let __goscriptTuple1: any = $.markAsStructValue($.cloneStructValue(t)).MarshalText()
	let text: $.Slice<number> = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println($.bytesToString(text), err == null)
	let v: $.VarRef<time.Time> = $.varRef($.markAsStructValue(new time.Time()))
	await $.println(v.value.UnmarshalText(text) == null, $.markAsStructValue($.cloneStructValue(v.value)).Equal($.markAsStructValue($.cloneStructValue(t))))
	await $.println(v.value.UnmarshalText(new Uint8Array([98, 97, 100])) != null, $.markAsStructValue($.cloneStructValue(v.value)).IsZero())

	// Through encoding/json.
	let __goscriptTuple2: any = json.Marshal($.interfaceValue($.markAsStructValue(new geom({Name: "win", At: $.markAsStructValue($.cloneStructValue(t))})), "main.geom", "main.geom"))
	let data: $.Slice<number> = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	await $.println($.bytesToString(data), err == null)
	let g: $.VarRef<geom> = $.varRef($.markAsStructValue(new geom()))
	err = json.Unmarshal(data, $.interfaceValue(g, "*main.geom", /* @__PURE__ */ $.pointerType("main.geom")))
	await $.println(err == null, g.value.Name, $.markAsStructValue($.cloneStructValue(g.value.At)).Equal($.markAsStructValue($.cloneStructValue(t))))
}

if ($.isMainScript(import.meta)) {
	await main()
}
