// Generated file based on quic_loss_frame_handler.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type wireFrame = {
	Write(): void
}

$.registerInterfaceType(
	"main.wireFrame",
	null,
	[{ name: "Write", args: [], returns: [] }]
);

export type FrameHandler = {
	OnAcked(_p0: wireFrame | null): void
	OnLost(_p0: wireFrame | null): void
}

$.registerInterfaceType(
	"main.FrameHandler",
	null,
	[{ name: "OnAcked", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }, { name: "OnLost", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }]
);

export class pingFrame {
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): pingFrame {
		return new pingFrame(this, true)
	}

	public __goscriptAssign(source: pingFrame): void {
	}

	public Write(): void {
	}

	static __typeInfo = $.registerStructType(
		"main.pingFrame",
		() => new pingFrame(),
		() => [{ name: "Write", args: [], returns: [] }],
		pingFrame,
		() => []
	)
}

export class Frame {
	public get Frame(): wireFrame | null {
		return this._fields.Frame
	}

	public set Frame(value: wireFrame | null) {
		this._fields.Frame = value
	}

	public get Handler(): FrameHandler | null {
		return this._fields.Handler
	}

	public set Handler(value: FrameHandler | null) {
		this._fields.Handler = value
	}

	public _fields: {
		Frame: wireFrame | null
		Handler: FrameHandler | null
	}

