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

	public _fields: {
		Level: Level
		Name: string
	}

	constructor(init?: Partial<{Level?: Level, Name?: string}>) {
		this._fields = {
			Level: init?.Level ?? (0 as Level),
			Name: init?.Name ?? ("" as string)
		}
	}

	public clone(): Engineer {
		return $.markAsStructValue(new Engineer(this))
	}

	public Rank(prefix: any): any {
		return Level_Rank(this.Level, prefix)
	}

	static {
		$.bindStructFields(this.prototype, ["Level", "Name"])
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

	public _fields: {
		Engineer: Engineer
	}

	constructor(init?: Partial<{Engineer?: Engineer}>) {
		this._fields = {
			Engineer: init?.Engineer ? $.markAsStructValue($.cloneStructValue(init.Engineer)) : $.markAsStructValue(new Engineer())
		}
	}

	public clone(): Lead {
		return $.markAsStructValue(new Lead(this))
	}

	public Rank(prefix: any): any {
		return Level_Rank($.pointerValue<Engineer>(this.Engineer).Level, prefix)
	}

	static {
		$.bindStructFields(this.prototype, ["Engineer"])
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
	let eng = $.markAsStructValue(new Engineer({Level: 3, Name: "Grace"}))
	await $.println("direct:", Level_Rank(eng.Level, "rank: "))

	let r: Ranker | null = $.interfaceValue<Ranker | null>($.markAsStructValue($.cloneStructValue(eng)), "main.Engineer", "main.Engineer")
	await $.println("interface:", await $.pointerValue<Exclude<Ranker, null>>(r).Rank("value: "))

	r = $.interfaceValue<Ranker | null>(new Engineer({Level: 1, Name: "Ada"}), "*main.Engineer", /* @__PURE__ */ $.pointerType("main.Engineer"))
	await $.println("pointer:", await $.pointerValue<Exclude<Ranker, null>>(r).Rank("pointer: "))

	let lead: Lead | $.VarRef<Lead> | null = new Lead({Engineer: $.markAsStructValue(new Engineer({Level: 4, Name: "Linus"}))})
	await $.println("nested direct:", Level_Rank($.pointerValue<Lead>(lead).Engineer.Level, "lead: "))
	r = $.interfaceValue<Ranker | null>(lead, "*main.Lead", /* @__PURE__ */ $.pointerType("main.Lead"))
	await $.println("nested interface:", await $.pointerValue<Exclude<Ranker, null>>(r).Rank("lead: "))
}

if ($.isMainScript(import.meta)) {
	await main()
}
