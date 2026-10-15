// Generated file based on struct_equal_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as math from "@goscript/math/index.js"
import "@goscript/math/index.js"

export class pos {
	public get Line(): number {
		return this._fields.Line
	}

	public set Line(value: number) {
		this._fields.Line = value
	}

	public get Char(): number {
		return this._fields.Char
	}

	public set Char(value: number) {
		this._fields.Char = value
	}

	public _fields: {
		Line: number
		Char: number
	}

	constructor(init?: Partial<{Line?: number, Char?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Line: init?.Line ?? (0 as number),
			Char: init?.Char ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): pos {
		return new pos(this, true)
	}

	public __goscriptAssign(source: pos): void {
		const target = this._fields
		const values = source._fields
		target.Line = values.Line
		target.Char = values.Char
	}

	static __typeInfo = $.registerStructType(
		"main.pos",
		() => new pos(),
		() => [],
		pos,
		() => [{ name: "Line", key: "Line", type: /* @__PURE__ */ $.basicType("int") }, { name: "Char", key: "Char", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class stamp {
	public get Sec(): bigint {
		return this._fields.Sec
	}

	public set Sec(value: bigint) {
		this._fields.Sec = value
	}

	public get NSec(): number {
		return this._fields.NSec
	}

	public set NSec(value: number) {
		this._fields.NSec = value
	}

	public _fields: {
		Sec: bigint
		NSec: number
	}

	constructor(init?: Partial<{Sec?: bigint, NSec?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Sec: init?.Sec ?? (0n as bigint),
			NSec: init?.NSec ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): stamp {
		return new stamp(this, true)
	}

	public __goscriptAssign(source: stamp): void {
		const target = this._fields
		const values = source._fields
		target.Sec = values.Sec
		target.NSec = values.NSec
	}

	static __typeInfo = $.registerStructType(
		"main.stamp",
		() => new stamp(),
		() => [],
		stamp,
		() => [{ name: "Sec", key: "Sec", type: /* @__PURE__ */ $.basicType("int64") }, { name: "NSec", key: "NSec", type: /* @__PURE__ */ $.basicType("uint32") }]
	)
}

export class region {
	public get Start(): pos {
		return this._fields.Start
	}

	public set Start(value: pos) {
		this._fields.Start = value
	}

	public get End(): pos {
		return this._fields.End
	}

	public set End(value: pos) {
		this._fields.End = value
	}

	public get Time(): stamp {
		return this._fields.Time
	}

	public set Time(value: stamp) {
		this._fields.Time = value
	}

	public _fields: {
		Start: pos
		End: pos
		Time: stamp
	}

	constructor(init?: Partial<{Start?: pos, End?: pos, Time?: stamp}>, __goscriptValue?: boolean) {
		this._fields = {
			Start: init?.Start ? init.Start.clone() : new pos(undefined, true),
			End: init?.End ? init.End.clone() : new pos(undefined, true),
			Time: init?.Time ? init.Time.clone() : new stamp(undefined, true)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): region {
		return new region(this, true)
	}

	public __goscriptAssign(source: region): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.Start, values.Start)
		$.assignStruct(target.End, values.End)
		$.assignStruct(target.Time, values.Time)
	}

	static __typeInfo = $.registerStructType(
		"main.region",
		() => new region(),
		() => [],
		region,
		() => [{ name: "Start", key: "Start", type: "main.pos" }, { name: "End", key: "End", type: "main.pos" }, { name: "Time", key: "Time", type: "main.stamp" }]
	)
}

export class node {
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

	public clone(): node {
		return new node(this, true)
	}

	public __goscriptAssign(source: node): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
	}

	static __typeInfo = $.registerStructType(
		"main.node",
		() => new node(),
		() => [],
		node,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class mixed {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get F(): number {
		return this._fields.F
	}

	public set F(value: number) {
		this._fields.F = value
	}

	public get OK(): boolean {
		return this._fields.OK
	}

	public set OK(value: boolean) {
		this._fields.OK = value
	}

	public get Ptr(): node | $.VarRef<node> | null {
		return this._fields.Ptr
	}

	public set Ptr(value: node | $.VarRef<node> | null) {
		this._fields.Ptr = value
	}

	public get Any(): any {
		return this._fields.Any
	}

	public set Any(value: any) {
		this._fields.Any = value
	}

	public get _blank5(): number {
		return this._fields._blank5
	}

	public set _blank5(value: number) {
		this._fields._blank5 = value
	}

	public get Inner(): pos {
		return this._fields.Inner
	}

	public set Inner(value: pos) {
		this._fields.Inner = value
	}

	public _fields: {
		Name: string
		F: number
		OK: boolean
		Ptr: node | $.VarRef<node> | null
		Any: any
		_blank5: number
		Inner: pos
	}

	constructor(init?: Partial<{Name?: string, F?: number, OK?: boolean, Ptr?: node | $.VarRef<node> | null, Any?: any, _blank5?: number, Inner?: pos}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			F: init?.F ?? (0 as number),
			OK: init?.OK ?? (false as boolean),
			Ptr: init?.Ptr ?? (null! as node | $.VarRef<node> | null),
			Any: init?.Any ?? (null! as any),
			_blank5: init?._blank5 ?? (0 as number),
			Inner: init?.Inner ? init.Inner.clone() : new pos(undefined, true)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): mixed {
		return new mixed(this, true)
	}

	public __goscriptAssign(source: mixed): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.F = values.F
		target.OK = values.OK
		target.Ptr = values.Ptr
		target.Any = $.assignFieldValue(target.Any, values.Any, { kind: $.TypeKind.Interface, methods: [] })
		target._blank5 = values._blank5
		$.assignStruct(target.Inner, values.Inner)
	}

	static __typeInfo = $.registerStructType(
		"main.mixed",
		() => new mixed(),
		() => [],
		mixed,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "F", key: "F", type: /* @__PURE__ */ $.basicType("float64") }, { name: "OK", key: "OK", type: /* @__PURE__ */ $.basicType("bool") }, { name: "Ptr", key: "Ptr", type: /* @__PURE__ */ $.pointerType("main.node") }, { name: "Any", key: "Any", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "_", key: "_blank5", type: /* @__PURE__ */ $.basicType("int") }, { name: "Inner", key: "Inner", type: "main.pos" }]
	)
}

export class withArray {
	public get Vals(): number[] {
		return this._fields.Vals
	}

	public set Vals(value: number[]) {
		this._fields.Vals = value
	}

	public _fields: {
		Vals: number[]
	}

	constructor(init?: Partial<{Vals?: number[]}>, __goscriptValue?: boolean) {
		this._fields = {
			Vals: init?.Vals !== undefined ? $.cloneArrayValue(init.Vals, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2)) : $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0))
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): withArray {
		return new withArray(this, true)
	}

	public __goscriptAssign(source: withArray): void {
		const target = this._fields
		const values = source._fields
		target.Vals = $.assignFieldValue(target.Vals, values.Vals, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2))
	}

