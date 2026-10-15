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

	constructor(init?: Partial<{data?: string, pos?: number, done?: boolean}>, __goscriptValue?: boolean) {
		this._fields = {
			data: init?.data ?? ("" as string),
			pos: init?.pos ?? (0 as number),
			done: init?.done ?? (false as boolean)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): scanner {
		return new scanner(this, true)
	}

	public __goscriptAssign(source: scanner): void {
		const target = this._fields
		const values = source._fields
		target.data = values.data
		target.pos = values.pos
		target.done = values.done
	}

	public readByte(): number {
		let s: scanner | $.VarRef<scanner> | null = this;
		const s$: scanner = s == null ? $.pointerTarget<scanner>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<scanner>(s)
		if ((s$ as scanner).pos >= $.stringLen((s$ as scanner).data)) {
			;(s$ as scanner).done = true
			return 0
		}
		let c = $.indexString((s$ as scanner).data, (s$ as scanner).pos);
		;(s$ as scanner).pos++
		return c
	}

	public readScript(): number {
		const s: scanner | $.VarRef<scanner> | null = this;
		const s$: scanner = s == null ? $.pointerTarget<scanner>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<scanner>(s)
		let c: number = 0

		let __goscriptGotoState0 = "scriptData"
		__goscriptGotoLoop0: while (true) {
			switch (__goscriptGotoState0) {
				case "scriptData":
				{
					c = (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as scanner).readByte() : scanner.prototype.readByte.call(s))
					if ((s$ as scanner).done) {
						return (s$ as scanner).pos
					}
					if (c == 60) {
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
					c = (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as scanner).readByte() : scanner.prototype.readByte.call(s))
					if ((s$ as scanner).done) {
						return (s$ as scanner).pos
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
					return (s$ as scanner).pos - 2
					__goscriptGotoState0 = "scriptDataEscapeStart"
					continue __goscriptGotoLoop0
					break
				}
				case "scriptDataEscapeStart":
				{
					for (var i = 0; i < 2; i++) {
						c = (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as scanner).readByte() : scanner.prototype.readByte.call(s))
						if ((s$ as scanner).done) {
							return (s$ as scanner).pos
						}
						if (c != 45) {
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
					c = (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as scanner).readByte() : scanner.prototype.readByte.call(s))
					if ((s$ as scanner).done) {
						return (s$ as scanner).pos
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
					c = (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as scanner).readByte() : scanner.prototype.readByte.call(s))
					if ((s$ as scanner).done) {
						return (s$ as scanner).pos
					}
					if (c == 45) {
						c = (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as scanner).readByte() : scanner.prototype.readByte.call(s))
						if (c == 62) {
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
		() => [{ name: "readByte", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("uint8") }], pointerReceiver: true }, { name: "readScript", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		scanner,
		() => [{ name: "data", key: "data", type: /* @__PURE__ */ $.basicType("string") }, { name: "pos", key: "pos", type: /* @__PURE__ */ $.basicType("int") }, { name: "done", key: "done", type: /* @__PURE__ */ $.basicType("bool") }]
	)
}

export async function main(): globalThis.Promise<void> {
	for (let __goscriptRangeTarget0 = $.arrayToSlice<string>(["a < b</script>", "x<!-- </script> -->y</script>", "<!x</script>", "no end"]), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let src = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
		let s = new scanner({data: src})
		let end = (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as scanner).readScript() : scanner.prototype.readScript.call(s))
		await $.println($.sliceStringOrBytes(src, undefined, end))
	}
	await $.println(encode($.arrayToSlice<number>([97, 0xa5, 0x85, 0x300, 98])))
}

export function encode(rs: $.Slice<number>): string {
	let out = ""
	__goscriptLoop0: for (let __goscriptRangeTarget1 = rs, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let r = $.int((__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as number), 32)
		if (r < 0x80) {
			out += $.runeToString(r)
			continue __goscriptLoop0
		}
		let __goscriptGotoState1 = "__entry"
		__goscriptGotoLoop1: while (true) {
			switch (__goscriptGotoState1) {
				case "__entry":
				{
					if (r < 0x100) {
						__goscriptGotoState1 = "writeGB"
						continue __goscriptGotoLoop1
					}
					__goscriptGotoState1 = "terminate"
					continue __goscriptGotoLoop1
					break
				}
				case "terminate":
				{
					out += "?"
					continue __goscriptLoop0
					__goscriptGotoState1 = "writeGB"
					continue __goscriptGotoLoop1
					break
				}
				case "writeGB":
				{
					var c0 = $.uint((($.uint(r, 8) - 0x80) & 0xff), 8)
					if (c0 < 0x21) {
						__goscriptGotoState1 = "terminate"
						continue __goscriptGotoLoop1
					}
					out += "[" + $.runeToString($.int($.uint(((65 + (c0 % 26)) & 0xff), 8), 32)) + "]"
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
