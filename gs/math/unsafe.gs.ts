import * as $ from "@goscript/builtin/index.js";

// The conversions share one 8-byte buffer, viewed as each type, instead of
// allocating a buffer and a view for every call. Both views of a value use
// the byte order of the platform, so it does not matter which one it is.
const bitsBuffer = new ArrayBuffer(8);
const float32View = new Float32Array(bitsBuffer, 0, 1);
const uint32View = new Uint32Array(bitsBuffer, 0, 1);
const float64View = new Float64Array(bitsBuffer);
const uint64View = new BigUint64Array(bitsBuffer);

// Float32bits returns the IEEE 754 binary representation of f,
// with the sign bit of f and the result in the same bit position.
// Float32bits(Float32frombits(x)) == x.
export function Float32bits(f: number): number {
	// The float is stored and its bits read back.
	float32View[0] = f;
	return uint32View[0];
}

// Float32frombits returns the floating-point number corresponding
// to the IEEE 754 binary representation b, with the sign bit of b
// and the result in the same bit position.
// Float32frombits(Float32bits(x)) == x.
export function Float32frombits(b: number): number {
	// The bits are stored and the float read back.
	uint32View[0] = b;
	return float32View[0];
}

// Float64bits returns the IEEE 754 binary representation of f as a uint64,
// with the sign bit of f and the result in the same bit position,
// and Float64bits(Float64frombits(x)) == x. The uint64 maps to bigint to
// preserve the full 64-bit pattern.
export function Float64bits(f: number): bigint {
	// The float is stored and its bits read back.
	float64View[0] = f;
	return uint64View[0];
}

// Float64frombits returns the floating-point number corresponding
// to the IEEE 754 binary representation b, with the sign bit of b
// and the result in the same bit position.
// Float64frombits(Float64bits(x)) == x. The uint64 argument is a bigint.
export function Float64frombits(b: bigint): number {
	// The bits are stored and the float read back.
	uint64View[0] = BigInt.asUintN(64, b);
	return float64View[0];
}
