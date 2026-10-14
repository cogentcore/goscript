// Generated file based on reflect_structof_convert_json.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/reflect/index.js"

export class Node {
	public declare Name: string

	public declare Size: number

	public _fields: {
		Name: string
		Size: number
	}

	constructor(init?: Partial<{Name?: string, Size?: number}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Size: init?.Size ?? (0 as number)
		}
	}

	public clone(): Node {
		return $.markAsStructValue(new Node(this))
	}

	public async UnmarshalJSON(b: $.Slice<number>): globalThis.Promise<$.GoError> {
		const n: Node | $.VarRef<Node> | null = this;
		calls++
		// Unmarshal into a copy of the type without methods, so that this
		// method is not called again.
		let v = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(n, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))))
		let t = await $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(v)).Type()).Elem()
		let fields: $.Slice<reflect.StructField> = $.makeSlice<reflect.StructField>(await $.pointerValue<Exclude<reflect.Type, null>>(t).NumField(), undefined, undefined, () => $.markAsStructValue(new reflect.StructField()))
		for (let __goscriptRangeTarget0 = fields, i = 0; i < $.len(__goscriptRangeTarget0); i++) {
			$.assignStruct(fields![i], $.markAsStructValue($.cloneStructValue(await $.pointerValue<Exclude<reflect.Type, null>>(t).Field(i))))
		}
		let copyType = reflect.PointerTo($.pointerValueOrNil(reflect.StructOf(fields))!)
		return json.Unmarshal(b, $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Convert($.pointerValueOrNil(copyType)!))).Interface())
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Size"])
	}

	static __typeInfo = $.registerStructType(
		"main.Node",
		() => new Node(),
		() => [$.methodSignature("UnmarshalJSON", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], ["error"])],
		Node,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("Size", /* @__PURE__ */ $.basicType("int"), [1], 16, true)]
	)
}

export let calls: number = 0

export function __goscript_set_calls(__goscriptValue: number): void {
	calls = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	let n: Node | $.VarRef<Node> | null = new Node()
	let err = await json.Unmarshal(new Uint8Array([123, 34, 78, 97, 109, 101, 34, 58, 34, 97, 34, 44, 34, 83, 105, 122, 101, 34, 58, 51, 125]), $.interfaceValue(n, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))
	await $.println(err == null, calls, $.pointerValue<Node>(n).Name, $.pointerValue<Node>(n).Size)
	let anyN: any = $.interfaceValue(n, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node"))
	let [, ok] = $.typeAssertTuple<json.Unmarshaler | null>(anyN, "json.Unmarshaler")
	await $.println(ok, await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf(anyN)).String())
}

if ($.isMainScript(import.meta)) {
	await main()
}
