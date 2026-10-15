// Generated file based on package_import_encoding_json_value_method_set.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class Node {
	public declare A: number

	public declare B: string

	constructor(init?: Partial<{A?: number, B?: string}>, __goscriptValue?: boolean) {
		this.A = init?.A ?? (0 as number)
		this.B = init?.B ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Node {
		return new Node(this, true)
	}

	public __goscriptAssign(source: Node): this {
		this.A = source.A
		this.B = source.B
		return this
	}

	public MarshalJSON(): [$.Slice<number>, $.GoError] {
		const n: Node | $.VarRef<Node> | null = this;
		let __goscriptTuple0: any = json.Marshal($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(n, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node"))))).Elem())).Interface())
		let b: $.Slice<number> = __goscriptTuple0[0]
		let err = __goscriptTuple0[1]
		if (err != null) {
			return [null, err]
		}
		return [$.appendSlice(new Uint8Array([123, 34, 119, 114, 97, 112, 112, 101, 100, 34, 58]), $.append(b, $.uint(125, 8), $.byteSliceHint), $.byteSliceHint), null]
	}

	static __typeInfo = $.registerStructType(
		"main.Node",
		() => new Node(),
		() => [$.methodSignature("MarshalJSON", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"], true)],
		Node,
		() => [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("string"), [1], 8, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	let __goscriptTuple1: any = json.Marshal($.interfaceValue(new Node({A: 1, B: "x"}), "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))
	let b: $.Slice<number> = __goscriptTuple1[0]
	let err = __goscriptTuple1[1]
	await $.println($.bytesToString(b), err == null)

	let __goscriptTuple2: any = json.Marshal($.interfaceValue(new Node({A: 2, B: "y"}, true), "main.Node", "main.Node"))
	b = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	await $.println($.bytesToString(b), err == null)

	let __goscriptTuple3: any = json.Marshal($.interfaceValue($.arrayToSlice<Node>([new Node({A: 3}, true)]), "[]main.Node", /* @__PURE__ */ $.sliceType("main.Node")))
	b = __goscriptTuple3[0]
	err = __goscriptTuple3[1]
	await $.println($.bytesToString(b), err == null)

	let __goscriptTuple4: any = json.Marshal($.interfaceValue($.arrayToSlice<Node | $.VarRef<Node> | null>([new Node({A: 4})]), "[]*main.Node", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.Node"))))
	b = __goscriptTuple4[0]
	err = __goscriptTuple4[1]
	await $.println($.bytesToString(b), err == null)

	let v: {"N": Node} = $.anonymousStructValue({"N": new Node(undefined, true)}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", "main.Node", [0], 0, true)] })
	v.N.A = 5
	let __goscriptTuple5: any = json.Marshal($.interfaceValue($.markAsStructValue($.cloneStructValue(v)), "struct{N main.Node}", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", "main.Node", [0], 0, true)] }))
	b = __goscriptTuple5[0]
	err = __goscriptTuple5[1]
	await $.println($.bytesToString(b), err == null)

	let p: {"N": Node | $.VarRef<Node> | null} = $.anonymousStructValue({"N": null}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.pointerType("main.Node"), [0], 0, true)] })
	p.N = new Node({A: 6})
	let __goscriptTuple6: any = json.Marshal($.interfaceValue($.markAsStructValue($.cloneStructValue(p)), "struct{N *main.Node}", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.pointerType("main.Node"), [0], 0, true)] }))
	b = __goscriptTuple6[0]
	err = __goscriptTuple6[1]
	await $.println($.bytesToString(b), err == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}
