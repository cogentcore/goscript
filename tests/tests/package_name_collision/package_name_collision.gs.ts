// Generated file based on package_name_collision.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as reflect from "@goscript/reflect/index.js"
import * as aast from "@goscript/github.com/s4wave/goscript/tests/tests/package_name_collision/first/ast/index.js"
import * as bast from "@goscript/github.com/s4wave/goscript/tests/tests/package_name_collision/second/ast/index.js"

export function kind(n: aast.Node | null): string {
	{
		const __goscriptTypeSwitchValue = n
		switch (true) {
			case $.typeAssert<aast.List | $.VarRef<aast.List> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("ast·122t5xq.List")).ok:
				{
					return "list"
				}
				break
			case $.typeAssert<aast.ListItem | $.VarRef<aast.ListItem> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("ast·122t5xq.ListItem")).ok:
				{
					return "item"
				}
				break
			case $.typeAssert<aast.Paragraph | $.VarRef<aast.Paragraph> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("ast·122t5xq.Paragraph")).ok:
				{
					return "para"
				}
				break
		}
	}
	return "other"
}

export async function main(): globalThis.Promise<void> {
	let l = new aast.List()
	let it = new aast.ListItem()
	let it$: aast.ListItem = it == null ? $.pointerTarget<aast.ListItem>(it) : (it as any).__isVarRef === true ? (it as any).value : (it as any).__goValue === undefined ? (it as any) : $.pointerTarget<aast.ListItem>(it);
	;(it$ as aast.ListItem).Container.Parent = $.interfaceValue<aast.Node | null>(l, "*ast·122t5xq.List", /* @__PURE__ */ $.pointerType("ast·122t5xq.List"))
	let p = new aast.Paragraph()
	let p$: aast.Paragraph = p == null ? $.pointerTarget<aast.Paragraph>(p) : (p as any).__isVarRef === true ? (p as any).value : (p as any).__goValue === undefined ? (p as any) : $.pointerTarget<aast.Paragraph>(p);
	;(p$ as aast.Paragraph).Container.Parent = $.interfaceValue<aast.Node | null>(it, "*ast·122t5xq.ListItem", /* @__PURE__ */ $.pointerType("ast·122t5xq.ListItem"))
	fmt.Println(kind($.interfaceValue<aast.Node | null>(l, "*ast·122t5xq.List", /* @__PURE__ */ $.pointerType("ast·122t5xq.List"))), kind($.interfaceValue<aast.Node | null>(it, "*ast·122t5xq.ListItem", /* @__PURE__ */ $.pointerType("ast·122t5xq.ListItem"))), kind($.interfaceValue<aast.Node | null>(p, "*ast·122t5xq.Paragraph", /* @__PURE__ */ $.pointerType("ast·122t5xq.Paragraph"))), kind((p$ as aast.Paragraph).Container.Parent), kind((it$ as aast.ListItem).Container.Parent))
	let [, ok] = $.typeAssertTuple<aast.List | $.VarRef<aast.List> | null>((it$ as aast.ListItem).Container.Parent, /* @__PURE__ */ $.pointerType("ast·122t5xq.List"))
	fmt.Println("parent list", ok)
	let bn: bast.Node | null = $.interfaceValue<bast.Node | null>(new bast.List(false, 3), "*ast·123smei.List", /* @__PURE__ */ $.pointerType("ast·123smei.List"))
	let [, isA] = $.typeAssertTuple<aast.Node | null>((bn as any), "ast·122t5xq.Node")
	fmt.Println("b list is a node", isA, $.basicInterfaceValue((__goscriptAwait = (bn !== null && (bn as any).__isVarRef !== true && ((bn as any).__goValue === undefined || (bn as any).__goType?.charCodeAt(0) !== 42) ? (bn as Exclude<bast.Node, null>) : $.pointerValue<Exclude<bast.Node, null>>(bn)).Pos(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "int"))
	fmt.Println((reflect.TypeOf($.interfaceValue(new aast.Type(true), "ast·122t5xq.Type", "ast·122t5xq.Type")) as any), (reflect.TypeOf($.interfaceValue(new bast.Type(true), "ast·123smei.Type", "ast·123smei.Type")) as any), $.basicInterfaceValue((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(new aast.Type(true), "ast·122t5xq.Type", "ast·122t5xq.Type"))).NumField(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "int"), ((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(new bast.Type(true), "ast·123smei.Type", "ast·123smei.Type"))).Field(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField).Name)
	fmt.Printf("%T %T %#v\n", $.interfaceValue(l, "*ast·122t5xq.List", /* @__PURE__ */ $.pointerType("ast·122t5xq.List")), (bn as any), $.interfaceValue(new bast.Type(true, 2), "ast·123smei.Type", "ast·123smei.Type"))
	let [, isB] = $.typeAssertTuple<bast.Node | null>($.interfaceValue(l, "*ast·122t5xq.List", /* @__PURE__ */ $.pointerType("ast·122t5xq.List")), "ast·123smei.Node")
	fmt.Println("a list is a b node", isB, !$.stringEqual((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(l, "*ast·122t5xq.List", /* @__PURE__ */ $.pointerType("ast·122t5xq.List")))).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).PkgPath(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf((bn as any))).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).PkgPath(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
