// Generated file based on subpkg.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as filepath from "@goscript/path/filepath/index.js"
import * as runtime from "@goscript/runtime/index.js"
import * as strconv from "@goscript/strconv/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/subpkg", ["subpkg.Plan"])

export class Plan {
	public declare Names: $.Slice<string>

	constructor(__goscriptValue?: boolean, Names$?: $.Slice<string>) {
		this.Names = Names$ ?? (null! as $.Slice<string>)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Plan {
		return new Plan(true, this.Names)
	}

	public __goscriptAssign(source: Plan): this {
		this.Names = source.Names
		return this
	}

	public Add(__goscriptCaller?: $.CallSite): Plan | $.VarRef<Plan> | null {
		const p: Plan | $.VarRef<Plan> | null = this;
		const p$: Plan = p == null ? $.pointerTarget<Plan>(p) : (p as any).__isVarRef === true ? (p as any).value : (p as any).__goValue === undefined ? (p as any) : $.pointerTarget<Plan>(p);
		;(p$ as Plan).Names = $.appendOne((p$ as Plan).Names, Name(2, { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/subpkg/subpkg.go", line: 42, caller: __goscriptCaller }))
		return p
	}

	static __typeInfo = $.registerStructType(
		"subpkg.Plan",
		() => new Plan(),
		() => [{ name: "Add", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("subpkg.Plan") }], pointerReceiver: true }],
		Plan,
		() => [{ name: "Names", key: "Names", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")) }]
	)
}

export function Name(level: number, __goscriptCaller?: $.CallSite): string {
	let [, file, line, ok] = runtime.Caller(level, { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/subpkg/subpkg.go", line: 14, caller: __goscriptCaller })
	if (!ok) {
		return "unknown"
	}
	return filepath.Base(filepath.Dir(file)) + "/" + filepath.Base(file) + ":" + strconv.Itoa(line)
}

export function Add(names: $.VarRef<$.Slice<string>> | null, init: (() => void) | null, __goscriptCaller?: $.CallSite): void {
	names!.value = $.appendOne($.pointerValue<$.Slice<string>>(names), Name(2, { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/subpkg/subpkg.go", line: 25, caller: __goscriptCaller }))
}

export function AddOf(__typeArgs: $.GenericTypeArgs | undefined, names: $.VarRef<$.Slice<string>> | null, value: any, __goscriptCaller?: $.CallSite): void {
	names!.value = $.appendOne($.pointerValue<$.Slice<string>>(names), Name(2, { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/subpkg/subpkg.go", line: 32, caller: __goscriptCaller }))
}

export function Unmarked(): string {
	return Name(2, { file: "github.com/s4wave/goscript/tests/tests/runtime_caller_callsite/subpkg/subpkg.go", line: 49 })
}
