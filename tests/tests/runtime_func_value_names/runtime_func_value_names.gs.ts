// Generated file based on runtime_func_value_names.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"

import * as runtime from "@goscript/runtime/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/reflect/index.js"
import "@goscript/runtime/index.js"
import "@goscript/strings/index.js"

export class T {
	public declare n: number

	public _fields: {
		n: number
	}

	constructor(init?: Partial<{n?: number}>) {
		this._fields = {
			n: init?.n ?? (0 as number)
		}
	}

	public clone(): T {
		return $.markAsStructValue(new T(this))
	}

	public PtrMethod(): number {
		const t: T | $.VarRef<T> | null = this;
		return $.pointerValue<T>(t).n
	}

	public ValMethod(): number {
		const t = this;
		return t.n
	}

	static {
		$.bindStructFields(this.prototype, ["n"])
	}

	static __typeInfo = $.registerStructType(
		"main.T",
		() => new T(),
		() => [$.methodSignature("PtrMethod", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("ValMethod", [], [/* @__PURE__ */ $.basicType("int")])],
		T,
		() => [/* @__PURE__ */ $.structField("n", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/runtime_func_value_names" })]
	)
}

export class G {
	public declare v: any

	public _fields: {
		v: any
	}

	constructor(init?: Partial<{v?: any}>) {
		this._fields = {
			v: init?.v ?? (null! as any)
		}
	}

	public clone(): G {
		return $.markAsStructValue(new G(this))
	}

	public Get(__typeArgs: $.GenericTypeArgs | undefined): any {
		const g: G | $.VarRef<G> | null = this;
		return $.pointerValue<G>(g).v
	}

	static {
		$.bindStructFields(this.prototype, ["v"])
	}

	static __typeInfo = $.registerStructType(
		"main.G",
		() => new G(),
		() => [$.methodSignature("Get", [], [{ kind: $.TypeKind.Interface, methods: [] }])],
		G,
		() => [/* @__PURE__ */ $.structField("v", { kind: $.TypeKind.Interface, methods: [] }, [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/runtime_func_value_names" })]
	)
}

export function funcName(f: any): string {
	return runtime.Func.prototype.Name.call($.pointerValue<runtime.Func>(runtime.FuncForPC($.uint($.markAsStructValue($.cloneStructValue(reflect.ValueOf(f))).Pointer(), 64))))
}

export function helperFunc(): void {
}

export async function main(): globalThis.Promise<void> {
	await $.println("func:", funcName($.interfaceValue($.goFunc(helperFunc, "main.helperFunc"), "func()", ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))))
	await $.println("imported:", funcName($.interfaceValue($.goFunc(strings.ToUpper, "strings.ToUpper"), "func(s string) string", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))))

	let t: T | $.VarRef<T> | null = new T({n: 1})
	await $.println("pointer method:", funcName($.interfaceValue($.functionValue(((__receiver) => () => __receiver.PtrMethod())($.pointerValue<T>(t)), ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo), "main.(*T).PtrMethod-fm"), "func() int", ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))))
	await $.println("value method:", funcName($.interfaceValue($.functionValue(((__receiver) => () => __receiver.ValMethod())($.markAsStructValue($.cloneStructValue($.pointerValue<T>(t)))), ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo), "main.T.ValMethod-fm"), "func() int", ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))))

	let g: G | $.VarRef<G> | null = new G({v: 2})
	await $.println("generic method:", funcName($.interfaceValue($.functionValue(((__receiver) => () => __receiver.Get({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}))($.pointerValue<G>(g)), ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo), "main.(*G[...]).Get-fm"), "func() int", ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))))
}

if ($.isMainScript(import.meta)) {
	await main()
}
