// Generated file based on struct_value_receiver_assign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as fmt from "@goscript/fmt/index.js"
import "@goscript/fmt/index.js"

export class tag {
	public declare lang: number

	public declare region: string

	constructor(init?: Partial<{lang?: number, region?: string}>, __goscriptValue?: boolean) {
		this.lang = init?.lang ?? (0 as number)
		this.region = init?.region ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): tag {
		return new tag(this, true)
	}

	public __goscriptAssign(source: tag): this {
		this.lang = source.lang
		this.region = source.region
		return this
	}

	public reset(): tag {
		let t: tag = this;
		t = t.__goscriptAssign(new tag({lang: 1, region: "x"}, true))
		return (t).clone()
	}

	public ["set"](lang: number): void {
		let t: tag | $.VarRef<tag> | null = this;
		$.pointerValue<tag>(t).__goscriptAssign(new tag({lang: lang, region: "p"}, true))
	}

	static __typeInfo = $.registerStructType(
		"main.tag",
		() => new tag(),
		() => [{ name: "reset", args: [], returns: [{ type: "main.tag" }] }, { name: "set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		tag,
		() => [{ name: "lang", key: "lang", type: /* @__PURE__ */ $.basicType("int") }, { name: "region", key: "region", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class outer {
	public declare t: tag

	public declare n: number

	constructor(init?: Partial<{t?: tag, n?: number}>, __goscriptValue?: boolean) {
		this.t = init?.t ? init.t.clone() : new tag(undefined, true)
		this.n = init?.n ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): outer {
		return new outer(this, true)
	}

	public __goscriptAssign(source: outer): this {
		this.t.__goscriptAssign(source.t)
		this.n = source.n
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.outer",
		() => new outer(),
		() => [],
		outer,
		() => [{ name: "t", key: "t", type: "main.tag" }, { name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let a = $.varRef(new tag({lang: 5, region: "a"}, true))
	let b = $.markAsStructValue($.cloneStructValue(a.value)).reset()
	await fmt.Println($.interfaceValue((a.value).clone(), "main.tag", "main.tag"), $.interfaceValue((b).clone(), "main.tag", "main.tag"))

	a.value.set(9)
	await fmt.Println($.interfaceValue((a.value).clone(), "main.tag", "main.tag"))

	// Nested struct fields are assigned in place.
	let o = new outer({t: new tag({lang: 2}, true), n: 1}, true)
	let held = $.fieldRef(o, "t")
	o = o.__goscriptAssign(new outer({t: new tag({lang: 3, region: "o"}, true), n: 4}, true))
	await fmt.Println($.interfaceValue((o).clone(), "main.outer", "main.outer"), $.interfaceValue(($.pointerValue<tag>(held)).clone(), "main.tag", "main.tag"), $.pointerEqual(held, $.fieldRef(o, "t")))
}

if ($.isMainScript(import.meta)) {
	await main()
}
