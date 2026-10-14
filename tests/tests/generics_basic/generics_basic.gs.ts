// Generated file based on generics_basic.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Ordered = any

$.registerInterfaceType(
	"main.Ordered",
	null,
	[]
);

export type Score = number

export type Set = globalThis.Map<any, {}> | null

export type Cloner = {
	Clone(__typeArgs: $.GenericTypeArgs | undefined): any
}

$.registerInterfaceType(
	"main.Cloner",
	null,
	[{ name: "Clone", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }]
);

export class Stack {
	public get items(): $.Slice<any> {
		return this._fields.items
	}

	public set items(value: $.Slice<any>) {
		this._fields.items = value
	}

	public _fields: {
		items: $.Slice<any>
	}

	constructor(init?: Partial<{items?: $.Slice<any>}>, __goscriptValue?: boolean) {
		this._fields = {
			items: init?.items ?? (null! as $.Slice<any>)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Stack {
		return new Stack(this, true)
	}

	public __goscriptAssign(source: Stack): void {
		const target = this._fields
		const values = source._fields
		target.items = values.items
	}

	public Len(__typeArgs: $.GenericTypeArgs | undefined): number {
		const s: Stack | $.VarRef<Stack> | null = this;
		return $.sliceLen($.pointerValue<Stack>(s).items)
	}

	public Pop(__typeArgs: $.GenericTypeArgs | undefined): [any, boolean] {
		let s: Stack | $.VarRef<Stack> | null = this;
		if ($.sliceLen($.pointerValue<Stack>(s).items) == 0) {
			$.panic("pop from empty stack")
		}
		let last = $.sliceLen($.pointerValue<Stack>(s).items) - 1
		let value = $.copyElement($.arrayIndex($.pointerValue<Stack>(s).items!, last))
		$.pointerValue<Stack>(s).items = $.goSlice($.pointerValue<Stack>(s).items, undefined, last)
		return [$.copyElement(value), true]
	}

	public Push(__typeArgs: $.GenericTypeArgs | undefined, value: any): void {
		let s: Stack | $.VarRef<Stack> | null = this;
		$.pointerValue<Stack>(s).items = $.append($.pointerValue<Stack>(s).items, value, $.appendZero(() => ($.genericZero(__typeArgs, "T", null) as any)))
	}

	static __typeInfo = $.registerStructType(
		"main.Stack",
		() => new Stack(),
		() => [{ name: "Len", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }, { name: "Pop", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }, { type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "Push", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		Stack,
		() => [{ name: "items", key: "items", type: /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] }) }]
	)
}

export class Item {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Item {
		return new Item(this, true)
	}

	public __goscriptAssign(source: Item): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
	}

	public Clone(): Item | $.VarRef<Item> | null {
		const i: Item | $.VarRef<Item> | null = this;
		if (i == null) {
			return null
		}
		return new Item({Name: $.concatString($.pointerValue<Item>(i).Name, " copy")})
	}

