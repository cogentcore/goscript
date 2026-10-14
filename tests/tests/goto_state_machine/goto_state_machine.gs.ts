// Generated file based on goto_state_machine.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class scanner {
	public get data(): string {
		return this._fields.data
	}

	public set data(value: string) {
		this._fields.data = value
	}

	public get pos(): number {
		return this._fields.pos
	}

	public set pos(value: number) {
		this._fields.pos = value
	}

	public get done(): boolean {
		return this._fields.done
	}

	public set done(value: boolean) {
		this._fields.done = value
	}

	public _fields: {
		data: string
		pos: number
		done: boolean
	}

	constructor(init?: Partial<{data?: string, pos?: number, done?: boolean}>) {
		this._fields = {
			data: init?.data ?? ("" as string),
			pos: init?.pos ?? (0 as number),
			done: init?.done ?? (false as boolean)
		}
	}

	public clone(): scanner {
		return $.markAsStructValue(new scanner(this))
	}

	public readByte(): number {
		let s: scanner | $.VarRef<scanner> | null = this;
		if ($.pointerValue<scanner>(s).pos >= $.len($.pointerValue<scanner>(s).data)) {
			$.pointerValue<scanner>(s).done = true
			return 0
		}
		let c = $.uint($.indexStringOrBytes($.pointerValue<scanner>(s).data, $.pointerValue<scanner>(s).pos), 8)
		$.pointerValue<scanner>(s).pos++
		return $.uint(c, 8)
	}

	public readScript(): number {
		const s: scanner | $.VarRef<scanner> | null = this;
		let c: number = 0

		let __goscriptGotoState0 = "scriptData"
		__goscriptGotoLoop0: while (true) {
			switch (__goscriptGotoState0) {
				case "scriptData":
				{
					c = $.uint(scanner.prototype.readByte.call(s), 8)
					if ($.pointerValue<scanner>(s).done) {
						return $.pointerValue<scanner>(s).pos
					}
					if ($.uint(c, 8) == 60) {
						__goscriptGotoState0 = "scriptDataLessThanSign"
						continue __goscriptGotoLoop0
					}
					__goscriptGotoState0 = "scriptData"
					continue __goscriptGotoLoop0
					__goscriptGotoState0 = "scriptDataLessThanSign"
					continue __goscriptGotoLoop0
					break
				}
				case "scriptDataLessThanSign":
				{
					c = $.uint(scanner.prototype.readByte.call(s), 8)
					if ($.pointerValue<scanner>(s).done) {
						return $.pointerValue<scanner>(s).pos
					}
					switch (c) {
						case 47:
						{
							__goscriptGotoState0 = "scriptDataEndTagOpen"
							continue __goscriptGotoLoop0
							break
						}
						case 33:
						{
							__goscriptGotoState0 = "scriptDataEscapeStart"
							continue __goscriptGotoLoop0
							break
						}
					}
					__goscriptGotoState0 = "scriptData"
					continue __goscriptGotoLoop0
					__goscriptGotoState0 = "scriptDataEndTagOpen"
					continue __goscriptGotoLoop0
					break
				}
				case "scriptDataEndTagOpen":
				{
					return $.pointerValue<scanner>(s).pos - 2
					__goscriptGotoState0 = "scriptDataEscapeStart"
					continue __goscriptGotoLoop0
					break
				}
				case "scriptDataEscapeStart":
				{
					for (var i = 0; i < 2; i++) {
						c = $.uint(scanner.prototype.readByte.call(s), 8)
						if ($.pointerValue<scanner>(s).done) {
							return $.pointerValue<scanner>(s).pos
						}
						if ($.uint(c, 8) != 45) {
							__goscriptGotoState0 = "scriptData"
							continue __goscriptGotoLoop0
						}
					}
					__goscriptGotoState0 = "scriptDataEscaped"
					continue __goscriptGotoLoop0
					__goscriptGotoState0 = "scriptDataEscaped"
					continue __goscriptGotoLoop0
					break
				}
				case "scriptDataEscaped":
				{
					c = $.uint(scanner.prototype.readByte.call(s), 8)
					if ($.pointerValue<scanner>(s).done) {
						return $.pointerValue<scanner>(s).pos
					}
					switch (c) {
						case 45:
						{
							__goscriptGotoState0 = "scriptDataEscapedDash"
							continue __goscriptGotoLoop0
							break
						}
					}
					__goscriptGotoState0 = "scriptDataEscaped"
					continue __goscriptGotoLoop0
					__goscriptGotoState0 = "scriptDataEscapedDash"
					continue __goscriptGotoLoop0
					break
				}
				case "scriptDataEscapedDash":
				{
					c = $.uint(scanner.prototype.readByte.call(s), 8)
					if ($.pointerValue<scanner>(s).done) {
						return $.pointerValue<scanner>(s).pos
					}
					if ($.uint(c, 8) == 45) {
						c = $.uint(scanner.prototype.readByte.call(s), 8)
						if ($.uint(c, 8) == 62) {
							__goscriptGotoState0 = "scriptData"
							continue __goscriptGotoLoop0
						}
					}
					__goscriptGotoState0 = "scriptDataEscaped"
					continue __goscriptGotoLoop0
					break __goscriptGotoLoop0
					break
				}
			}
			break
		}
		throw new globalThis.Error("goscript: unreachable return")
	}

	static __typeInfo = $.registerStructType(
		"main.scanner",
		() => new scanner(),
		() => [{ name: "readByte", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("uint8") }] }, { name: "readScript", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		scanner,
		() => [{ name: "data", key: "data", type: /* @__PURE__ */ $.basicType("string") }, { name: "pos", key: "pos", type: /* @__PURE__ */ $.basicType("int") }, { name: "done", key: "done", type: /* @__PURE__ */ $.basicType("bool") }]
	)
}

