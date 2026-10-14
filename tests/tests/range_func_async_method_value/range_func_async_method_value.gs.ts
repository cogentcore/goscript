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
	public get items(): $.Slice<Group | $.VarRef<Group> | null> {
		return this._fields.items
	}

	public set items(value: $.Slice<Group | $.VarRef<Group> | null>) {
		this._fields.items = value
	}

	public _fields: {
		items: $.Slice<Group | $.VarRef<Group> | null>
	}

	constructor(init?: Partial<{items?: $.Slice<Group | $.VarRef<Group> | null>}>) {
		this._fields = {
			items: init?.items ?? (null! as $.Slice<Group | $.VarRef<Group> | null>)
		}
	}

	public clone(): listProvider {
		return $.markAsStructValue(new listProvider(this))
	}

	public __goscriptAssign(source: listProvider): void {
		const target = this._fields
		const values = source._fields
		target.items = values.items
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
	public get provider(): provider | null {
		return this._fields.provider
	}

	public set provider(value: provider | null) {
		this._fields.provider = value
	}

	public get seen(): boolean {
		return this._fields.seen
	}

	public set seen(value: boolean) {
		this._fields.seen = value
	}

	public _fields: {
		provider: provider | null
		seen: boolean
	}

	constructor(init?: Partial<{provider?: provider | null, seen?: boolean}>) {
		this._fields = {
			provider: init?.provider ?? (null! as provider | null),
			seen: init?.seen ?? (false as boolean)
		}
	}

	public clone(): Group {
		return $.markAsStructValue(new Group(this))
	}

	public __goscriptAssign(source: Group): void {
		const target = this._fields
		const values = source._fields
		target.provider = $.assignFieldValue(target.provider, values.provider, "main.provider")
		target.seen = values.seen
	}

	public async Build(): globalThis.Promise<void> {
		const g: Group | $.VarRef<Group> | null = this;
		let __goscriptRangeReturn0 = false
		;await (async () => {
			await $.functionValue(((__receiver) => (_yield: ((_p0: Group | $.VarRef<Group> | null) => boolean | globalThis.Promise<boolean>) | null) => __receiver.Each(_yield))($.pointerValue<Group>(g)), ({ kind: $.TypeKind.Function, params: [({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.Group")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo), "main.(*Group).Each-fm")!(async (child) => {
				$.pointerValue<Group>(child).seen = true
				return true
			})
		})()
		if (__goscriptRangeReturn0) {
			return
		}
	}

	public async Each(_yield: ((_p0: Group | $.VarRef<Group> | null) => boolean | globalThis.Promise<boolean>) | null): globalThis.Promise<void> {
		const g: Group | $.VarRef<Group> | null = this;
		for (let __goscriptRangeTarget0 = (__goscriptAwait = $.pointerValue<Exclude<provider, null>>($.pointerValue<Group>(g).provider).Items(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
			let child = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as Group | $.VarRef<Group> | null)
			if (!(__goscriptAwait = _yield!(child), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)) {
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
	let child: Group | $.VarRef<Group> | null = new Group()
	let root: Group | $.VarRef<Group> | null = new Group({provider: $.interfaceValue<provider | null>(new listProvider({items: $.arrayToSlice<Group | $.VarRef<Group> | null>([child])}), "*main.listProvider", /* @__PURE__ */ $.pointerType("main.listProvider"))})
	await Group.prototype.Build.call(root)
	await $.println($.pointerValue<Group>(child).seen)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
