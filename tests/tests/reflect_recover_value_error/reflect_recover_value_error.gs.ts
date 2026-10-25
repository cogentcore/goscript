// Generated file based on reflect_recover_value_error.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as reflect from "@goscript/reflect/index.js"

export function field(v: reflect.Value): string {
	let s = ""
	const __defer = new $.DisposableStack()
	try {
		__defer.defer(() => { (() => {
			{
				let r = $.recover()
				if (r != null) {
					let [, isErr] = $.typeAssertTuple<reflect.ValueError | $.VarRef<reflect.ValueError> | null>(r, /* @__PURE__ */ $.pointerType("reflect.ValueError"))
					s = (fmt.Sprint("recovered: ", isErr, " ", r) as string)
				}
			}
		})() })
		const __goscriptReturn0: string = v.Field(0).String()
		s = __goscriptReturn0
		__defer.dispose()
		return s
		__defer.dispose()
	} catch (e) {
		__defer.disposePanic(e)
		if (!$.recovered(e)) {
			throw e
		}
	}
	return s
}

export async function main(): globalThis.Promise<void> {
	class T {
		public declare S: string

		constructor(init?: Partial<{S?: string}>, __goscriptValue?: boolean) {
			this.S = init?.S ?? ("" as string)
			;(this as any).__goStructValue = __goscriptValue === true
		}

		public clone(): T {
			return new T(this, true)
		}

		public __goscriptAssign(source: T): this {
			this.S = source.S
			return this
		}

		static __typeInfo = $.registerStructType(
			"main.T",
			() => new T(),
			() => [],
			T,
			() => [/* @__PURE__ */ $.structField("S", /* @__PURE__ */ $.basicType("string"), [0], 0, true)]
		)
	}
	await $.println(field(reflect.ValueOf($.structInterfaceValue($.markAsStructValue(new T({S: "ok"})), "main.T", "main.T"))))
	await $.println(field($.markAsStructValue(new reflect.Value())))
}

if ($.isMainScript(import.meta)) {
	await main()
}