	static __typeInfo = $.registerStructType(
		"main.withArray",
		() => new withArray(),
		() => [],
		withArray,
		() => [{ name: "Vals", key: "Vals", type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2) }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Plain and nested fields.
	let a = new region({Start: new pos({Line: 1, Char: 2}, true), End: new pos({Line: 3, Char: 4}, true), Time: new stamp({Sec: 5n, NSec: 6}, true)}, true)
	let b = (a).clone()
	await $.println("equal:", (a.Start.Line === b.Start.Line && a.Start.Char === b.Start.Char && a.End.Line === b.End.Line && a.End.Char === b.End.Char && a.Time.Sec === b.Time.Sec && a.Time.NSec === b.Time.NSec), !(a.Start.Line === b.Start.Line && a.Start.Char === b.Start.Char && a.End.Line === b.End.Line && a.End.Char === b.End.Char && a.Time.Sec === b.Time.Sec && a.Time.NSec === b.Time.NSec), (a.Start.Line === b.Start.Line && a.Start.Char === b.Start.Char))
	b.End.Char++
	await $.println("end differs:", (a.Start.Line === b.Start.Line && a.Start.Char === b.Start.Char && a.End.Line === b.End.Line && a.End.Char === b.End.Char && a.Time.Sec === b.Time.Sec && a.Time.NSec === b.Time.NSec), !(a.Start.Line === b.Start.Line && a.Start.Char === b.Start.Char && a.End.Line === b.End.Line && a.End.Char === b.End.Char && a.Time.Sec === b.Time.Sec && a.Time.NSec === b.Time.NSec), (a.End.Line === b.End.Line && a.End.Char === b.End.Char))
	b = $.assignStruct(b, a)
	b.Time.Sec = 1099511627776n
	await $.println("time differs:", (a.Start.Line === b.Start.Line && a.Start.Char === b.Start.Char && a.End.Line === b.End.Line && a.End.Char === b.End.Char && a.Time.Sec === b.Time.Sec && a.Time.NSec === b.Time.NSec))

	// Pointers compare by identity, interfaces by their dynamic values.
	let n1 = new node({Name: "x"})
	let n2 = new node({Name: "x"})
	let m1 = new mixed({Name: "m", F: 1.5, OK: true, Ptr: n1, Any: $.interfaceValue(new pos({Line: 1, Char: 1}, true), "main.pos", "main.pos"), Inner: new pos({Line: 7, Char: 8}, true)}, true)
	let m2 = (m1).clone()
	await $.println("mixed:", (m1.Name === m2.Name && m1.F === m2.F && m1.OK === m2.OK && $.pointerEqual(m1.Ptr, m2.Ptr) && $.comparableEqual(m1.Any, m2.Any) && m1.Inner.Line === m2.Inner.Line && m1.Inner.Char === m2.Inner.Char))
	m2.Ptr = n2
	await $.println("other pointer:", (m1.Name === m2.Name && m1.F === m2.F && m1.OK === m2.OK && $.pointerEqual(m1.Ptr, m2.Ptr) && $.comparableEqual(m1.Any, m2.Any) && m1.Inner.Line === m2.Inner.Line && m1.Inner.Char === m2.Inner.Char))
	m2 = $.assignStruct(m2, m1)
	m2.Any = $.interfaceValue(new pos({Line: 1, Char: 2}, true), "main.pos", "main.pos")
	await $.println("other interface value:", (m1.Name === m2.Name && m1.F === m2.F && m1.OK === m2.OK && $.pointerEqual(m1.Ptr, m2.Ptr) && $.comparableEqual(m1.Any, m2.Any) && m1.Inner.Line === m2.Inner.Line && m1.Inner.Char === m2.Inner.Char))
	m2.Any = "text"
	await $.println("other interface type:", (m1.Name === m2.Name && m1.F === m2.F && m1.OK === m2.OK && $.pointerEqual(m1.Ptr, m2.Ptr) && $.comparableEqual(m1.Any, m2.Any) && m1.Inner.Line === m2.Inner.Line && m1.Inner.Char === m2.Inner.Char))
	m2 = $.assignStruct(m2, m1)
	m2.F = math.NaN()
	let m3 = (m2).clone()
	await $.println("NaN:", (m2.Name === m3.Name && m2.F === m3.F && m2.OK === m3.OK && $.pointerEqual(m2.Ptr, m3.Ptr) && $.comparableEqual(m2.Any, m3.Any) && m2.Inner.Line === m3.Inner.Line && m2.Inner.Char === m3.Inner.Char), !(m2.Name === m3.Name && m2.F === m3.F && m2.OK === m3.OK && $.pointerEqual(m2.Ptr, m3.Ptr) && $.comparableEqual(m2.Any, m3.Any) && m2.Inner.Line === m3.Inner.Line && m2.Inner.Char === m3.Inner.Char))
	let __goscriptAssign0_0: number = math.Copysign(0, -1)
	let __goscriptAssign0_1: number = 0
	m2.F = __goscriptAssign0_0
	m3.F = __goscriptAssign0_1
	await $.println("zeros:", (m2.Name === m3.Name && m2.F === m3.F && m2.OK === m3.OK && $.pointerEqual(m2.Ptr, m3.Ptr) && $.comparableEqual(m2.Any, m3.Any) && m2.Inner.Line === m3.Inner.Line && m2.Inner.Char === m3.Inner.Char))

	// Comparisons of values in slices and maps.
	let regions = $.arrayToSlice<region>([(a).clone(), (b).clone()])
	await $.println("slice:", $.structEqual($.arrayIndex(regions!, 0), a), $.structEqual($.arrayIndex(regions!, 1), a))
	let seen = $.makeMap<pos, boolean>([[new pos({Line: 1, Char: 2}, true), true]])
	await $.println("map:", $.mapGet<pos, boolean, boolean>(seen, a.Start, false)[0], $.mapGet<pos, boolean, boolean>(seen, a.End, false)[0])

	// Arrays in structs.
	let w1 = new withArray({Vals: $.arrayValue([1, 2])}, true)
	let w2 = new withArray({Vals: $.arrayValue([1, 2])}, true)
	await $.println("array:", $.structEqual(w1, w2))
	w2.Vals[1] = 3
	await $.println("array differs:", $.structEqual(w1, w2))
}

if ($.isMainScript(import.meta)) {
	await main()
}
