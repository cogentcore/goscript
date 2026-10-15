// Generated file based on map_struct_key.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class requestKey {
	public get soID(): string {
		return this._fields.soID
	}

	public set soID(value: string) {
		this._fields.soID = value
	}

	public get inviteID(): string {
		return this._fields.inviteID
	}

	public set inviteID(value: string) {
		this._fields.inviteID = value
	}

	public get peerID(): string {
		return this._fields.peerID
	}

	public set peerID(value: string) {
		this._fields.peerID = value
	}

	public _fields: {
		soID: string
		inviteID: string
		peerID: string
	}

	constructor(init?: Partial<{soID?: string, inviteID?: string, peerID?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			soID: init?.soID ?? ("" as string),
			inviteID: init?.inviteID ?? ("" as string),
			peerID: init?.peerID ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): requestKey {
		return new requestKey(this, true)
	}

	public __goscriptAssign(source: requestKey): void {
		const target = this._fields
		const values = source._fields
		target.soID = values.soID
		target.inviteID = values.inviteID
		target.peerID = values.peerID
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
	public get value(): string {
		return this._fields.value
	}

	public set value(value: string) {
		this._fields.value = value
	}

	public get next(): node | $.VarRef<node> | null {
		return this._fields.next
	}

	public set next(value: node | $.VarRef<node> | null) {
		this._fields.next = value
	}

	public _fields: {
		value: string
		next: node | $.VarRef<node> | null
	}

	constructor(init?: Partial<{value?: string, next?: node | $.VarRef<node> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			value: init?.value ?? ("" as string),
			next: init?.next ?? (null! as node | $.VarRef<node> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): node {
		return new node(this, true)
	}

	public __goscriptAssign(source: node): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
		target.next = values.next
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
	$.mapSet(status, new requestKey({soID: "so-1", inviteID: "inv-1", peerID: "peer-1"}, true), "pending")
	$.mapSet(status, new requestKey({soID: "so-1", inviteID: "inv-1", peerID: "peer-1"}, true), "accepted")

	let [got, ok] = $.mapGet<requestKey, string, string>(status, new requestKey({soID: "so-1", inviteID: "inv-1", peerID: "peer-1"}, true), "")
	await $.println("same struct key:", got, ok, $.len(status))

	let [, missing] = $.mapGet<requestKey, string, string>(status, new requestKey({soID: "so-2", inviteID: "inv-1", peerID: "peer-1"}, true), "")
	await $.println("different struct key:", missing)

	$.deleteMapEntry(status, new requestKey({soID: "so-1", inviteID: "inv-1", peerID: "peer-1"}, true))
	let [, deleted] = $.mapGet<requestKey, string, string>(status, new requestKey({soID: "so-1", inviteID: "inv-1", peerID: "peer-1"}, true), "")
	await $.println("deleted struct key:", deleted, $.len(status))

	let first = new requestKey({soID: "same"})
	let second = new requestKey({soID: "same"})
	let pointers = $.makeMap<requestKey | $.VarRef<requestKey> | null, number>([[first, 1], [second, 2]], /* @__PURE__ */ $.pointerType("main.requestKey"))
	await $.println("distinct pointer keys:", $.len(pointers), $.mapGet<requestKey | $.VarRef<requestKey> | null, number, number>(pointers, first, 0)[0], $.mapGet<requestKey | $.VarRef<requestKey> | null, number, number>(pointers, second, 0)[0])
	$.deleteMapEntry(pointers, first)
	await $.println("delete one pointer:", $.len(pointers), $.mapGet<requestKey | $.VarRef<requestKey> | null, number, number>(pointers, second, 0)[0])

	let left = new node({value: "same"})
	let right = new node({value: "same"})
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
