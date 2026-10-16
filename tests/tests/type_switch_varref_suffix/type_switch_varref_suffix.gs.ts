// Generated file based on type_switch_varref_suffix.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type node = {
	value(): number
}

$.registerInterfaceType(
	"main.node",
	null,
	[{ name: "value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export class branch {
	public declare n: number

	constructor(__goscriptValue?: boolean, n$?: number) {
		this.n = n$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): branch {
		return new branch(true, this.n)
	}

	public __goscriptAssign(source: branch): this {
		this.n = source.n
		return this
	}

	public value(): number {
		const b: branch | $.VarRef<branch> | null = this;
		return $.pointerValue<branch>(b).n
	}

	static __typeInfo = $.registerStructType(
		"main.branch",
		() => new branch(),
		() => [{ name: "value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		branch,
		() => [{ name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function accept(b: branch | $.VarRef<branch> | null): number {
	return $.pointerValue<branch>(b).n
}

export async function main(): globalThis.Promise<void> {
	let v: node | null = $.interfaceValue<node | null>(new branch(false, 3), "*main.branch", /* @__PURE__ */ $.pointerType("main.branch"))
	{
		const __goscriptTypeSwitchValue = v
		switch ($.typeSwitchCase(__goscriptTypeSwitchValue, __goscriptStatic0())) {
			case 0:
				{
					let e: branch | $.VarRef<branch> | null = $.typeAssert<branch | $.VarRef<branch> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("main.branch")).value
					let imprecise = $.varRef(0)
					let ptr = imprecise
					ptr!.value = 4
					await $.println("branch", accept(e), imprecise.value)
				}
				break
			default:
				{
					let e: any = __goscriptTypeSwitchValue
					await $.println("other")
				}
				break
		}
	}
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.typeSwitchSite([/* @__PURE__ */ $.pointerType("main.branch")]))
}

if ($.isMainScript(import.meta)) {
	await main()
}
