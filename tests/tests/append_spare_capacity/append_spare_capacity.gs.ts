// Generated file based on append_spare_capacity.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class pos {
	public declare Line: number

	public declare Char: number

	constructor(init?: Partial<{Line?: number, Char?: number}>, __goscriptValue?: boolean) {
		this.Line = init?.Line ?? (0 as number)
		this.Char = init?.Char ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): pos {
		return new pos(this, true)
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
		ps = $.appendOne(ps, new pos({Line: i + 1, Char: i}, true))
	}
	let all = $.goSlice(ps, undefined, $.cap(ps))
	await $.println($.sliceLen(ps), $.cap(ps), $.arrayIndex(all!, 4).Line, $.arrayIndex(all!, 5).Line, $.arrayIndex(all!, 7).Char)
	$.arrayIndex(all!, 5).Line = 9
	await $.println($.arrayIndex(all!, 5).Line, $.arrayIndex(all!, 6).Line)

	// Appending after a reslice writes the slot the reslice zeroed.
	let more = $.appendOne(ps, new pos({Line: 42}, true))
	await $.println($.arrayIndex(more!, 5).Line, $.arrayIndex(all!, 5).Line)

	// Grown slices of other element types have their zero values too.
	let ns: $.Slice<number> = null! as $.Slice<number>
	let ss: $.Slice<string> = null! as $.Slice<string>
	let ptrs: $.Slice<pos | $.VarRef<pos> | null> = null! as $.Slice<pos | $.VarRef<pos> | null>
	for (let i = 0; i < 3; i++) {
		ns = $.appendOne(ns, i + 1)
		ss = $.appendOne(ss, "x")
		ptrs = $.appendOne(ptrs, new pos({Line: i}), $.appendZeros.nil)
	}
	let nall = $.goSlice(ns, undefined, $.cap(ns))
	let sall = $.goSlice(ss, undefined, $.cap(ss))
	let pall = $.goSlice(ptrs, undefined, $.cap(ptrs))
	await $.println($.arrayIndex(nall!, 3), $.stringLen($.arrayIndex(sall!, 3)), $.arrayIndex(pall!, 3) == null, $.pointerValue<pos>($.arrayIndex(ptrs!, 2)).Line)

	// A grown copy holds copies of the struct elements.
	let small = $.makeSlice<pos>(1, 1, undefined, () => new pos(undefined, true))
	$.arrayIndex(small!, 0).Line = 7
	let grown = $.appendOne(small, new pos({Line: 8}, true))
	$.arrayIndex(grown!, 0).Line = 70
	await $.println($.arrayIndex(small!, 0).Line, $.arrayIndex(grown!, 0).Line, $.arrayIndex(grown!, 1).Line)

	// Appending a slice grows the same way.
	let ext = $.appendSlice($.arrayToSlice<pos>([new pos({Line: 1}, true)]), $.arrayToSlice<pos>([new pos({Line: 2}, true), new pos({Line: 3}, true)]))
	let full = $.goSlice(ext, undefined, $.cap(ext))
	await $.println($.sliceLen(ext), $.cap(ext) >= 3, $.arrayIndex(full!, $.sliceLen(full) - 1).Line)
}

if ($.isMainScript(import.meta)) {
	await main()
}
