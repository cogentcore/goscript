// Generated file based on reflect_pkgpath_full.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"

import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/reflect_pkgpath_full/dep/index.js"
import "@goscript/reflect/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/reflect_pkgpath_full/dep/index.js"

export class mainType {
	public _fields: {
	}

	constructor(init?: Partial<{}>) {
		this._fields = {
		}
	}

	public clone(): mainType {
		return $.markAsStructValue(new mainType(this))
	}

	static __typeInfo = $.registerStructType(
		"main.mainType",
		() => new mainType(),
		() => [],
		mainType,
		() => []
	)
}

export async function show(label: string, t: reflect.Type | null): globalThis.Promise<void> {
	await $.println($.concatString(label, ":"), await $.pointerValue<Exclude<reflect.Type, null>>(t).PkgPath(), await $.pointerValue<Exclude<reflect.Type, null>>(t).Name(), await $.pointerValue<Exclude<reflect.Type, null>>(t).String())
}

export async function main(): globalThis.Promise<void> {
	await show("struct", reflect.TypeOf($.interfaceValue($.markAsStructValue(new dep.Node()), "dep.Node", "dep.Node")))
	await show("pointer elem", await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(new dep.Node(), "*dep.Node", /* @__PURE__ */ $.pointerType("dep.Node")))).Elem())
	await show("basic", reflect.TypeOf($.namedValueInterfaceValue<any>(1, "dep.Level", {}, /* @__PURE__ */ $.basicType("int", "dep.Level"))))
	await show("interface", reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "dep.Namer", zero: () => null, methods: {Name: (receiver: any, ...args: any[]) => receiver.Name(...$.stripGenericTypeArgs(args))} }}))
	await show("local", dep.LocalType())
	await show("main", reflect.TypeOf($.interfaceValue($.markAsStructValue(new mainType()), "main.mainType", "main.mainType")))
	await $.println("generic:", await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue($.markAsStructValue(new dep.Box({Value: 0})), "dep.Box", "dep.Box"))).PkgPath())
	await $.println("unnamed:", $.stringEqual(await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue($.arrayToSlice<dep.Node>([]), "[]dep.Node", /* @__PURE__ */ $.sliceType("dep.Node")))).PkgPath(), ""))
}

if ($.isMainScript(import.meta)) {
	await main()
}
