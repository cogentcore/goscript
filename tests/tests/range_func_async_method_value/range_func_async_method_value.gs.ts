// Generated file based on range_func_async_method_value.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type provider = {
	Items(): $.Slice<Group | $.VarRef<Group> | null>
}

$.registerInterfaceType(
	"main.provider",
	null,
	[{ name: "Items", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.Group")) }] }]
);

export class listProvider {
	public declare items: $.Slice<Group | $.VarRef<Group> | null>

	constructor(__goscriptValue?: boolean, items$?: $.Slice<Group | $.VarRef<Group> | null>) {
		this.items = items$ ?? (null! as $.Slice<Group | $.VarRef<Group> | null>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): listProvider {
		return new listProvider(true, this.items)
	}

	public __goscriptAssign(source: listProvider): this {
		this.items = source.items
		return this
	}

	public Items(): $.Slice<Group | $.VarRef<Group> | null> {
		const p: listProvider | $.VarRef<listProvider> | null = this;
		return $.pointerValue<listProvider>(p).items
	}

	static __typeInfo = $.registerStructType(
		"main.listProvider",
		() => new listProvider(),
		() => [{ name: "Items", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.Group")) }], pointerReceiver: true }],
		listProvider,
		() => [{ name: "items", key: "items", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.Group")) }]
	)
}

export class Group {
	public declare provider: provider | null

	public declare seen: boolean

	constructor(__goscriptValue?: boolean, provider$?: provider | null, seen$?: boolean) {
		this.provider = provider$ ?? (null! as provider | null)
		this.seen = seen$ ?? false
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Group {
		return new Group(true, this.provider, this.seen)
	}

	public __goscriptAssign(source: Group): this {
		this.provider = $.assignFieldValue(this.provider, source.provider, "main.provider")
		this.seen = source.seen
		return this
	}

	public Build(): void {
		const g: Group | $.VarRef<Group> | null = this;
		let __goscriptRangeReturn0 = false
		;(() => {
			$.functionValue(((__receiver) => (_yield: ((_p0: Group | $.VarRef<Group> | null) => boolean | globalThis.Promise<boolean>) | null) => __receiver.Each(_yield))($.pointerValue<Group>(g)), ({ kind: $.TypeKind.Function, params: [({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.Group")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo), "main.(*Group).Each-fm")!((child) => {
				$.pointerValue<Group>(child).seen = true
				return true
			})
		})()
		if (__goscriptRangeReturn0) {
			return
		}
	}

	public Each(_yield: ((_p0: Group | $.VarRef<Group> | null) => boolean | globalThis.Promise<boolean>) | null): void {
		const g: Group | $.VarRef<Group> | null = this;
		for (let __goscriptRangeTarget0 = $.pointerValue<Exclude<provider, null>>($.pointerValue<Group>(g).provider).Items(), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
			let child = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as Group | $.VarRef<Group> | null)
			if (!(_yield!(child) as boolean)) {
				return
			}
		}
	}

	static __typeInfo = $.registerStructType(
		"main.Group",
		() => new Group(),
		() => [{ name: "Build", args: [], returns: [], pointerReceiver: true }, { name: "Each", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		Group,
		() => [{ name: "provider", key: "provider", type: "main.provider" }, { name: "seen", key: "seen", type: /* @__PURE__ */ $.basicType("bool") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let child = new Group()
	let root = new Group(false, $.interfaceValue<provider | null>(new listProvider(false, $.arrayToSlice<Group | $.VarRef<Group> | null>([child])), "*main.listProvider", /* @__PURE__ */ $.pointerType("main.listProvider")))
	void (root !== null && (root as any).__isVarRef !== true && (root as any).__goValue === undefined ? ((root as any) as Group).Build() : Group.prototype.Build.call(root))
	await $.println($.pointerValue<Group>(child).seen)
}

if ($.isMainScript(import.meta)) {
	await main()
}
