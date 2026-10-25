// Generated file based on generic_func_value_type_args.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as slices from "@goscript/slices/index.js"
import * as lib from "@goscript/github.com/s4wave/goscript/tests/tests/generic_func_value_type_args/lib/index.js"
import "@goscript/slices/index.js"

export class Sim {
	constructor(__goscriptValue?: boolean) {
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Sim {
		return new Sim(true)
	}

	public __goscriptAssign(source: Sim): this {
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Sim",
		() => new Sim(),
		() => [],
		Sim,
		() => []
	)
}

export class Config {
	public declare BaseConfig: lib.BaseConfig

	public declare Rate: number

	constructor(__goscriptValue?: boolean, BaseConfig$?: lib.BaseConfig, Rate$?: number) {
		this.BaseConfig = BaseConfig$ ?? new lib.BaseConfig(true)
		this.Rate = Rate$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Config {
		return new Config(true, this.BaseConfig.clone(), this.Rate)
	}

	public __goscriptAssign(source: Config): this {
		this.BaseConfig.__goscriptAssign(source.BaseConfig)
		this.Rate = source.Rate
		return this
	}

	public Defaults(): void {
		const cfg: Config | $.VarRef<Config> | null = this;
		$.pointerValue<Config>(cfg).BaseConfig.Name = "neuron"
	}

	public AsBaseConfig(): any {
		return lib.BaseConfig.prototype.AsBaseConfig.call($.fieldRef(this, "BaseConfig"))
	}

	static __typeInfo = $.registerStructType(
		"main.Config",
		() => new Config(),
		() => [{ name: "Defaults", args: [], returns: [], pointerReceiver: true }, { name: "AsBaseConfig", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("lib.BaseConfig") }], pointerReceiver: true }],
		Config,
		() => [{ name: "BaseConfig", key: "BaseConfig", type: "lib.BaseConfig", anonymous: true }, { name: "Rate", key: "Rate", type: /* @__PURE__ */ $.basicType("float32") }]
	)
}

export async function embed(__typeArgs: $.GenericTypeArgs | undefined, label: string): globalThis.Promise<void> {
	let [, cfg] = lib.NewConfig({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, C: __typeArgs?.["C"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }})
	let s: $.VarRef<any> = $.varRef($.genericZero(__typeArgs, "S", null))
	await $.println(label, $.pointerValue<lib.BaseConfig>(((__goscriptAwait = (cfg !== null && (cfg as any).__isVarRef !== true && ((cfg as any).__goValue === undefined || (cfg as any).__goType?.charCodeAt(0) !== 42) ? (cfg as Exclude<lib.Config, null>) : $.pointerValue<Exclude<lib.Config, null>>(cfg)).AsBaseConfig(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as lib.BaseConfig | $.VarRef<lib.BaseConfig> | null)).Name, $.typeParamPointerInterfaceValue(s, __typeArgs?.["S"], "*S", /* @__PURE__ */ $.pointerType(__typeArgs?.["S"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })) != null)
}

export function first(__typeArgs: $.GenericTypeArgs | undefined, v: any): any {
	return $.copyElement(v)
}

export async function main(): globalThis.Promise<void> {
	// A generic function instantiated with several type arguments keeps them
	// when it is used as a value, as in a call.
	await embed(__goscriptStatic0(), "call")
	let f: ((label: string) => void) | null = $.functionValue(async (label: string): globalThis.Promise<void> => await embed(__goscriptStatic0(), label), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [] } as $.FunctionTypeInfo))
	void (__goscriptAwait = f!("variable"), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	let sims = $.makeMap<string, ((_p0: string) => void) | null>([["neuron", $.functionValue(async (label: string): globalThis.Promise<void> => await embed(__goscriptStatic0(), label), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [] } as $.FunctionTypeInfo))]])
	void (__goscriptAwait = $.mapGet<string, ((_p0: string) => void) | null, ((_p0: string) => void) | null>(sims, "neuron", null)[0]!("map"), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)

	// So does one with a single type argument.
	let g: ((v: string) => string | globalThis.Promise<string>) | null = $.functionValue((v: any): any => first(__goscriptStatic1(), v), ({ kind: $.TypeKind.Function, params: [{ kind: $.TypeKind.Interface, methods: [] }], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo))
	await $.println("single", (g!("x") as string))

	// A function of the slices override, which takes no type arguments.
	let index: ((s: $.Slice<number>, v: number) => number | globalThis.Promise<number>) | null = slices.Index
	await $.println("slices", (index!($.arrayToSlice<number>([4, 5, 6]), 5) as number))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, S: { type: "main.Sim", zero: () => new Sim(true) }, C: { type: "main.Config", zero: () => new Config(true) }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
