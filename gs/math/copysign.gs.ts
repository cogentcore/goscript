import * as $ from "@goscript/builtin/index.js";

// copysignView is the view of the bytes of the floats of Copysign.
const copysignView = new DataView(new ArrayBuffer(8))

// Copysign returns a value with the magnitude of f and the sign of sign. It
// copies the IEEE-754 sign bit byte-for-byte so that a negative NaN sign is
// honored, matching Go's bit-level implementation; Math.sign cannot report the
// sign of NaN.
export function Copysign(f: number, sign: number): number {
	// The sign byte of sign replaces that of f, in a view kept for all calls.
	const dv = copysignView
	dv.setFloat64(0, sign)
	const signByte = dv.getUint8(0) & 0x80
	dv.setFloat64(0, f)
	dv.setUint8(0, (dv.getUint8(0) & 0x7f) | signByte)
	return dv.getFloat64(0)
}

