// Generated file based on generic_pool_pointer_assert.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as sync from "@goscript/sync/index.js"
import * as list from "@goscript/github.com/s4wave/goscript/tests/tests/generic_pool_pointer_assert/list/index.js"

export class interval {
	public declare start: number

	public declare end: number

	constructor(__goscriptValue?: boolean, start$?: number, end$?: number) {
		this.start = start$ ?? 0
		this.end = end$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): interval {
		return new interval(true, this.start, this.end)
	}

	public __goscriptAssign(source: interval): this {
		this.start = source.start
		this.end = source.end
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.interval",
		() => new interval(),
		() => [],
		interval,
		() => [{ name: "start", key: "start", type: /* @__PURE__ */ $.basicType("int") }, { name: "end", key: "end", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class sorter {
	public declare gaps: list.List | $.VarRef<list.List> | null

	constructor(__goscriptValue?: boolean, gaps$?: list.List | $.VarRef<list.List> | null) {
		this.gaps = gaps$ ?? (null! as list.List | $.VarRef<list.List> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): sorter {
		return new sorter(true, this.gaps)
	}

	public __goscriptAssign(source: sorter): this {
		this.gaps = source.gaps
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.sorter",
		() => new sorter(),
		() => [],
		sorter,
		() => [{ name: "gaps", key: "gaps", type: /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.genericStructType("list.List", "list.List[main.interval]", () => [/* @__PURE__ */ $.structField("root", /* @__PURE__ */ $.genericStructType("list.Element", "list.Element[main.interval]", () => [/* @__PURE__ */ $.structField("next", /* @__PURE__ */ $.pointerType("list.Element[main.interval]"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/generic_pool_pointer_assert/list" }), /* @__PURE__ */ $.structField("prev", /* @__PURE__ */ $.pointerType("list.Element[main.interval]"), [1], 8, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/generic_pool_pointer_assert/list" }), /* @__PURE__ */ $.structField("list", /* @__PURE__ */ $.pointerType("list.List[main.interval]"), [2], 16, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/generic_pool_pointer_assert/list" }), /* @__PURE__ */ $.structField("Value", "main.interval", [3], 24, true)]), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/generic_pool_pointer_assert/list" }), /* @__PURE__ */ $.structField("len", /* @__PURE__ */ $.basicType("int"), [1], 40, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/generic_pool_pointer_assert/list" }), /* @__PURE__ */ $.structField("pool", /* @__PURE__ */ $.pointerType("sync.Pool"), [2], 48, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/generic_pool_pointer_assert/list" })])) }]
	)
}

export let intervalPool = $.varRef($.markAsStructValue(new sync.Pool()))

export function __goscript_set_intervalPool(__goscriptValue: sync.Pool): void {
	$.assignStruct(intervalPool.value, __goscriptValue)
}

function __goscriptInit0(): void {
	$.assignStruct(intervalPool.value, $.pointerValue<sync.Pool>(list.NewPool(__goscriptStatic0())))
}

export function newSorter(): sorter | $.VarRef<sorter> | null {
	let s = (() => { const __goscriptLiteralField0 = list.NewWithPool(__goscriptStatic0(), intervalPool); return new sorter(false, __goscriptLiteralField0) })()
	list.List.prototype.PushFront.call($.pointerValue<sorter>(s).gaps, __goscriptStatic0(), new interval(true, 0, 10))
	return s
}

export async function main(): globalThis.Promise<void> {
	let s = newSorter()
	let s$: sorter = s == null ? $.pointerTarget<sorter>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<sorter>(s)
	let e = (list.List.prototype.Front.call((s$ as sorter).gaps, __goscriptStatic0()) as list.Element | $.VarRef<list.Element> | null)
	let e$: list.Element = e == null ? $.pointerTarget<list.Element>(e) : (e as any).__isVarRef === true ? (e as any).value : (e as any).__goValue === undefined ? (e as any) : $.pointerTarget<list.Element>(e)
	await $.println(list.List.prototype.Len.call((s$ as sorter).gaps, __goscriptStatic0()), (e$ as list.Element).Value.start, (e$ as list.Element).Value.end)

	let direct = (list.NewWithPool(__goscriptStatic1(), list.NewPool(__goscriptStatic1())) as list.List | $.VarRef<list.List> | null)
	await $.println($.pointerValue<list.Element>((direct !== null && (direct as any).__isVarRef !== true && (direct as any).__goValue === undefined ? ((direct as any) as list.List).PushFront(__goscriptStatic1(), 7) : list.List.prototype.PushFront.call(direct, __goscriptStatic1(), 7))).Value)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.interval", zero: () => new interval(true) }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

__goscriptInit0()

if ($.isMainScript(import.meta)) {
	await main()
}
