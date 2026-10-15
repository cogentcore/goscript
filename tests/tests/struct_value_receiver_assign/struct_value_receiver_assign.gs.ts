// Generated file based on struct_value_receiver_assign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"

export class tag {
	public declare lang: number

	public declare region: string

	constructor(__goscriptValue?: boolean, lang$?: number, region$?: string) {
		this.lang = lang$ ?? 0
		this.region = region$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): tag {
		return new tag(true, this.lang, this.region)
	}

	public __goscriptAssign(source: tag): this {
		this.lang = source.lang
		this.region = source.region
		return this
	}

	public reset(): tag {
		let t: tag = this;
		t = t.__goscriptAssign(new tag(true, 1, "x"))
		return (t).clone()
	}

	public ["set"](lang: number): void {
		let t: tag | $.VarRef<tag> | null = this;
		$.pointerValue<tag>(t).__goscriptAssign(new tag(true, lang, "p"))
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

	constructor(__goscriptValue?: boolean, t$?: tag, n$?: number) {
		this.t = t$ ?? new tag(true)
		this.n = n$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): outer {
		return new outer(true, this.t.clone(), this.n)
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
	let a = $.varRef(new tag(true, 5, "a"))
	let b = $.markAsStructValue($.cloneStructValue(a.value)).reset()
	fmt.Println($.interfaceValue((a.value).clone(), "main.tag", "main.tag"), $.interfaceValue((b).clone(), "main.tag", "main.tag"))

	a.value.set(9)
	fmt.Println($.interfaceValue((a.value).clone(), "main.tag", "main.tag"))

	// Nested struct fields are assigned in place.
	let o = new outer(true, new tag(true, 2), 1)
	let held = $.fieldRef(o, "t")
	o = o.__goscriptAssign(new outer(true, new tag(true, 3, "o"), 4))
	fmt.Println($.interfaceValue((o).clone(), "main.outer", "main.outer"), $.interfaceValue(($.pointerValue<tag>(held)).clone(), "main.tag", "main.tag"), $.pointerEqual(held, $.fieldRef(o, "t")))
}

if ($.isMainScript(import.meta)) {
	await main()
}