export async function main(): globalThis.Promise<void> {
	for (let __goscriptRangeTarget0 = $.arrayToSlice<string>(["a < b</script>", "x<!-- </script> -->y</script>", "<!x</script>", "no end"]), __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
		let src = __goscriptRangeTarget0![__rangeIndex]
		let s: scanner | $.VarRef<scanner> | null = new scanner({data: src})
		let end = scanner.prototype.readScript.call(s)
		await $.println($.sliceStringOrBytes(src, undefined, end))
	}
	await $.println(encode($.arrayToSlice<number>([97, 0xa5, 0x85, 0x300, 98])))
}

export function encode(rs: $.Slice<number>): string {
	let out = ""
	__goscriptLoop0: for (let __goscriptRangeTarget1 = rs, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget1); __rangeIndex++) {
		let r = $.int(__goscriptRangeTarget1![__rangeIndex], 32)
		if ($.int(r, 32) < 0x80) {
			out = $.concatString(out, $.runeToString(r))
			continue __goscriptLoop0
		}
		let __goscriptGotoState1 = "__entry"
		__goscriptGotoLoop1: while (true) {
			switch (__goscriptGotoState1) {
				case "__entry":
				{
					if ($.int(r, 32) < 0x100) {
						__goscriptGotoState1 = "writeGB"
						continue __goscriptGotoLoop1
					}
					__goscriptGotoState1 = "terminate"
					continue __goscriptGotoLoop1
					break
				}
				case "terminate":
				{
					out = $.concatString(out, "?")
					continue __goscriptLoop0
					__goscriptGotoState1 = "writeGB"
					continue __goscriptGotoLoop1
					break
				}
				case "writeGB":
				{
					var c0 = $.uint((($.uint(r, 8) - 0x80) & 0xff), 8)
					if ($.uint(c0, 8) < 0x21) {
						__goscriptGotoState1 = "terminate"
						continue __goscriptGotoLoop1
					}
					out = $.concatString(out, $.concatString(($.concatString("[", $.runeToString($.int($.uint(((65 + (c0 % 26)) & 0xff), 8), 32)))), "]"))
					break __goscriptGotoLoop1
					break
				}
			}
			break
		}
	}
	return out
}

if ($.isMainScript(import.meta)) {
	await main()
}
