// Generated file based on reflect_structof_convert_json.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class Node {
	public declare Name: string

	public declare Size: number

	constructor(__goscriptValue?: boolean, Name$?: string, Size$?: number) {
		this.Name = Name$ ?? ""
		this.Size = Size$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Node {
		return new Node(true, this.Name, this.Size)
	}

	public __goscriptAssign(source: Node): this {
		this.Name = source.Name
		this.Size = source.Size
		return this
	}

	public UnmarshalJSON(b: $.Slice<number>): $.GoError {
		const n: Node | $.VarRef<Node> | null = this;
		calls++
		// Unmarshal into a copy of the type without methods, so that this
		// method is not called again.
		let v = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(n, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))))
		let t = ($.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(v)).Type()).Elem() as reflect.Type | null)
		let fields = $.makeSlice<reflect.StructField>(((t !== null && (t as any).__isVarRef !== true && ((t as any).__goValue === undefined || (t as any).__goType?.charCodeAt(0) !== 42) ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).NumField() as number), undefined, undefined, () => $.markAsStructValue(new reflect.StructField()))
		for (let __goscriptRangeTarget0 = fields, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
			$.assignStruct((__goscriptRangeWindow0.backing as any[])[__goscriptRangeWindow0.offset + i], ((t !== null && (t as any).__isVarRef !== true && ((t as any).__goValue === undefined || (t as any).__goType?.charCodeAt(0) !== 42) ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Field(i) as reflect.StructField))
		}
		let copyType = reflect.PointerTo($.pointerValueOrNil(reflect.StructOf(fields))!)
		return (json.Unmarshal(b, $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Convert($.pointerValueOrNil(copyType)!))).Interface()) as $.GoError)
	}

	static __typeInfo = $.registerStructType(
		"main.Node",
		() => new Node(),
		() => [$.methodSignature("UnmarshalJSON", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], ["error"], true)],
		Node,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("Size", /* @__PURE__ */ $.basicType("int"), [1], 16, true)]
	)
}

export let calls = 0

export function __goscript_set_calls(__goscriptValue: number): void {
	calls = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	let n = new Node()
	let n$: Node = n == null ? $.pointerTarget<Node>(n) : (n as any).__isVarRef === true ? (n as any).value : (n as any).__goValue === undefined ? (n as any) : $.pointerTarget<Node>(n)
	let err = (json.Unmarshal(new Uint8Array([123, 34, 78, 97, 109, 101, 34, 58, 34, 97, 34, 44, 34, 83, 105, 122, 101, 34, 58, 51, 125]), $.interfaceValue(n, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node"))) as $.GoError)
	await $.println(err == null, calls, (n$ as Node).Name, (n$ as Node).Size)
	let anyN: any = $.interfaceValue(n, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node"))
	let [, ok] = $.typeAssertTuple<json.Unmarshaler | null>(anyN, "json.Unmarshaler")
	await $.println(ok, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf(anyN)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
