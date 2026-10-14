// Generated file based on named_return_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class content {
	public get bytes(): $.Slice<number> {
		return this._fields.bytes
	}

	public set bytes(value: $.Slice<number>) {
		this._fields.bytes = value
	}

	public _fields: {
		bytes: $.Slice<number>
	}

	constructor(init?: Partial<{bytes?: $.Slice<number>}>, __goscriptValue?: boolean) {
		this._fields = {
			bytes: init?.bytes ?? (null! as $.Slice<number>)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): content {
		return new content(this, true)
	}

	public __goscriptAssign(source: content): void {
		const target = this._fields
		const values = source._fields
		target.bytes = values.bytes
	}

	public ProcessData(input: number): [number, string, boolean] {
		const c: content | $.VarRef<content> | null = this;
		let result: number = 0
		let status: string = ""
		let valid: boolean = false
		result = input * 2
		if (input > 10) {
			status = "high"
			valid = true
		} else {
			if (input > 0) {
				status = "low"
				valid = true
			} else {
				// status and valid will be zero values
				status = "invalid"
			}
		}
		return [result, status, valid]
	}

	public ReadAt(b: $.Slice<number>, off: bigint): [number, $.GoError] {
		const c: content | $.VarRef<content> | null = this;
		let n: number = 0
		let err: $.GoError = null! as $.GoError
		const c$ = $.pointerTarget<content>(c)
		if ((off < 0n) || (off >= $.int64($.sliceLen((c$ as content).bytes)))) {
			err = null
			return [n, err]
		}

		let l = $.int64($.sliceLen(b))
		if (($.int64Add(off, l)) > $.int64($.sliceLen((c$ as content).bytes))) {
			l = $.int64Sub($.int64($.sliceLen((c$ as content).bytes)), off)
		}

		let btr: $.Slice<number> = $.goSlice((c$ as content).bytes, globalThis.Number(off), globalThis.Number($.int64Add(off, l)))
		n = $.copy(b, btr)
		return [n, err]
	}

	static __typeInfo = $.registerStructType(
		"main.content",
		() => new content(),
		() => [{ name: "ProcessData", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: /* @__PURE__ */ $.basicType("string") }, { type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "ReadAt", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }], pointerReceiver: true }],
		content,
		() => [{ name: "bytes", key: "bytes", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }]
	)
}

export async function main(): globalThis.Promise<void> {
	let c: content | $.VarRef<content> | null = new content({bytes: new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33])})

	// Test ReadAt method
	let buf: $.Slice<number> = $.makeSlice<number>(5, undefined, "byte")
	let [n1, err1] = content.prototype.ReadAt.call(c, buf, 0n)
	await $.println(n1)
	if (err1 == null) {
		await $.println("nil")
	} else {
		await $.println("error")
	}
	await $.println($.bytesToString(buf))

	// Test ReadAt with different offset
	let buf2: $.Slice<number> = $.makeSlice<number>(6, undefined, "byte")
	let [n2, err2] = content.prototype.ReadAt.call(c, buf2, 7n)
	await $.println(n2)
	if (err2 == null) {
		await $.println("nil")
	} else {
		await $.println("error")
	}
	await $.println($.bytesToString(buf2))

	// Test ProcessData method
	let [r1, s1, v1] = content.prototype.ProcessData.call(c, 15)
	await $.println(r1)
	await $.println(s1)
	await $.println(v1)

	let [r2, s2, v2] = content.prototype.ProcessData.call(c, 5)
	await $.println(r2)
	await $.println(s2)
	await $.println(v2)

	let [r3, s3, v3] = content.prototype.ProcessData.call(c, -1)
	await $.println(r3)
	await $.println(s3)
	await $.println(v3)
}

if ($.isMainScript(import.meta)) {
	await main()
}