	constructor(init?: Partial<{Frame?: wireFrame | null, Handler?: FrameHandler | null}>, __goscriptValue?: boolean) {
		this._fields = {
			Frame: init?.Frame ?? (null! as wireFrame | null),
			Handler: init?.Handler ?? (null! as FrameHandler | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Frame {
		return new Frame(this, true)
	}

	public __goscriptAssign(source: Frame): void {
		const target = this._fields
		const values = source._fields
		target.Frame = $.assignFieldValue(target.Frame, values.Frame, "main.wireFrame")
		target.Handler = $.assignFieldValue(target.Handler, values.Handler, "main.FrameHandler")
	}

	static __typeInfo = $.registerStructType(
		"main.Frame",
		() => new Frame(),
		() => [],
		Frame,
		() => [{ name: "Frame", key: "Frame", type: "main.wireFrame" }, { name: "Handler", key: "Handler", type: "main.FrameHandler" }]
	)
}

export class packet {
	public get Frames(): $.Slice<Frame> {
		return this._fields.Frames
	}

	public set Frames(value: $.Slice<Frame>) {
		this._fields.Frames = value
	}

	public _fields: {
		Frames: $.Slice<Frame>
	}

	constructor(init?: Partial<{Frames?: $.Slice<Frame>}>, __goscriptValue?: boolean) {
		this._fields = {
			Frames: init?.Frames ?? (null! as $.Slice<Frame>)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): packet {
		return new packet(this, true)
	}

	public __goscriptAssign(source: packet): void {
		const target = this._fields
		const values = source._fields
		target.Frames = values.Frames
	}

	static __typeInfo = $.registerStructType(
		"main.packet",
		() => new packet(),
		() => [],
		packet,
		() => [{ name: "Frames", key: "Frames", type: /* @__PURE__ */ $.sliceType("main.Frame") }]
	)
}

export class retransmissionQueue {
	public get lost(): number {
		return this._fields.lost
	}

	public set lost(value: number) {
		this._fields.lost = value
	}

	public _fields: {
		lost: number
	}

	constructor(init?: Partial<{lost?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			lost: init?.lost ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): retransmissionQueue {
		return new retransmissionQueue(this, true)
	}

	public __goscriptAssign(source: retransmissionQueue): void {
		const target = this._fields
		const values = source._fields
		target.lost = values.lost
	}

	public AppDataAckHandler(): FrameHandler | null {
		const q: retransmissionQueue | $.VarRef<retransmissionQueue> | null = this;
		return $.interfaceValue<FrameHandler | null>($.unsafePointerCast<retransmissionQueueAppDataAckHandler | $.VarRef<retransmissionQueueAppDataAckHandler> | null>(q, retransmissionQueueAppDataAckHandler), "*main.retransmissionQueueAppDataAckHandler", /* @__PURE__ */ $.pointerType("main.retransmissionQueueAppDataAckHandler"))
	}

	public HandshakeAckHandler(): FrameHandler | null {
		const q: retransmissionQueue | $.VarRef<retransmissionQueue> | null = this;
		return $.interfaceValue<FrameHandler | null>($.unsafePointerCast<retransmissionQueueHandshakeAckHandler | $.VarRef<retransmissionQueueHandshakeAckHandler> | null>(q, retransmissionQueueHandshakeAckHandler), "*main.retransmissionQueueHandshakeAckHandler", /* @__PURE__ */ $.pointerType("main.retransmissionQueueHandshakeAckHandler"))
	}

	public InitialAckHandler(): FrameHandler | null {
		const q: retransmissionQueue | $.VarRef<retransmissionQueue> | null = this;
		return $.interfaceValue<FrameHandler | null>($.unsafePointerCast<retransmissionQueueInitialAckHandler | $.VarRef<retransmissionQueueInitialAckHandler> | null>(q, retransmissionQueueInitialAckHandler), "*main.retransmissionQueueInitialAckHandler", /* @__PURE__ */ $.pointerType("main.retransmissionQueueInitialAckHandler"))
	}

	static __typeInfo = $.registerStructType(
		"main.retransmissionQueue",
		() => new retransmissionQueue(),
		() => [{ name: "AppDataAckHandler", args: [], returns: [{ type: "main.FrameHandler" }], pointerReceiver: true }, { name: "HandshakeAckHandler", args: [], returns: [{ type: "main.FrameHandler" }], pointerReceiver: true }, { name: "InitialAckHandler", args: [], returns: [{ type: "main.FrameHandler" }], pointerReceiver: true }],
		retransmissionQueue,
		() => [{ name: "lost", key: "lost", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class retransmissionQueueInitialAckHandler {
	public get lost(): number {
		return this._fields.lost
	}

	public set lost(value: number) {
		this._fields.lost = value
	}

	public _fields: {
		lost: number
	}

	constructor(init?: Partial<{lost?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			lost: init?.lost ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): retransmissionQueueInitialAckHandler {
		return new retransmissionQueueInitialAckHandler(this, true)
	}

	public __goscriptAssign(source: retransmissionQueueInitialAckHandler): void {
		const target = this._fields
		const values = source._fields
		target.lost = values.lost
	}

	public OnAcked(_p0: wireFrame | null): void {
		const q: retransmissionQueueInitialAckHandler | $.VarRef<retransmissionQueueInitialAckHandler> | null = this;
	}

	public async OnLost(_p0: wireFrame | null): globalThis.Promise<void> {
		let q: retransmissionQueueInitialAckHandler | $.VarRef<retransmissionQueueInitialAckHandler> | null = this;
		$.pointerValue<retransmissionQueueInitialAckHandler>(q).lost++
		await $.println("initial")
	}

	static __typeInfo = $.registerStructType(
		"main.retransmissionQueueInitialAckHandler",
		() => new retransmissionQueueInitialAckHandler(),
		() => [{ name: "OnAcked", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }, { name: "OnLost", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		retransmissionQueueInitialAckHandler,
		() => [{ name: "lost", key: "lost", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class retransmissionQueueHandshakeAckHandler {
	public get lost(): number {
		return this._fields.lost
	}

	public set lost(value: number) {
		this._fields.lost = value
	}

	public _fields: {
		lost: number
	}

	constructor(init?: Partial<{lost?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			lost: init?.lost ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): retransmissionQueueHandshakeAckHandler {
		return new retransmissionQueueHandshakeAckHandler(this, true)
	}

	public __goscriptAssign(source: retransmissionQueueHandshakeAckHandler): void {
		const target = this._fields
		const values = source._fields
		target.lost = values.lost
	}

	public OnAcked(_p0: wireFrame | null): void {
		const q: retransmissionQueueHandshakeAckHandler | $.VarRef<retransmissionQueueHandshakeAckHandler> | null = this;
	}

	public async OnLost(_p0: wireFrame | null): globalThis.Promise<void> {
		let q: retransmissionQueueHandshakeAckHandler | $.VarRef<retransmissionQueueHandshakeAckHandler> | null = this;
		$.pointerValue<retransmissionQueueHandshakeAckHandler>(q).lost++
		await $.println("handshake")
	}

	static __typeInfo = $.registerStructType(
		"main.retransmissionQueueHandshakeAckHandler",
		() => new retransmissionQueueHandshakeAckHandler(),
		() => [{ name: "OnAcked", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }, { name: "OnLost", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		retransmissionQueueHandshakeAckHandler,
		() => [{ name: "lost", key: "lost", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class retransmissionQueueAppDataAckHandler {
	public get lost(): number {
		return this._fields.lost
	}

	public set lost(value: number) {
		this._fields.lost = value
	}

	public _fields: {
		lost: number
	}

	constructor(init?: Partial<{lost?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			lost: init?.lost ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): retransmissionQueueAppDataAckHandler {
		return new retransmissionQueueAppDataAckHandler(this, true)
	}

	public __goscriptAssign(source: retransmissionQueueAppDataAckHandler): void {
		const target = this._fields
		const values = source._fields
		target.lost = values.lost
	}

	public OnAcked(_p0: wireFrame | null): void {
		const q: retransmissionQueueAppDataAckHandler | $.VarRef<retransmissionQueueAppDataAckHandler> | null = this;
	}

	public async OnLost(_p0: wireFrame | null): globalThis.Promise<void> {
		let q: retransmissionQueueAppDataAckHandler | $.VarRef<retransmissionQueueAppDataAckHandler> | null = this;
		$.pointerValue<retransmissionQueueAppDataAckHandler>(q).lost++
		await $.println("app")
	}

	static __typeInfo = $.registerStructType(
		"main.retransmissionQueueAppDataAckHandler",
		() => new retransmissionQueueAppDataAckHandler(),
		() => [{ name: "OnAcked", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }, { name: "OnLost", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		retransmissionQueueAppDataAckHandler,
		() => [{ name: "lost", key: "lost", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function queueFramesForRetransmission(p: packet | $.VarRef<packet> | null): globalThis.Promise<void> {
	for (let __goscriptRangeTarget0 = $.pointerValue<packet>(p).Frames, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let f = ((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as Frame)).clone()
		if (f.Handler != null) {
			void (__goscriptAwait = $.pointerValue<Exclude<FrameHandler, null>>(f.Handler).OnLost(f.Frame), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
		}
	}
}

export async function main(): globalThis.Promise<void> {
	let q: retransmissionQueue | $.VarRef<retransmissionQueue> | null = new retransmissionQueue()
	let p: packet | $.VarRef<packet> | null = new packet({Frames: $.arrayToSlice<Frame>([(() => { const __goscriptLiteralField0 = retransmissionQueue.prototype.InitialAckHandler.call(q); return new Frame({Frame: $.interfaceValue<wireFrame | null>(new pingFrame(undefined, true), "main.pingFrame", "main.pingFrame"), Handler: __goscriptLiteralField0}, true) })(), (() => { const __goscriptLiteralField1 = retransmissionQueue.prototype.HandshakeAckHandler.call(q); return new Frame({Frame: $.interfaceValue<wireFrame | null>(new pingFrame(undefined, true), "main.pingFrame", "main.pingFrame"), Handler: __goscriptLiteralField1}, true) })(), (() => { const __goscriptLiteralField2 = retransmissionQueue.prototype.AppDataAckHandler.call(q); return new Frame({Frame: $.interfaceValue<wireFrame | null>(new pingFrame(undefined, true), "main.pingFrame", "main.pingFrame"), Handler: __goscriptLiteralField2}, true) })()])})
	await queueFramesForRetransmission(p)
	await $.println("lost:", $.pointerValue<retransmissionQueue>(q).lost)
	await $.println("done")
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
