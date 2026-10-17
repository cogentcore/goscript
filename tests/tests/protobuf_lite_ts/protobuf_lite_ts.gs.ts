// Generated file based on protobuf_lite_ts.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as protobuf_go_lite from "@goscript/github.com/aperturerobotics/protobuf-go-lite/index.js"
import type * as json from "@goscript/github.com/aperturerobotics/protobuf-go-lite/json/index.js"
import * as __goscript_protobuf_lite_ts_pb_ts from "./protobuf_lite_ts.pb.ts"

export async function main(): globalThis.Promise<void> {
	let msg = new __goscript_protobuf_lite_ts_pb_ts.ExampleMsg({ExampleField: new Uint8Array([104, 101, 108, 108, 111]), ExampleText: "world"})

	let __goscriptTuple0: any = (msg !== null && (msg as any).__isVarRef !== true && (msg as any).__goValue === undefined ? ((msg as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).MarshalVT() : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.MarshalVT.call(msg))
	let data: $.Slice<number> = __goscriptTuple0[0]
	let err: $.GoError = __goscriptTuple0[1]
	if (err != null) {
		await $.println("error marshalling:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}

	await $.println("data len:", $.sliceLen(data))

	let out: __goscript_protobuf_lite_ts_pb_ts.ExampleMsg | $.VarRef<__goscript_protobuf_lite_ts_pb_ts.ExampleMsg> | null = new __goscript_protobuf_lite_ts_pb_ts.ExampleMsg()
	err = (out !== null && (out as any).__isVarRef !== true && (out as any).__goValue === undefined ? ((out as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).UnmarshalVT(data) : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.UnmarshalVT.call(out, data))
	if (err != null) {
		await $.println("error unmarshalling:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}

	await $.println("out:", (out !== null && (out as any).__isVarRef !== true && (out as any).__goValue === undefined ? ((out as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).String() : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.String.call(out)))

	let __goscriptTuple1: any = (msg !== null && (msg as any).__isVarRef !== true && (msg as any).__goValue === undefined ? ((msg as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).MarshalJSON() : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.MarshalJSON.call(msg))
	let jdata: $.Slice<number> = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	if (err != null) {
		await $.println("error marshalling to json:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}

	await $.println("json marshaled:", $.bytesToString(jdata))

	out = new __goscript_protobuf_lite_ts_pb_ts.ExampleMsg()
	let err2 = (out !== null && (out as any).__isVarRef !== true && (out as any).__goValue === undefined ? ((out as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).UnmarshalJSON(jdata) : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.UnmarshalJSON.call(out, jdata))
	if (err2 != null) {
		await $.println("error unmarshalling from json:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}

	await $.println("json unmarshaled:", (out !== null && (out as any).__isVarRef !== true && (out as any).__goValue === undefined ? ((out as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).String() : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.String.call(out)))

	let oneofMsg = new __goscript_protobuf_lite_ts_pb_ts.ExampleMsg({ExampleText: "oneof", Choice: $.interfaceValue<__goscript_protobuf_lite_ts_pb_ts.isExampleMsg_Choice | null>(new __goscript_protobuf_lite_ts_pb_ts.ExampleMsg_ChoiceData({ChoiceData: new Uint8Array([1, 2, 3]) as $.Slice<number>}), "*main.ExampleMsg_ChoiceData", /* @__PURE__ */ $.pointerType("main.ExampleMsg_ChoiceData"))})
	let oneofClone = (oneofMsg !== null && (oneofMsg as any).__isVarRef !== true && (oneofMsg as any).__goValue === undefined ? ((oneofMsg as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).CloneVT() : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.CloneVT.call(oneofMsg))
	await $.println("oneof clone equal:", (oneofMsg !== null && (oneofMsg as any).__isVarRef !== true && (oneofMsg as any).__goValue === undefined ? ((oneofMsg as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).EqualVT(oneofClone) : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.EqualVT.call(oneofMsg, oneofClone)))
	$.indexRef((oneofMsg !== null && (oneofMsg as any).__isVarRef !== true && (oneofMsg as any).__goValue === undefined ? ((oneofMsg as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).GetChoiceData() : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.GetChoiceData.call(oneofMsg))!, 0).value = 9
	await $.println("oneof clone independent:", $.uint($.arrayIndex((oneofClone !== null && (oneofClone as any).__isVarRef !== true && (oneofClone as any).__goValue === undefined ? ((oneofClone as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).GetChoiceData() : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.GetChoiceData.call(oneofClone))!, 0), 8) == 1)

	let oneofSize = (oneofClone !== null && (oneofClone as any).__isVarRef !== true && (oneofClone as any).__goValue === undefined ? ((oneofClone as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).SizeVT() : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.SizeVT.call(oneofClone))
	let __goscriptTuple2: any = (oneofClone !== null && (oneofClone as any).__isVarRef !== true && (oneofClone as any).__goValue === undefined ? ((oneofClone as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).MarshalVT() : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.MarshalVT.call(oneofClone))
	let oneofData: $.Slice<number> = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	if (err != null) {
		await $.println("error marshalling oneof:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("oneof size matches:", oneofSize == $.sliceLen(oneofData))

	let oneofOut = new __goscript_protobuf_lite_ts_pb_ts.ExampleMsg()
	{
		let __goscriptShadow0 = (oneofOut !== null && (oneofOut as any).__isVarRef !== true && (oneofOut as any).__goValue === undefined ? ((oneofOut as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).UnmarshalVT(oneofData) : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.UnmarshalVT.call(oneofOut, oneofData))
		if (__goscriptShadow0 != null) {
			await $.println("error unmarshalling oneof:", (__goscriptAwait = (__goscriptShadow0 !== null && (__goscriptShadow0 as any).__isVarRef !== true && ((__goscriptShadow0 as any).__goValue === undefined || (__goscriptShadow0 as any).__goType?.charCodeAt(0) !== 42) ? (__goscriptShadow0 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(__goscriptShadow0)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return
		}
	}
	await $.println("oneof round trip equal:", (oneofClone !== null && (oneofClone as any).__isVarRef !== true && (oneofClone as any).__goValue === undefined ? ((oneofClone as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).EqualVT(oneofOut) : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.EqualVT.call(oneofClone, oneofOut)))
	await $.println("oneof round trip value:", $.uint($.arrayIndex((oneofOut !== null && (oneofOut as any).__isVarRef !== true && (oneofOut as any).__goValue === undefined ? ((oneofOut as any) as __goscript_protobuf_lite_ts_pb_ts.ExampleMsg).GetChoiceData() : __goscript_protobuf_lite_ts_pb_ts.ExampleMsg.prototype.GetChoiceData.call(oneofOut))!, 2), 8))

	let __goscriptTuple3: any = protobuf_go_lite.DecodeVarintUint32(new Uint8Array([172, 2]) as $.Slice<number>, 0)
	let u32: number = __goscriptTuple3[0]
	let idx: number = __goscriptTuple3[1]
	err = __goscriptTuple3[2]
	if (err != null) {
		await $.println("error decoding uint32:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("varint uint32:", u32, idx)

	let __goscriptTuple4: any = protobuf_go_lite.DecodeVarintInt32(new Uint8Array([255, 255, 255, 255, 15]) as $.Slice<number>, 0)
	let i32: number = __goscriptTuple4[0]
	idx = __goscriptTuple4[1]
	err = __goscriptTuple4[2]
	if (err != null) {
		await $.println("error decoding int32:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("varint int32:", i32, idx)

	let __goscriptTuple5: any = protobuf_go_lite.DecodeVarintInt64(new Uint8Array([172, 2]) as $.Slice<number>, 0)
	let i64: bigint = __goscriptTuple5[0]
	idx = __goscriptTuple5[1]
	err = __goscriptTuple5[2]
	if (err != null) {
		await $.println("error decoding int64:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("varint int64:", i64, idx)

	let __goscriptTuple6: any = protobuf_go_lite.DecodeFixed32(new Uint8Array([68, 51, 34, 17]) as $.Slice<number>, 0)
	let fixed32: number = __goscriptTuple6[0]
	idx = __goscriptTuple6[1]
	err = __goscriptTuple6[2]
	if (err != null) {
		await $.println("error decoding fixed32:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("fixed32:", fixed32, idx)

	let __goscriptTuple7: any = protobuf_go_lite.DecodeFixed64(new Uint8Array([136, 119, 102, 85, 68, 51, 34, 17]) as $.Slice<number>, 0)
	let fixed: bigint = __goscriptTuple7[0]
	idx = __goscriptTuple7[1]
	err = __goscriptTuple7[2]
	if (err != null) {
		await $.println("error decoding fixed64:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("fixed64:", fixed, idx)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
