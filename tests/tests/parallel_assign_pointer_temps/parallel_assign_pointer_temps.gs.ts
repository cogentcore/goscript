// Generated file based on parallel_assign_pointer_temps.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class node {
	public get next(): number {
		return this._fields.next
	}

	public set next(value: number) {
		this._fields.next = value
	}

	public _fields: {
		next: number
	}

	constructor(init?: Partial<{next?: number}>) {
		this._fields = {
			next: init?.next ?? (0 as number)
		}
	}

	public clone(): node {
		return $.markAsStructValue(new node(this))
	}

	public __goscriptAssign(source: node): void {
		const target = this._fields
		const values = source._fields
		target.next = values.next
	}

	static __typeInfo = $.registerStructType(
		"main.node",
		() => new node(),
		() => [],
		node,
		() => [{ name: "next", key: "next", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class queue {
	public get value(): number {
		return this._fields.value
	}

	public set value(value: number) {
		this._fields.value = value
	}

	public _fields: {
		value: number
	}

	constructor(init?: Partial<{value?: number}>) {
		this._fields = {
			value: init?.value ?? (0 as number)
		}
	}

	public clone(): queue {
		return $.markAsStructValue(new queue(this))
	}

	public __goscriptAssign(source: queue): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
	}

	static __typeInfo = $.registerStructType(
		"main.queue",
		() => new queue(),
		() => [],
		queue,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let left: queue | $.VarRef<queue> | null = new queue({value: 1})
	let right: queue | $.VarRef<queue> | null = new queue({value: 2})
	let __goscriptAssign0_0: queue | $.VarRef<queue> | null = right
	let __goscriptAssign0_1: queue | $.VarRef<queue> | null = left
	left = __goscriptAssign0_0
	right = __goscriptAssign0_1
	await $.println($.pointerValue<queue>(left).value, $.pointerValue<queue>(right).value)

	let nodes = $.arrayValue([$.markAsStructValue(new node({next: 1})), $.markAsStructValue(new node({next: 0}))], /* @__PURE__ */ $.arrayType("main.node", 2))
	let pc = 0
	let inst: node | $.VarRef<node> | null = $.indexRef(nodes, pc)
	let __goscriptAssign1_0: number = $.pointerValue<node>(inst).next
	let __goscriptAssign1_1: node | $.VarRef<node> | null = $.indexRef(nodes, $.pointerValue<node>(inst).next)
	pc = __goscriptAssign1_0
	inst = __goscriptAssign1_1
	await $.println(pc, $.pointerValue<node>(inst).next)
}

if ($.isMainScript(import.meta)) {
	await main()
}
