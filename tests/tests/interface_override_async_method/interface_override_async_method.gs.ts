// Generated file based on interface_override_async_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as io from "@goscript/io/index.js"
import "@goscript/io/index.js"

export class asyncReader {
	public declare ch: $.Channel<number> | null

	constructor(__goscriptValue?: boolean, ch$?: $.Channel<number> | null) {
		this.ch = ch$ ?? (null! as $.Channel<number> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): asyncReader {
		return new asyncReader(true, this.ch)
	}

	public __goscriptAssign(source: asyncReader): this {
		this.ch = source.ch
		return this
	}

	public async Read(b: $.Slice<number>): globalThis.Promise<[number, $.GoError]> {
		const r = this;
		await $.chanSend(r.ch, $.sliceLen(b))
		return [await $.chanRecv(r.ch), null]
	}

	static __typeInfo = $.registerStructType(
		"main.asyncReader",
		() => new asyncReader(),
		() => [{ name: "Read", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }] }],
		asyncReader,
		() => [{ name: "ch", key: "ch", type: /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both") }]
	)
}

export let Reader: io.Reader | null = $.structInterfaceValue<io.Reader | null>(new asyncReader(true, $.makeChannel<number>(1, 0, "both")), "main.asyncReader", "main.asyncReader")

export function __goscript_set_Reader(__goscriptValue: io.Reader | null): void {
	Reader = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	if (Reader == null) {
		await $.println(0)
		return
	}
	await $.println(3)
}

if ($.isMainScript(import.meta)) {
	await main()
}
