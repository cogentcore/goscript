// Generated file based on package_import_unique.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as _unique from "@goscript/unique/index.js"
import "@goscript/unique/index.js"

export class zone {
	public declare name: string

	constructor(init?: Partial<{name?: string}>, __goscriptValue?: boolean) {
		this.name = init?.name ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): zone {
		return new zone(this, true)
	}

	public __goscriptAssign(source: zone): this {
		this.name = source.name
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.zone",
		() => new zone(),
		() => [],
		zone,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let a = ($.markAsStructValue($.cloneStructValue(_unique.Make(new zone({name: "eth0"}, true)))) as _unique.Handle<zone>)
	let b = ($.markAsStructValue($.cloneStructValue(_unique.Make(new zone({name: "eth0"}, true)))) as _unique.Handle<zone>)
	let c = ($.markAsStructValue($.cloneStructValue(_unique.Make(new zone({name: "eth1"}, true)))) as _unique.Handle<zone>)

	await $.println($.structEqual(a, b))
	await $.println($.structEqual(a, c))
	await $.println($.markAsStructValue($.cloneStructValue(a)).Value().name)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.zone", zero: () => new zone(undefined, true) }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
