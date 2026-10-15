// Generated file based on interface_override_sync_async.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as reflect from "@goscript/reflect/index.js"
import "@goscript/fmt/index.js"

export class slowName {
	public declare ch: $.Channel<string> | null

	constructor(__goscriptValue?: boolean, ch$?: $.Channel<string> | null) {
		this.ch = ch$ ?? (null! as $.Channel<string> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): slowName {
		return new slowName(true, this.ch)
	}

	public __goscriptAssign(source: slowName): this {
		this.ch = source.ch
		return this
	}

	public async String(): globalThis.Promise<string> {
		const s = this;
		return await $.chanRecv(s.ch)
	}

	static __typeInfo = $.registerStructType(
		"main.slowName",
		() => new slowName(),
		() => [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])],
		slowName,
		() => [/* @__PURE__ */ $.structField("ch", /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("string"), "both"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/interface_override_sync_async" })]
	)
}

export async function describeStringer(s: fmt.Stringer | null): globalThis.Promise<string> {
	return "[" + (__goscriptAwait = (s !== null && (s as any).__isVarRef !== true && ((s as any).__goValue === undefined || (s as any).__goType?.charCodeAt(0) !== 42) ? (s as Exclude<fmt.Stringer, null>) : $.pointerValue<Exclude<fmt.Stringer, null>>(s)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) + "]"
}

export function typeName(t: reflect.Type | null): string {
	return ((t !== null && (t as any).__isVarRef !== true && ((t as any).__goValue === undefined || (t as any).__goType?.charCodeAt(0) !== 42) ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Name() as string)
}

export async function main(): globalThis.Promise<void> {
	let ch = $.makeChannel<string>(1, "", "both")
	await $.chanSend(ch, "slow")
	await $.println(await describeStringer($.interfaceValue<fmt.Stringer | null>(new slowName(true, ch), "main.slowName", "main.slowName")))
	await $.println(typeName(reflect.TypeOf($.interfaceValue(new slowName(true), "main.slowName", "main.slowName"))))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