	static __typeInfo = $.registerStructType(
		"main.Item",
		() => new Item(),
		() => [{ name: "Clone", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("main.Item") }], pointerReceiver: true }],
		Item,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Mapper {
	public get values(): globalThis.Map<any, any> | null {
		return this._fields.values
	}

	public set values(value: globalThis.Map<any, any> | null) {
		this._fields.values = value
	}

	public _fields: {
		values: globalThis.Map<any, any> | null
	}

	constructor(init?: Partial<{values?: globalThis.Map<any, any> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			values: init?.values ?? (null! as globalThis.Map<any, any> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Mapper {
		return new Mapper(this, true)
	}

	public __goscriptAssign(source: Mapper): void {
		const target = this._fields
		const values = source._fields
		target.values = values.values
	}

	public Get(__typeArgs: $.GenericTypeArgs | undefined, key: any): [any, boolean] {
		const m: Mapper | $.VarRef<Mapper> | null = this;
		let [value, ok] = $.mapGet<any, any, any>($.pointerValue<Mapper>(m).values, key, null)
		return [$.copyElement(value), ok]
	}

	public Put(__typeArgs: $.GenericTypeArgs | undefined, key: any, value: any): void {
		let m: Mapper | $.VarRef<Mapper> | null = this;
		$.mapSet($.pointerValue<Mapper>(m).values, key, $.copyElement(value))
	}

	static __typeInfo = $.registerStructType(
		"main.Mapper",
		() => new Mapper(),
		() => [{ name: "Get", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }, { type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "Put", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		Mapper,
		() => [{ name: "values", key: "values", type: /* @__PURE__ */ $.mapType({ kind: $.TypeKind.Interface, methods: [] }, { kind: $.TypeKind.Interface, methods: [] }) }]
	)
}

export class Pair {
	public get First(): any {
		return this._fields.First
	}

	public set First(value: any) {
		this._fields.First = value
	}

	public get Second(): any {
		return this._fields.Second
	}

	public set Second(value: any) {
		this._fields.Second = value
	}

	public _fields: {
		First: any
		Second: any
	}

	constructor(init?: Partial<{First?: any, Second?: any}>, __goscriptValue?: boolean) {
		this._fields = {
			First: init?.First !== undefined ? $.copyElement(init.First) : (null! as any),
			Second: init?.Second !== undefined ? $.copyElement(init.Second) : (null! as any)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pair {
		return new Pair(this, true)
	}

	public __goscriptAssign(source: Pair): void {
		const target = this._fields
		const values = source._fields
		target.First = $.assignFieldValue(target.First, values.First, { kind: $.TypeKind.Interface, methods: [] })
		target.Second = $.assignFieldValue(target.Second, values.Second, { kind: $.TypeKind.Interface, methods: [] })
	}

	public Swap(__typeArgs: $.GenericTypeArgs | undefined): Pair {
		const p = this;
		return $.markAsStructValue(new Pair({First: $.copyElement(p.Second), Second: $.copyElement(p.First)}))
	}

	static __typeInfo = $.registerStructType(
		"main.Pair",
		() => new Pair(),
		() => [{ name: "Swap", args: [], returns: [{ type: "main.Pair" }] }],
		Pair,
		() => [{ name: "First", key: "First", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Second", key: "Second", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export function min(__typeArgs: $.GenericTypeArgs | undefined, a: any, b: any): any {
	if ((b as any) < (a as any)) {
		return b
	}
	return a
}

export function NewSet<T>(__typeArgs: $.GenericTypeArgs | undefined, values: $.Slice<T>): Set {
	let _set: Set = $.makeMap<any, {}>(undefined, __typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })
	for (let __goscriptRangeTarget0 = values, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let value = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as any)
		$.mapSet(_set, value, {})
	}
	return _set
}

export function Set_Add(s: Set, __typeArgs: $.GenericTypeArgs | undefined, value: any): void {
	$.mapSet(s, value, {})
}

export function Set_Has(s: Set, __typeArgs: $.GenericTypeArgs | undefined, value: any): boolean {
	let [, ok] = $.mapGet<any, {}, {}>(s, value, {})
	return ok
}

export async function CloneAll<T>(__typeArgs: $.GenericTypeArgs | undefined, items: $.Slice<T>): globalThis.Promise<$.Slice<T>> {
	let clones: $.Slice<T> = $.makeSlice<T>(0, $.sliceLen(items), undefined, () => ($.genericZero(__typeArgs, "T", null) as T))
	for (let __goscriptRangeTarget1 = items, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let item = $.copyElement((__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as any))
		clones = $.append(clones, (__goscriptAwait = $.callGenericMethod(__typeArgs, "T", "Clone", item), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.appendZero(() => ($.genericZero(__typeArgs, "T", null) as T)))
	}
	return clones
}

export function NewMapper(__typeArgs: $.GenericTypeArgs | undefined): Mapper | $.VarRef<Mapper> | null {
	return new Mapper({values: $.makeMap<any, any>(undefined, __typeArgs?.["K"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })})
}

export async function Apply(__typeArgs: $.GenericTypeArgs | undefined, value: any, fn: ((_p0: any) => any | globalThis.Promise<any>) | null): globalThis.Promise<any> {
	return fn!($.copyElement(value))
}

export async function main(): globalThis.Promise<void> {
	await $.println("=== Generic constraints ===")
	await $.println("min:", min(__goscriptStatic0(), 8, 3), min(__goscriptStatic1(), 9, 4), min(__goscriptStatic2(), "go", "ts"))

	await $.println("=== Generic stack ===")
	let stack: $.VarRef<Stack> = $.varRef($.markAsStructValue(new Stack()))
	stack.value.Push(__goscriptStatic0(), 10)
	stack.value.Push(__goscriptStatic0(), 20)
	let __goscriptTuple0: any = stack.value.Pop(__goscriptStatic0())
	let value = (__goscriptTuple0[0] as number)
	let ok = __goscriptTuple0[1]
	await $.println("pop:", value, ok, stack.value.Len(__goscriptStatic0()))
	let __goscriptTuple1: any = stack.value.Pop(__goscriptStatic0())
	value = (__goscriptTuple1[0] as number)
	ok = __goscriptTuple1[1]
	await $.println("pop:", value, ok, stack.value.Len(__goscriptStatic0()))

	await $.println("=== Generic map alias ===")
	let seen: Set = (NewSet(__goscriptStatic2(), $.arrayToSlice<string>(["go", "ts"])) as Set)
	Set_Add(seen, __goscriptStatic2(), "wasm")
	await $.println("set:", Set_Has(seen, __goscriptStatic2(), "go"), Set_Has(seen, __goscriptStatic2(), "rust"), $.len(seen))

	await $.println("=== Interface constraint ===")
	let items: $.Slice<Item | $.VarRef<Item> | null> = $.arrayToSlice<Item | $.VarRef<Item> | null>([new Item({Name: "alpha"}), new Item({Name: "beta"})])
	let clones: $.Slice<Item | $.VarRef<Item> | null> = (await CloneAll(__goscriptStatic3(), items) as $.Slice<Item | $.VarRef<Item> | null>)
	await $.println("clone:", $.pointerValue<Item>($.arrayIndex(clones!, 0)).Name, $.pointerValue<Item>($.arrayIndex(clones!, 1)).Name, $.pointerEqual($.arrayIndex(clones!, 0), $.arrayIndex(items!, 0)))

	await $.println("=== Generic struct with map field ===")
	let mapper: Mapper | $.VarRef<Mapper> | null = (NewMapper(__goscriptStatic4()) as Mapper | $.VarRef<Mapper> | null)
	Mapper.prototype.Put.call(mapper, __goscriptStatic4(), "answer", 42)
	let __goscriptTuple2: any = Mapper.prototype.Get.call(mapper, __goscriptStatic4(), "answer")
	let answer = (__goscriptTuple2[0] as number)
	let found = __goscriptTuple2[1]
	await $.println("mapper:", answer, found)

	await $.println("=== Function instantiation ===")
	let applyInt: ((value: number, fn: ((_p0: number) => number | globalThis.Promise<number>) | null) => number | globalThis.Promise<number>) | null = $.functionValue(async (value: any, fn: ((_p0: any) => any | globalThis.Promise<any>) | null): globalThis.Promise<any> => await Apply(__goscriptStatic0(), value, fn), ({ kind: $.TypeKind.Function, params: [{ kind: $.TypeKind.Interface, methods: [] }, ({ kind: $.TypeKind.Function, params: [{ kind: $.TypeKind.Interface, methods: [] }], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo)], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo))
	await $.println("apply:", (__goscriptAwait = applyInt!(21, $.functionValue((n: number): number => {
		return n * 2
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	await $.println("=== Generic pair method ===")
	let pair = $.markAsStructValue(new Pair({First: "left", Second: "right"}))
	let swapped = (pair.Swap(__goscriptStatic2()) as Pair)
	await $.println("pair:", swapped.First, swapped.Second)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int", "main.Score"), zero: () => 0 }})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.pointerType("main.Item"), zero: () => null, methods: {Clone: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Clone(...$.stripGenericTypeArgs(args))} }})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, K: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }, V: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
