// Generated file based on array_byte_element_pointer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class bitset {
	public get bits(): Uint8Array {
		return this._fields.bits
	}

	public set bits(value: Uint8Array) {
		this._fields.bits = value
	}

	public _fields: {
		bits: Uint8Array
	}

	constructor(init?: Partial<{bits?: Uint8Array}>) {
		this._fields = {
			bits: init?.bits !== undefined ? $.cloneArrayValue(init.bits, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4)) : $.arrayValue(new Uint8Array(4))
		}
	}

	public clone(): bitset {
		return $.markAsStructValue(new bitset(this))
	}

	public __goscriptAssign(source: bitset): void {
		const target = this._fields
		const values = source._fields
		target.bits = $.assignFieldValue(target.bits, values.bits, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4))
	}

	public has(bit: number): boolean {
		const b: bitset | $.VarRef<bitset> | null = this;
		let entry = $.indexRef($.pointerValue<bitset>(b).bits, globalThis.Math.trunc(bit / 8))
		let mask = $.uint((($.uint(1, 8) << (bit % 8)) & 0xff), 8)
		return $.uint(($.pointerValue<number>(entry) & mask), 8) != 0
	}

	public ["set"](bit: number): void {
		const b: bitset | $.VarRef<bitset> | null = this;
		let entry = $.indexRef($.pointerValue<bitset>(b).bits, globalThis.Math.trunc(bit / 8))
		let mask = $.uint((($.uint(1, 8) << (bit % 8)) & 0xff), 8)
		entry!.value = entry!.value | ($.uint(mask, 8))
	}

	static __typeInfo = $.registerStructType(
		"main.bitset",
		() => new bitset(),
		() => [{ name: "has", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		bitset,
		() => [{ name: "bits", key: "bits", type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4) }]
	)
}

export async function main(): globalThis.Promise<void> {
	let b: $.VarRef<bitset> = $.varRef($.markAsStructValue(new bitset()))
	b.value.set(3)
	b.value.set(30)
	await $.println(b.value.has(3), b.value.has(4), b.value.has(30), $.uint($.arrayIndex(b.value.bits, 0), 8), $.uint($.arrayIndex(b.value.bits, 3), 8))
}

if ($.isMainScript(import.meta)) {
	await main()
}
