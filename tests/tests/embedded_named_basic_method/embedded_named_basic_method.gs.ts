// Generated file based on embedded_named_basic_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Level = number

$.registerNamedValueType(
	"main.Level",
	{Rank: (receiver: any, ...args: any[]) => (Level_Rank as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Rank", [["prefix", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Level",
	{Rank: (receiver: any, ...args: any[]) => (Level_Rank as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Rank", [["prefix", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.basicType("string")])]
);

export type Ranker = {
	Rank(prefix: string): string
}

$.registerInterfaceType(
	"main.Ranker",
	null,
	[{ name: "Rank", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class Engineer {
	public get Level(): Level {
		return this._fields.Level
	}

	public set Level(value: Level) {
		this._fields.Level = value
	}

	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		Level: Level
		Name: string
	}

	constructor(init?: Partial<{Level?: Level, Name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Level: init?.Level ?? (0 as Level),
			Name: init?.Name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Engineer {
		return new Engineer(this, true)
	}

	public __goscriptAssign(source: Engineer): void {
		const target = this._fields
		const values = source._fields
		target.Level = values.Level
		target.Name = values.Name
	}

	public Rank(prefix: any): any {
		return Level_Rank(this.Level, prefix)
	}

	static __typeInfo = $.registerStructType(
		"main.Engineer",
		() => new Engineer(),
		() => [{ name: "Rank", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		Engineer,
		() => [{ name: "Level", key: "Level", type: /* @__PURE__ */ $.basicType("int", "main.Level"), anonymous: true }, { name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Lead {
	public get Engineer(): Engineer {
		return this._fields.Engineer
	}

	public set Engineer(value: Engineer) {
		this._fields.Engineer = value
	}

	public _fields: {
		Engineer: Engineer
	}

	constructor(init?: Partial<{Engineer?: Engineer}>, __goscriptValue?: boolean) {
		this._fields = {
			Engineer: init?.Engineer ? init.Engineer.clone() : new Engineer(undefined, true)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Lead {
		return new Lead(this, true)
	}

	public __goscriptAssign(source: Lead): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.Engineer, values.Engineer)
	}

	public Rank(prefix: any): any {
		return Level_Rank($.pointerValue<Engineer>(this.Engineer).Level, prefix)
	}

	static __typeInfo = $.registerStructType(
		"main.Lead",
		() => new Lead(),
		() => [{ name: "Rank", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		Lead,
		() => [{ name: "Engineer", key: "Engineer", type: "main.Engineer", anonymous: true }]
	)
}

export function Level_Rank(l: Level, prefix: string): string {
	if (l > 2) {
		return $.concatString(prefix, "senior")
	}
	return $.concatString(prefix, "junior")
}

export async function main(): globalThis.Promise<void> {
	let eng = new Engineer({Level: 3, Name: "Grace"}, true)
	await $.println("direct:", Level_Rank(eng.Level, "rank: "))

	let r: Ranker | null = $.interfaceValue<Ranker | null>((eng).clone(), "main.Engineer", "main.Engineer")
	await $.println("interface:", (__goscriptAwait = $.pointerValue<Exclude<Ranker, null>>(r).Rank("value: "), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	r = $.interfaceValue<Ranker | null>(new Engineer({Level: 1, Name: "Ada"}), "*main.Engineer", /* @__PURE__ */ $.pointerType("main.Engineer"))
	await $.println("pointer:", (__goscriptAwait = $.pointerValue<Exclude<Ranker, null>>(r).Rank("pointer: "), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let lead: Lead | $.VarRef<Lead> | null = new Lead({Engineer: new Engineer({Level: 4, Name: "Linus"}, true)})
	await $.println("nested direct:", Level_Rank($.pointerValue<Lead>(lead).Engineer.Level, "lead: "))
	r = $.interfaceValue<Ranker | null>(lead, "*main.Lead", /* @__PURE__ */ $.pointerType("main.Lead"))
	await $.println("nested interface:", (__goscriptAwait = $.pointerValue<Exclude<Ranker, null>>(r).Rank("lead: "), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
