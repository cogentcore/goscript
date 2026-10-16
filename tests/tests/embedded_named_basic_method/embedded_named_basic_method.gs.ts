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

export type Tags = $.Slice<string>

$.registerNamedType("main.Tags", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")));

$.registerNamedValueType(
	"*main.Tags",
	{Add: (receiver: any, ...args: any[]) => (Tags_Add as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["tag", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.basicType("int")])]
);

export type Adder = {
	Add(tag: string): number
}

$.registerInterfaceType(
	"main.Adder",
	null,
	[{ name: "Add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
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

export class Post {
	public declare Tags: Tags

	constructor(__goscriptValue?: boolean, Tags$?: Tags) {
		this.Tags = Tags$ ?? (null! as Tags)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Post {
		return new Post(true, this.Tags)
	}

	public __goscriptAssign(source: Post): this {
		this.Tags = source.Tags
		return this
	}

	public Add(tag: any): any {
		return Tags_Add($.fieldRef(this, "Tags"), tag)
	}

	static __typeInfo = $.registerStructType(
		"main.Post",
		() => new Post(),
		() => [{ name: "Add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		Post,
		() => [{ name: "Tags", key: "Tags", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"), "main.Tags"), anonymous: true }]
	)
}

export function Level_Rank(l: Level, prefix: string): string {
	if (l > 2) {
		return prefix + "senior"
	}
	return prefix + "junior"
}

export function Tags_Add(t: $.VarRef<Tags> | null, tag: string): number {
	t!.value = ($.appendOne(($.pointerValue<Tags>(t) as Tags), tag) as Tags)
	return $.sliceLen(($.pointerValue<Tags>(t) as Tags))
}

export async function main(): globalThis.Promise<void> {
	let eng = new Engineer(true, 3, "Grace")
	await $.println("direct:", Level_Rank(eng.Level, "rank: "))

	let r: Ranker | null = $.interfaceValue<Ranker | null>(eng, "main.Engineer", "main.Engineer")
	await $.println("interface:", (__goscriptAwait = (r !== null && (r as any).__isVarRef !== true && ((r as any).__goValue === undefined || (r as any).__goType?.charCodeAt(0) !== 42) ? (r as Exclude<Ranker, null>) : $.pointerValue<Exclude<Ranker, null>>(r)).Rank("value: "), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	r = $.interfaceValue<Ranker | null>(new Engineer(false, 1, "Ada"), "*main.Engineer", /* @__PURE__ */ $.pointerType("main.Engineer"))
	await $.println("pointer:", (__goscriptAwait = (r !== null && (r as any).__isVarRef !== true && ((r as any).__goValue === undefined || (r as any).__goType?.charCodeAt(0) !== 42) ? (r as Exclude<Ranker, null>) : $.pointerValue<Exclude<Ranker, null>>(r)).Rank("pointer: "), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let lead = new Lead(false, new Engineer(true, 4, "Linus"))
	await $.println("nested direct:", Level_Rank($.pointerValue<Lead>(lead).Engineer.Level, "lead: "))
	r = $.interfaceValue<Ranker | null>(lead, "*main.Lead", /* @__PURE__ */ $.pointerType("main.Lead"))
	await $.println("nested interface:", (__goscriptAwait = (r !== null && (r as any).__isVarRef !== true && ((r as any).__goValue === undefined || (r as any).__goType?.charCodeAt(0) !== 42) ? (r as Exclude<Ranker, null>) : $.pointerValue<Exclude<Ranker, null>>(r)).Rank("lead: "), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let post = new Post()
	let post$: Post = post == null ? $.pointerTarget<Post>(post) : (post as any).__isVarRef === true ? (post as any).value : (post as any).__goValue === undefined ? (post as any) : $.pointerTarget<Post>(post)
	Tags_Add($.fieldRef((post$ as Post), "Tags"), "go")
	let a: Adder | null = $.interfaceValue<Adder | null>(post, "*main.Post", /* @__PURE__ */ $.pointerType("main.Post"))
	await $.println("pointer method:", (__goscriptAwait = (a !== null && (a as any).__isVarRef !== true && ((a as any).__goValue === undefined || (a as any).__goType?.charCodeAt(0) !== 42) ? (a as Exclude<Adder, null>) : $.pointerValue<Exclude<Adder, null>>(a)).Add("js"), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.sliceLen(((post$ as Post).Tags as Tags)), $.arrayIndex((post$ as Post).Tags!, 1))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
