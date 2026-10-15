// Generated file based on net_http_header_struct_zero.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as http from "@goscript/net/http/index.js"

export class responseWriter {
	public declare header: http.Header

	constructor(init?: Partial<{header?: http.Header}>, __goscriptValue?: boolean) {
		this.header = init?.header ?? (null! as http.Header)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): responseWriter {
		return new responseWriter(this, true)
	}

	public __goscriptAssign(source: responseWriter): this {
		this.header = source.header
		return this
	}

	public Header(): http.Header {
		const w: responseWriter | $.VarRef<responseWriter> | null = this;
		return $.pointerValue<responseWriter>(w).header
	}

	static __typeInfo = $.registerStructType(
		"main.responseWriter",
		() => new responseWriter(),
		() => [{ name: "Header", args: [], returns: [{ type: "http.Header" }], pointerReceiver: true }],
		responseWriter,
		() => [{ name: "header", key: "header", type: "http.Header" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let writer = new responseWriter({header: $.makeMap<string, $.Slice<string>>([])})
	http.Header_Set((writer !== null && (writer as any).__isVarRef !== true && (writer as any).__goValue === undefined ? ((writer as any) as responseWriter).Header() : responseWriter.prototype.Header.call(writer)), "X-Test", "ok")
	await $.println(await http.Header_Get((writer !== null && (writer as any).__isVarRef !== true && (writer as any).__goValue === undefined ? ((writer as any) as responseWriter).Header() : responseWriter.prototype.Header.call(writer)), "x-test"))
}

if ($.isMainScript(import.meta)) {
	await main()
}
