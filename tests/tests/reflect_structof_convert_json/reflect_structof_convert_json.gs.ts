// Generated file based on reflect_structof_convert_json.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class Node {
	public declare Name: string

	public declare Size: number

	constructor(init?: Partial<{Name?: string, Size?: number}>, __goscriptValue?: boolean) {
		this.Name = init?.Name ?? ("" as string)
		this.Size = init?.Size ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Node {
		return new Node(this, true)
	}

	public __goscriptAssign(source: Node): this {
		this.Name = source.Name
		this.Size = source.Size
		return this
	}

	public async UnmarshalJSON(b: $.Slice<number>): globalThis.Promise<$.GoError> {
		const n: Node | $.VarRef<Node> | null = this;
		calls++
		// Unmarshal into a copy of the type without methods, so that this
		// method is not called again.
		let v = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(n, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))))
		let t = (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(v)).Type()).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
		let fields = $.makeSlice<reflect.StructField>((__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).NumField(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), undefined, undefined, () => $.markAsStructValue(new reflect.StructField()))
		for (let __goscriptRangeTarget0 = fields, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
			$.assignStruct((__goscriptRangeWindow0.backing as any[])[__goscriptRangeWindow0.offset + i], ((__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Field(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField))
		}
		let copyType = reflect.PointerTo($.pointerValueOrNil(reflect.StructOf(fields))!)
		return json.Unmarshal(b, $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Convert($.pointerValueOrNil(copyType)!))).Interface())
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
	let err = await json.Unmarshal(new Uint8Array([123, 34, 78, 97, 109, 101, 34, 58, 34, 97, 34, 44, 34, 83, 105, 122, 101, 34, 58, 51, 125]), $.interfaceValue(n, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))
	await $.println(err == null, calls, (n$ as Node).Name, (n$ as Node).Size)
	let anyN: any = $.interfaceValue(n, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node"))
	let [, ok] = $.typeAssertTuple<json.Unmarshaler | null>(anyN, "json.Unmarshaler")
	await $.println(ok, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf(anyN)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
