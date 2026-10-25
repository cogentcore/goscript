// Generated file based on map_struct_key.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class requestKey {
	public declare soID: string

	public declare inviteID: string

	public declare peerID: string

	constructor(__goscriptValue?: boolean, soID$?: string, inviteID$?: string, peerID$?: string) {
		this.soID = soID$ ?? ""
		this.inviteID = inviteID$ ?? ""
		this.peerID = peerID$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): requestKey {
		return new requestKey(true, this.soID, this.inviteID, this.peerID)
	}

	public __goscriptAssign(source: requestKey): this {
		this.soID = source.soID
		this.inviteID = source.inviteID
		this.peerID = source.peerID
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.requestKey",
		() => new requestKey(),
		() => [],
		requestKey,
		() => [{ name: "soID", key: "soID", type: /* @__PURE__ */ $.basicType("string") }, { name: "inviteID", key: "inviteID", type: /* @__PURE__ */ $.basicType("string") }, { name: "peerID", key: "peerID", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class node {
	public declare value: string

	public declare next: node | $.VarRef<node> | null

	constructor(__goscriptValue?: boolean, value$?: string, next$?: node | $.VarRef<node> | null) {
		this.value = value$ ?? ""
		this.next = next$ ?? (null! as node | $.VarRef<node> | null)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): node {
		return new node(true, this.value, this.next)
	}

	public __goscriptAssign(source: node): this {
		this.value = source.value
		this.next = source.next
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.node",
		() => new node(),
		() => [],
		node,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("string") }, { name: "next", key: "next", type: /* @__PURE__ */ $.pointerType("main.node") }]
	)
}

export function newMap(__typeArgs: $.GenericTypeArgs | undefined): globalThis.Map<any, any> | null {
	return $.makeMap<any, any>(undefined, __typeArgs?.["K"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })
}

export async function main(): globalThis.Promise<void> {
	let status = $.makeMap<requestKey, string>()
	$.mapSet(status, new requestKey(true, "so-1", "inv-1", "peer-1"), "pending")
	$.mapSet(status, new requestKey(true, "so-1", "inv-1", "peer-1"), "accepted")

	let [got, ok] = $.mapGet<requestKey, string, string>(status, new requestKey(true, "so-1", "inv-1", "peer-1"), "")
	await $.println("same struct key:", got, ok, $.len(status))

	let [, missing] = $.mapGet<requestKey, string, string>(status, new requestKey(true, "so-2", "inv-1", "peer-1"), "")
	await $.println("different struct key:", missing)

	$.deleteMapEntry(status, new requestKey(true, "so-1", "inv-1", "peer-1"))
	let [, deleted] = $.mapGet<requestKey, string, string>(status, new requestKey(true, "so-1", "inv-1", "peer-1"), "")
	await $.println("deleted struct key:", deleted, $.len(status))

	let first = new requestKey(false, "same")
	let second = new requestKey(false, "same")
	let pointers = $.makeMap<requestKey | $.VarRef<requestKey> | null, number>([[first, 1], [second, 2]], /* @__PURE__ */ $.pointerType("main.requestKey"))
	await $.println("distinct pointer keys:", $.len(pointers), $.mapGet<requestKey | $.VarRef<requestKey> | null, number, number>(pointers, first, 0)[0], $.mapGet<requestKey | $.VarRef<requestKey> | null, number, number>(pointers, second, 0)[0])
	$.deleteMapEntry(pointers, first)
	await $.println("delete one pointer:", $.len(pointers), $.mapGet<requestKey | $.VarRef<requestKey> | null, number, number>(pointers, second, 0)[0])

	let left = new node(false, "same")
	let right = new node(false, "same")
	let __goscriptAssign0_0: node | $.VarRef<node> | null = left
	let __goscriptAssign0_1: node | $.VarRef<node> | null = right
	$.pointerValue<node>(left).next = __goscriptAssign0_0
	$.pointerValue<node>(right).next = __goscriptAssign0_1
	let cyclic = (newMap(__goscriptStatic0()) as globalThis.Map<node | $.VarRef<node> | null, number> | null)
	let __goscriptAssign1_0: number = 3
	let __goscriptAssign1_1: number = 4
	$.mapSet(cyclic, left, __goscriptAssign1_0)
	$.mapSet(cyclic, right, __goscriptAssign1_1)
	await $.println("cyclic pointer keys:", $.len(cyclic), $.mapGet<node | $.VarRef<node> | null, number, number>(cyclic, left, 0)[0], $.mapGet<node | $.VarRef<node> | null, number, number>(cyclic, right, 0)[0])
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, K: { type: /* @__PURE__ */ $.pointerType("main.node"), zero: () => null }, V: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
