// Generated file based on append_spare_capacity.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class pos {
	public declare Line: number

	public declare Char: number

	constructor(__goscriptValue?: boolean, Line$?: number, Char$?: number) {
		this.Line = Line$ ?? 0
		this.Char = Char$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): pos {
		return new pos(true, this.Line, this.Char)
	}

	public __goscriptAssign(source: pos): this {
		this.Line = source.Line
		this.Char = source.Char
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.pos",
		() => new pos(),
		() => [],
		pos,
		() => [{ name: "Line", key: "Line", type: /* @__PURE__ */ $.basicType("int") }, { name: "Char", key: "Char", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// The spare capacity of a grown slice of structs holds zero values,
	// each its own, when a slice extends into it.
	let ps: $.Slice<pos> = null! as $.Slice<pos>
	for (let i = 0; i < 5; i++) {
		ps = $.appendOne(ps, new pos(true, i + 1, i))
	}
	let all = $.goSlice(ps, undefined, $.cap(ps))
	await $.println($.sliceLen(ps), $.cap(ps), $.arrayIndex(all!, 4).Line, $.arrayIndex(all!, 5).Line, $.arrayIndex(all!, 7).Char)
	$.arrayIndex(all!, 5).Line = 9
	await $.println($.arrayIndex(all!, 5).Line, $.arrayIndex(all!, 6).Line)

	// Appending after a reslice writes the slot the reslice zeroed.
	let more = $.appendOne(ps, new pos(true, 42))
	await $.println($.arrayIndex(more!, 5).Line, $.arrayIndex(all!, 5).Line)

	// Grown slices of other element types have their zero values too.
	let ns: $.Slice<number> = null! as $.Slice<number>
	let ss: $.Slice<string> = null! as $.Slice<string>
	let ptrs: $.Slice<pos | $.VarRef<pos> | null> = null! as $.Slice<pos | $.VarRef<pos> | null>
	for (let i = 0; i < 3; i++) {
		ns = $.appendOne(ns, i + 1)
		ss = $.appendOne(ss, "x")
		ptrs = $.appendOne(ptrs, new pos(false, i), $.appendZeros.nil)
	}
	let nall = $.goSlice(ns, undefined, $.cap(ns))
	let sall = $.goSlice(ss, undefined, $.cap(ss))
	let pall = $.goSlice(ptrs, undefined, $.cap(ptrs))
	await $.println($.arrayIndex(nall!, 3), $.stringLen($.arrayIndex(sall!, 3)), $.arrayIndex(pall!, 3) == null, $.pointerValue<pos>($.arrayIndex(ptrs!, 2)).Line)

	// A grown copy holds copies of the struct elements.
	let small = $.makeSlice<pos>(1, 1, undefined, () => new pos(true))
	$.arrayIndex(small!, 0).Line = 7
	let grown = $.appendOne(small, new pos(true, 8))
	$.arrayIndex(grown!, 0).Line = 70
	await $.println($.arrayIndex(small!, 0).Line, $.arrayIndex(grown!, 0).Line, $.arrayIndex(grown!, 1).Line)

	// Appending a slice grows the same way.
	let ext = $.appendSlice($.arrayToSlice<pos>([new pos(true, 1)]), $.arrayToSlice<pos>([new pos(true, 2), new pos(true, 3)]))
	let full = $.goSlice(ext, undefined, $.cap(ext))
	await $.println($.sliceLen(ext), $.cap(ext) >= 3, $.arrayIndex(full!, $.sliceLen(full) - 1).Line)

	// Several values append in place into spare capacity, each a copy.
	let p = new pos(true, 5)
	let pair: $.Slice<pos> = $.appendValues($.makeSlice<pos>(0, 4, undefined, () => new pos(true)), undefined, (p).clone(), (p).clone())
	$.arrayIndex(pair!, 0).Line = 50
	p.Line = 500
	let shared = $.goSlice(pair, undefined, 3)
	pair = $.appendValues(pair, undefined, new pos(true, 6), new pos(true, 7))
	await $.println($.sliceLen(pair), $.arrayIndex(pair!, 0).Line, $.arrayIndex(pair!, 1).Line, $.arrayIndex(pair!, 2).Line, $.arrayIndex(shared!, 2).Line, $.arrayIndex(pair!, 3).Line)

	// Typed and zero-hinted elements append several values in place and
	// when they grow.
	let fs: $.Slice<number> = $.makeSlice<number>(0, 4, "float32")
	let fview = $.goSlice(fs, undefined, 4)
	fs = $.appendValues(fs, $.typedSliceHints.float32, 0.10000000149011612, 0.5, 2)
	await $.println($.sliceLen(fs), $.cap(fs), $.arrayIndex(fview!, 0) == $.arrayIndex(fs!, 0), $.arrayIndex(fview!, 2))
	fs = $.appendValues(fs, $.typedSliceHints.float32, 3, 4, 5)
	$.sliceElems(fview!)[$.sliceSlot(fview!, 1)] = 9
	await $.println($.sliceLen(fs), $.arrayIndex(fs!, 1), $.arrayIndex(fs!, 5), $.arrayIndex(fs!, 0) == 0.10000000149011612)
	let cs: $.Slice<$.Complex> = null! as $.Slice<$.Complex>
	cs = $.appendValues(cs, $.appendZeros.complex, $.complex(1, 2), $.complex(3, 0))
	let nps: $.Slice<pos | $.VarRef<pos> | null> = null! as $.Slice<pos | $.VarRef<pos> | null>
	nps = $.appendValues(nps, $.appendZeros.nil, null, new pos(false, 8))
	await $.println($.sliceLen(cs), $.real($.arrayIndex(cs!, 0)), $.imag($.arrayIndex(cs!, 1)), $.sliceLen(nps), $.arrayIndex(nps!, 0) == null, $.pointerValue<pos>($.arrayIndex(nps!, 1)).Line)
}

if ($.isMainScript(import.meta)) {
	await main()
}
