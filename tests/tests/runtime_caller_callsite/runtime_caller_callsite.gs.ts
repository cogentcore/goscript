// Generated file based on runtime_caller_callsite.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as subpkg from "@goscript/github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/subpkg/index.js"

export function local(names: $.VarRef<$.Slice<string>> | null, __goscriptCaller?: $.CallSite): void {
	names!.value = $.appendOne($.pointerValue<$.Slice<string>>(names), subpkg.Name(2, { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/runtime_caller_callsite.go", line: 11, caller: __goscriptCaller }))
}

export async function main(): globalThis.Promise<void> {
	let names: $.VarRef<$.Slice<string>> = $.varRef(null! as $.Slice<string>)
	subpkg.Add(names, $.functionValue(() => {
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)), { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/runtime_caller_callsite.go", line: 16 })
	subpkg.Add(names, $.functionValue(() => {
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)), { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/runtime_caller_callsite.go", line: 18 })
	subpkg.AddOf(__goscriptStatic0(), names, 1, { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/runtime_caller_callsite.go", line: 22 })
	subpkg.AddOf(__goscriptStatic1(), names, "two", { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/runtime_caller_callsite.go", line: 23 })
	local(names, { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/runtime_caller_callsite.go", line: 25 })
	void (() => {
		subpkg.Add(names, (null as (() => void) | null), { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/runtime_caller_callsite.go", line: 26 })
	})()
	let p = new subpkg.Plan()
	subpkg.Plan.prototype.Add.call((p !== null && (p as any).__isVarRef !== true && (p as any).__goValue === undefined ? ((p as any) as subpkg.Plan).Add({ file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/runtime_caller_callsite.go", line: 29 }) : subpkg.Plan.prototype.Add.call(p, { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/runtime_caller_callsite.go", line: 29 })), { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/runtime_caller_callsite.go", line: 30 })
	names.value = $.appendSlice(names.value, $.pointerValue<subpkg.Plan>(p).Names)
	for (let __goscriptRangeTarget0 = names.value, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let name = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
		await $.println(name)
	}

	// Calls the chain does not reach still find a frame.
	let add: ((names: $.VarRef<$.Slice<string>> | null, init: (() => void) | null) => void) | null = subpkg.Add
	add!(names, (null as (() => void) | null))
	await $.println("value call named:", !$.stringEqual($.plainSliceIndex(names.value!, $.sliceLen(names.value) - 1), ""))
	await $.println("unmarked named:", !$.stringEqual(subpkg.Unmarked(), ""))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
