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
	public declare Level: Level

	public declare Name: string

	constructor(__goscriptValue?: boolean, Level$?: Level, Name$?: string) {
		this.Level = Level$ ?? 0
		this.Name = Name$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Engineer {
		return new Engineer(true, this.Level, this.Name)
	}

	public __goscriptAssign(source: Engineer): this {
		this.Level = source.Level
		this.Name = source.Name
		return this
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
	public declare Engineer: Engineer

	constructor(__goscriptValue?: boolean, Engineer$?: Engineer) {
		this.Engineer = Engineer$ ?? new Engineer(true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Lead {
		return new Lead(true, this.Engineer.clone())
	}

	public __goscriptAssign(source: Lead): this {
		this.Engineer.__goscriptAssign(source.Engineer)
		return this
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
		return prefix + "senior"
	}
	return prefix + "junior"
}

export async function main(): globalThis.Promise<void> {
	let eng = new Engineer(true, 3, "Grace")
	await $.println("direct:", Level_Rank(eng.Level, "rank: "))

	let r: Ranker | null = $.structInterfaceValue<Ranker | null>(eng, "main.Engineer", "main.Engineer")
	await $.println("interface:", (__goscriptAwait = (r !== null && (r as any).__isVarRef !== true && ((r as any).__goValue === undefined || (r as any).__goType?.charCodeAt(0) !== 42) ? (r as Exclude<Ranker, null>) : $.pointerValue<Exclude<Ranker, null>>(r)).Rank("value: "), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	r = $.interfaceValue<Ranker | null>(new Engineer(false, 1, "Ada"), "*main.Engineer", /* @__PURE__ */ $.pointerType("main.Engineer"))
	await $.println("pointer:", (__goscriptAwait = (r !== null && (r as any).__isVarRef !== true && ((r as any).__goValue === undefined || (r as any).__goType?.charCodeAt(0) !== 42) ? (r as Exclude<Ranker, null>) : $.pointerValue<Exclude<Ranker, null>>(r)).Rank("pointer: "), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let lead = new Lead(false, new Engineer(true, 4, "Linus"))
	await $.println("nested direct:", Level_Rank($.pointerValue<Lead>(lead).Engineer.Level, "lead: "))
	r = $.interfaceValue<Ranker | null>(lead, "*main.Lead", /* @__PURE__ */ $.pointerType("main.Lead"))
	await $.println("nested interface:", (__goscriptAwait = (r !== null && (r as any).__isVarRef !== true && ((r as any).__goValue === undefined || (r as any).__goType?.charCodeAt(0) !== 42) ? (r as Exclude<Ranker, null>) : $.pointerValue<Exclude<Ranker, null>>(r)).Rank("lead: "), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
