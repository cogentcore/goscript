// Generated file based on lib.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/generic_func_value_type_args/lib", ["lib.Config", "lib.BaseConfig"])

export type Config = {
	AsBaseConfig(): BaseConfig | $.VarRef<BaseConfig> | null
	Defaults(): void
}

$.registerInterfaceType(
	"lib.Config",
	null,
	[{ name: "AsBaseConfig", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("lib.BaseConfig") }] }, { name: "Defaults", args: [], returns: [] }]
);

export class BaseConfig {
	public declare Name: string

	constructor(__goscriptValue?: boolean, Name$?: string) {
		this.Name = Name$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): BaseConfig {
		return new BaseConfig(true, this.Name)
	}

	public __goscriptAssign(source: BaseConfig): this {
		this.Name = source.Name
		return this
	}

	public AsBaseConfig(): BaseConfig | $.VarRef<BaseConfig> | null {
		const bc: BaseConfig | $.VarRef<BaseConfig> | null = this;
		return bc
	}

	static __typeInfo = $.registerStructType(
		"lib.BaseConfig",
		() => new BaseConfig(),
		() => [{ name: "AsBaseConfig", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("lib.BaseConfig") }], pointerReceiver: true }],
		BaseConfig,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export function NewConfig(__typeArgs: $.GenericTypeArgs | undefined): [any, Config | null] {
	let cfgC = $.genericNew(__typeArgs, "C", null)
	let cfg = $.mustTypeAssert<Config | null>($.typeParamPointerInterfaceValue(cfgC, __typeArgs?.["C"], "*C", /* @__PURE__ */ $.pointerType(__typeArgs?.["C"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })), "lib.Config")
	void (cfg !== null && (cfg as any).__isVarRef !== true && ((cfg as any).__goValue === undefined || (cfg as any).__goType?.charCodeAt(0) !== 42) ? (cfg as Exclude<Config, null>) : $.pointerValue<Exclude<Config, null>>(cfg)).Defaults()
	return [cfgC, cfg]
}
