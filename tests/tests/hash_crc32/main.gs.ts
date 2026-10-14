// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as encoding from "@goscript/encoding/index.js"

import * as hash from "@goscript/hash/index.js"

import * as crc32 from "@goscript/hash/crc32/index.js"

import * as io from "@goscript/io/index.js"
import "@goscript/encoding/index.js"
import "@goscript/hash/index.js"
import "@goscript/hash/crc32/index.js"
import "@goscript/io/index.js"

export async function main(): globalThis.Promise<void> {
	if (((((4 as number) != 4) || ((3988292384 as number) != 0xedb88320)) || ((2197175160 as number) != 0x82f63b78)) || ((3945912366 as number) != 0xeb31d82e)) {
		$.panic("public constants")
	}
	if ((!$.pointerEqual(crc32.MakeTable(3988292384), crc32.IEEETable)) || (!$.pointerEqual(crc32.MakeTable(3988292384), crc32.MakeTable(3988292384)))) {
		$.panic("IEEE table reuse")
	}
	if (!$.pointerEqual(crc32.MakeTable(2197175160), crc32.MakeTable(2197175160))) {
		$.panic("Castagnoli table reuse")
	}
	if ($.pointerEqual(crc32.MakeTable(3945912366), crc32.MakeTable(3945912366))) {
		$.panic("custom tables unexpectedly reused")
	}

	let payload: $.Slice<number> = $.makeSlice<number>(257, undefined, "byte")
	for (let __goscriptRangeTarget0 = payload, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		;(__goscriptRangeWindow0.backing as any[])[__goscriptRangeWindow0.offset + i] = $.uint(((i * 31) + (globalThis.Math.trunc(i / 3))) + 7, 8)
	}

	let tables: $.Slice<{"name": string, "table": $.VarRef<crc32.Table> | null}> = $.arrayToSlice<{"name": string, "table": $.VarRef<crc32.Table> | null}>([$.anonymousStructValue({name: "ieee", table: crc32.IEEETable}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("name", /* @__PURE__ */ $.basicType("string"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/hash_crc32" }), /* @__PURE__ */ $.structField("table", /* @__PURE__ */ $.pointerType("crc32.Table"), [1], 16, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/hash_crc32" })] }), $.anonymousStructValue({name: "castagnoli", table: crc32.MakeTable(2197175160)}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("name", /* @__PURE__ */ $.basicType("string"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/hash_crc32" }), /* @__PURE__ */ $.structField("table", /* @__PURE__ */ $.pointerType("crc32.Table"), [1], 16, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/hash_crc32" })] }), $.anonymousStructValue({name: "koopman", table: crc32.MakeTable(3945912366)}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("name", /* @__PURE__ */ $.basicType("string"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/hash_crc32" }), /* @__PURE__ */ $.structField("table", /* @__PURE__ */ $.pointerType("crc32.Table"), [1], 16, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/hash_crc32" })] }), $.anonymousStructValue({name: "custom", table: crc32.MakeTable(0xd5828281)}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("name", /* @__PURE__ */ $.basicType("string"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/hash_crc32" }), /* @__PURE__ */ $.structField("table", /* @__PURE__ */ $.pointerType("crc32.Table"), [1], 16, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/hash_crc32" })] })])
	let lengths: $.Slice<number> = $.arrayToSlice<number>([0, 1, 7, 8, 9, 15, 16, 17, $.sliceLen(payload)])
	for (let __goscriptRangeTarget2 = tables, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget2), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let tc = $.markAsStructValue($.cloneStructValue((__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as {"name": string, "table": $.VarRef<crc32.Table> | null})))
		for (let __goscriptRangeTarget1 = lengths, __goscriptRangeWindow2 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow2.length; __rangeIndex++) {
			let length = (__goscriptRangeWindow2.backing[__goscriptRangeWindow2.offset + __rangeIndex] as number)
			let data: $.Slice<number> = $.goSlice(payload, undefined, length)
			let oneShot = crc32.Checksum(data, tc.table)
			let split = globalThis.Math.trunc(length / 2)
			let updated = crc32.Update(crc32.Update(0, tc.table, $.goSlice(data, undefined, split)), tc.table, $.goSlice(data, split, undefined))
			let stream = crc32.New(tc.table)
			{
				let [n, err] = await $.pointerValue<Exclude<hash.Hash32, null>>(stream).Write($.goSlice(data, undefined, split))
				if ((n != split) || (err != null)) {
					$.panic("first stream write")
				}
			}
			{
				let [n, err] = await $.pointerValue<Exclude<hash.Hash32, null>>(stream).Write($.goSlice(data, split, undefined))
				if ((n != (length - split)) || (err != null)) {
					$.panic("second stream write")
				}
			}
			if ((updated != oneShot) || ((__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(stream).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) != oneShot)) {
				$.panic("checksum mismatch")
			}
			await $.println(tc.name, length, oneShot)
		}
	}

	if (crc32.ChecksumIEEE(payload) != crc32.Checksum(payload, crc32.IEEETable)) {
		$.panic("ChecksumIEEE")
	}
	let ieee = crc32.NewIEEE()
	{
		let [, err] = await $.pointerValue<Exclude<hash.Hash32, null>>(ieee).Write($.goSlice(payload, undefined, 113))
		if (err != null) {
			$.panic((__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(err).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}
	{
		let [, err] = await $.pointerValue<Exclude<hash.Hash32, null>>(ieee).Write($.goSlice(payload, 113, undefined))
		if (err != null) {
			$.panic((__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(err).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}
	if ((__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(ieee).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) != crc32.ChecksumIEEE(payload)) {
		$.panic("NewIEEE")
	}

	let prefix: $.Slice<number> = new Uint8Array([9, 8, 7]) as $.Slice<number>
	let summed: $.Slice<number> = (__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(ieee).Sum($.goSlice(prefix, undefined, $.sliceLen(prefix), $.sliceLen(prefix))), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	if (((($.sliceLen(summed) != ($.sliceLen(prefix) + crc32.Size)) || ($.arrayIndex(summed!, 0) != 9)) || ($.arrayIndex(summed!, 1) != 8)) || ($.arrayIndex(summed!, 2) != 7)) {
		$.panic("prefix-preserving Sum")
	}
	await $.println("sum", $.sliceLen(summed), $.arrayIndex(summed!, 3), $.arrayIndex(summed!, 4), $.arrayIndex(summed!, 5), $.arrayIndex(summed!, 6))

	let [marshaler, ok] = $.typeAssertTuple<encoding.BinaryMarshaler | null>(ieee, "encoding.BinaryMarshaler")
	if (!ok) {
		$.panic("BinaryMarshaler")
	}
	let __goscriptTuple0: any = await $.pointerValue<Exclude<encoding.BinaryMarshaler, null>>(marshaler).MarshalBinary()
	let state: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	if (err != null) {
		$.panic((__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(err).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
	let __goscriptTuple1: any = $.typeAssertTuple<encoding.BinaryAppender | null>(ieee, "encoding.BinaryAppender")
	let appender = __goscriptTuple1[0]
	ok = __goscriptTuple1[1]
	if (!ok) {
		$.panic("BinaryAppender")
	}
	let __goscriptTuple2: any = await $.pointerValue<Exclude<encoding.BinaryAppender, null>>(appender).AppendBinary(new Uint8Array([4, 5]) as $.Slice<number>)
	let appended: $.Slice<number> = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	if ((((err != null) || ($.sliceLen(appended) != ($.sliceLen(state) + 2))) || ($.arrayIndex(appended!, 0) != 4)) || ($.arrayIndex(appended!, 1) != 5)) {
		$.panic("AppendBinary")
	}
	for (let __goscriptRangeTarget3 = state, __goscriptRangeWindow3 = $.sliceRange(__goscriptRangeTarget3), i = 0; i < __goscriptRangeWindow3.length; i++) {
		if ($.arrayIndex(appended!, i + 2) != ((__goscriptRangeWindow3.backing as any[])[__goscriptRangeWindow3.offset + i] as number)) {
			$.panic("AppendBinary state")
		}
	}
	await $.println("state", $.sliceLen(state), $.arrayIndex(state!, 0), $.arrayIndex(state!, 1), $.arrayIndex(state!, 2), $.arrayIndex(state!, 3))

	let restored = crc32.NewIEEE()
	let __goscriptTuple3: any = $.typeAssertTuple<encoding.BinaryUnmarshaler | null>(restored, "encoding.BinaryUnmarshaler")
	let unmarshaler = __goscriptTuple3[0]
	ok = __goscriptTuple3[1]
	if (!ok) {
		$.panic("BinaryUnmarshaler")
	}
	{
		let __goscriptShadow0 = (__goscriptAwait = $.pointerValue<Exclude<encoding.BinaryUnmarshaler, null>>(unmarshaler).UnmarshalBinary(state), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
		if (__goscriptShadow0 != null) {
			$.panic((__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(__goscriptShadow0).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}
	if ((__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(restored).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) != (__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(ieee).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)) {
		$.panic("restored state")
	}
	{
		let [, __goscriptShadow1] = await $.pointerValue<Exclude<hash.Hash32, null>>(restored).Write(new Uint8Array([116, 97, 105, 108]))
		if (__goscriptShadow1 != null) {
			$.panic((__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(__goscriptShadow1).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}
	if ((__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(restored).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) != crc32.Update((__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(ieee).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), crc32.IEEETable, new Uint8Array([116, 97, 105, 108]))) {
		$.panic("restored continuation")
	}

	let beforeInvalid = (__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(restored).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	let invalidCases: $.Slice<$.Slice<number>> = $.arrayToSlice<$.Slice<number>>([new Uint8Array([1, 2, 3]) as $.Slice<number>, new Uint8Array([99, 114, 99, 1]) as $.Slice<number>])
	for (let __goscriptRangeTarget4 = invalidCases, __goscriptRangeWindow4 = $.sliceRange(__goscriptRangeTarget4), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow4.length; __rangeIndex++) {
		let invalid = (__goscriptRangeWindow4.backing[__goscriptRangeWindow4.offset + __rangeIndex] as $.Slice<number>)
		let __goscriptShadow2 = (__goscriptAwait = $.pointerValue<Exclude<encoding.BinaryUnmarshaler, null>>(unmarshaler).UnmarshalBinary(invalid), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
		if (__goscriptShadow2 == null) {
			$.panic("invalid state accepted")
		}
		await $.println("invalid", (__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(__goscriptShadow2).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		if ((__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(restored).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) != beforeInvalid) {
			$.panic("invalid state changed hash")
		}
	}
	let other = crc32.New(crc32.MakeTable(2197175160))
	let otherUnmarshaler = $.mustTypeAssert<encoding.BinaryUnmarshaler | null>(other, "encoding.BinaryUnmarshaler")
	{
		let __goscriptShadow3 = (__goscriptAwait = $.pointerValue<Exclude<encoding.BinaryUnmarshaler, null>>(otherUnmarshaler).UnmarshalBinary(state), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
		if (__goscriptShadow3 == null) {
			$.panic("table mismatch accepted")
		} else {
			await $.println("invalid", (__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(__goscriptShadow3).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}

	let cloneSource = crc32.NewIEEE()
	await $.pointerValue<Exclude<hash.Hash32, null>>(cloneSource).Write(new Uint8Array([112, 114, 101, 102, 105, 120]))
	let __goscriptTuple4: any = $.typeAssertTuple<hash.Cloner | null>(cloneSource, "hash.Cloner")
	let cloner = __goscriptTuple4[0]
	ok = __goscriptTuple4[1]
	if (!ok) {
		$.panic("Cloner")
	}
	let __goscriptTuple5: any = await $.pointerValue<Exclude<hash.Cloner, null>>(cloner).Clone()
	let clonedHash = __goscriptTuple5[0]
	err = __goscriptTuple5[1]
	if (err != null) {
		$.panic((__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(err).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
	let clone = $.mustTypeAssert<hash.Hash32 | null>(clonedHash, "hash.Hash32")
	await $.pointerValue<Exclude<hash.Hash32, null>>(cloneSource).Write(new Uint8Array([108, 101, 102, 116]))
	await $.pointerValue<Exclude<hash.Hash32, null>>(clone).Write(new Uint8Array([114, 105, 103, 104, 116]))
	if (((__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(cloneSource).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) != crc32.ChecksumIEEE(new Uint8Array([112, 114, 101, 102, 105, 120, 108, 101, 102, 116]))) || ((__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(clone).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) != crc32.ChecksumIEEE(new Uint8Array([112, 114, 101, 102, 105, 120, 114, 105, 103, 104, 116])))) {
		$.panic("clone independence")
	}
	await $.println("clone", (__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(cloneSource).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(clone).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	void (__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(cloneSource).Reset(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	if ((((__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(cloneSource).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) != 0) || ((__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(cloneSource).Size(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) != 4)) || ((__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(cloneSource).BlockSize(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) != 1)) {
		$.panic("Reset/Size/BlockSize")
	}
	await $.println("reset", (__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(cloneSource).Sum32(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(cloneSource).Size(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<hash.Hash32, null>>(cloneSource).BlockSize(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
