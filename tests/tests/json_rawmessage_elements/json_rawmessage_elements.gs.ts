// Generated file based on json_rawmessage_elements.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as jsontext from "@goscript/encoding/json/jsontext/index.js"
import "@goscript/encoding/json/jsontext/index.js"

export async function main(): globalThis.Promise<void> {
	let fields: $.VarRef<globalThis.Map<string, json.RawMessage> | null> = $.varRef(null! as globalThis.Map<string, json.RawMessage> | null)
	let err: $.GoError = (json.Unmarshal(new Uint8Array([123, 34, 110, 97, 109, 101, 34, 58, 34, 97, 34, 44, 34, 107, 105, 100, 115, 34, 58, 91, 123, 34, 120, 34, 58, 49, 125, 44, 34, 98, 34, 93, 44, 34, 110, 34, 58, 51, 125]), $.interfaceValue(fields, "*map[string]jsontext.Value", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "jsontext.Value"))))) as $.GoError)
	await $.println("map:", err == null, $.bytesToString($.mapGet<string, json.RawMessage, json.RawMessage>(fields.value, "name", null)[0]), $.bytesToString($.mapGet<string, json.RawMessage, json.RawMessage>(fields.value, "kids", null)[0]), $.bytesToString($.mapGet<string, json.RawMessage, json.RawMessage>(fields.value, "n", null)[0]))

	let kids: $.VarRef<$.Slice<json.RawMessage>> = $.varRef(null! as $.Slice<json.RawMessage>)
	err = (json.Unmarshal($.mapGet<string, json.RawMessage, json.RawMessage>(fields.value, "kids", null)[0], $.interfaceValue(kids, "*[]jsontext.Value", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "jsontext.Value"))))) as $.GoError)
	await $.println("slice:", err == null, $.sliceLen(kids.value), $.bytesToString($.plainSliceIndex(kids.value!, 0)), $.bytesToString($.plainSliceIndex(kids.value!, 1)))

	let name = $.varRef("")
	err = (json.Unmarshal($.mapGet<string, json.RawMessage, json.RawMessage>(fields.value, "name", null)[0], $.interfaceValue(name, "*string", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("string")))) as $.GoError)
	await $.println("name:", err == null, name.value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
