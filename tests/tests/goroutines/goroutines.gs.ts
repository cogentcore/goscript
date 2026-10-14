// Generated file based on goroutines.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Message {
	public get priority(): number {
		return this._fields.priority
	}

	public set priority(value: number) {
		this._fields.priority = value
	}

	public get text(): string {
		return this._fields.text
	}

	public set text(value: string) {
		this._fields.text = value
	}

	public _fields: {
		priority: number
		text: string
	}

	constructor(init?: Partial<{priority?: number, text?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			priority: init?.priority ?? (0 as number),
			text: init?.text ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Message {
		return new Message(this, true)
	}

	public __goscriptAssign(source: Message): void {
		const target = this._fields
		const values = source._fields
		target.priority = values.priority
		target.text = values.text
	}

	static __typeInfo = $.registerStructType(
		"main.Message",
		() => new Message(),
		() => [],
		Message,
		() => [{ name: "priority", key: "priority", type: /* @__PURE__ */ $.basicType("int") }, { name: "text", key: "text", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export const totalMessages: number = 8

export let messages: $.Channel<Message> | null = $.makeChannel<Message>(0, new Message(undefined, true), "both")

export function __goscript_set_messages(__goscriptValue: $.Channel<Message> | null): void {
	messages = __goscriptValue
}

export async function worker(id: number): globalThis.Promise<void> {
	// Send worker starting message
	await $.chanSend(messages, new Message({priority: 10 + id, text: $.concatString(($.concatString("Worker ", $.runeToString($.int(48 + id, 32)))), " starting")}, true))

	// Send worker done message
	await $.chanSend(messages, new Message({priority: 20 + id, text: $.concatString(($.concatString("Worker ", $.runeToString($.int(48 + id, 32)))), " done")}, true))
}

export async function anotherWorker(name: string): globalThis.Promise<void> {
	await $.chanSend(messages, new Message({priority: 40, text: $.concatString("Another worker: ", name)}, true))
}

export async function main(): globalThis.Promise<void> {
	// Create a slice to collect all messages
	let allMessages: $.Slice<Message> = $.makeSlice<Message>(0, 8 + 3, undefined, () => new Message(undefined, true))

	// Add initial message
	allMessages = $.append(allMessages, new Message({priority: 0, text: "Main: Starting workers"}, true))

	// Start 3 worker goroutines
	for (let i = 0; i < 3; i++) {
		queueMicrotask(async () => { await worker(i) })
	}

	// Start another worker goroutine
	queueMicrotask(async () => { await anotherWorker("test") })

	// Start an anonymous function worker
	queueMicrotask(async () => { await (async (): globalThis.Promise<void> => {
		await $.chanSend(messages, new Message({priority: 50, text: "Anonymous function worker"}, true))
	})() })

	// Add status message
	allMessages = $.append(allMessages, new Message({priority: 1, text: "Main: Workers started"}, true))

	// Collect all messages from goroutines
	for (let __rangeIndex = 0; __rangeIndex < 8; __rangeIndex++) {
		allMessages = $.append(allMessages, (await $.chanRecv(messages)).clone())
	}

	// Add final message
	allMessages = $.append(allMessages, new Message({priority: 100, text: "Main: All workers completed"}, true))

	// Sort messages by priority for deterministic order
	for (let __goscriptRangeTarget0 = allMessages, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		for (let j = i + 1; j < $.sliceLen(allMessages); j++) {
			if ($.arrayIndex(allMessages!, i).priority > $.arrayIndex(allMessages!, j).priority) {
				let __goscriptAssign0_0: Message = ($.arrayIndex(allMessages!, j)).clone()
				let __goscriptAssign0_1: Message = ($.arrayIndex(allMessages!, i)).clone()
				$.assignStruct(allMessages![i], __goscriptAssign0_0)
				$.assignStruct(allMessages![j], __goscriptAssign0_1)
			}
		}
	}

	// Print all messages in deterministic order
	for (let __goscriptRangeTarget1 = allMessages, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let msg = ((__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as Message)).clone()
		await $.println(msg.priority, msg.text)
	}
	await $.println("done")
}

if ($.isMainScript(import.meta)) {
	await main()
}
