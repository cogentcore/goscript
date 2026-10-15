// Generated file based on netip.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as cmp from "@goscript/cmp/index.js"

import * as errors from "@goscript/errors/index.js"

import * as bytealg from "@goscript/internal/bytealg/index.js"

import * as byteorder from "@goscript/internal/byteorder/index.js"

import * as math from "@goscript/math/index.js"

import * as strconv from "@goscript/strconv/index.js"

import * as _unique from "@goscript/unique/index.js"

import * as __goscript_uint128 from "./uint128.gs.ts"
import "@goscript/cmp/index.js"
import "@goscript/errors/index.js"
import "@goscript/internal/bytealg/index.js"
import "@goscript/internal/byteorder/index.js"
import "@goscript/math/index.js"
import "@goscript/strconv/index.js"
import "@goscript/unique/index.js"
import "./uint128.gs.ts"

$.registerTypePackagePath("net/netip", ["netip.Addr", "netip.addrDetail", "netip.parseAddrError", "netip.AddrPort", "netip.Prefix", "netip.parsePrefixError"])

export class Addr {
	// addr is the hi and lo bits of an IPv6 address. If z==z4,
	// hi and lo contain the IPv4-mapped IPv6 address.
	//
	// hi and lo are constructed by interpreting a 16-byte IPv6
	// address as a big-endian 128-bit number. The most significant
	// bits of that number go into hi, the rest into lo.
	//
	// For example, 0011:2233:4455:6677:8899:aabb:ccdd:eeff is stored as:
	//  addr.hi = 0x0011223344556677
	//  addr.lo = 0x8899aabbccddeeff
	//
	// We store IPs like this, rather than as [16]byte, because it
	// turns most operations on IPs into arithmetic and bit-twiddling
	// operations on 64-bit registers, which is much faster than
	// bytewise processing.
	public declare addr: __goscript_uint128.uint128

	// Details about the address, wrapped up together and canonicalized.
	public declare z: _unique.Handle<addrDetail>

	constructor(init?: Partial<{addr?: __goscript_uint128.uint128, z?: _unique.Handle<addrDetail>}>, __goscriptValue?: boolean) {
		this.addr = init?.addr ? init.addr.clone() : new __goscript_uint128.uint128(undefined, true)
		this.z = init?.z ? $.markAsStructValue($.cloneStructValue(init.z)) : $.markAsStructValue(new _unique.Handle<addrDetail>())
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Addr {
		return new Addr(this, true)
	}

	public __goscriptAssign(source: Addr): this {
		this.addr.__goscriptAssign(source.addr)
		$.assignStruct(this.z, source.z)
		return this
	}

	public AppendBinary(b: $.Slice<number>): [$.Slice<number>, $.GoError] {
		const ip = this;
		switch (ip.z) {
			case z0:
			{
				break
			}
			case z4:
			{
				b = byteorder.BEAppendUint32(b, $.uint(ip.addr.lo, 32))
				break
			}
			default:
			{
				b = byteorder.BEAppendUint64(b, ip.addr.hi)
				b = byteorder.BEAppendUint64(b, ip.addr.lo)
				b = $.appendSlice(b, $.stringToBytes(ip.Zone()), $.byteSliceHint)
				break
			}
		}
		return [b, null]
	}

	public AppendText(b: $.Slice<number>): [$.Slice<number>, $.GoError] {
		const ip = this;
		return [ip.AppendTo(b), null]
	}

	public AppendTo(b: $.Slice<number>): $.Slice<number> {
		const ip = this;
		switch (ip.z) {
			case z0:
			{
				return b
				break
			}
			case z4:
			{
				return ip.appendTo4(b)
				break
			}
			default:
			{
				if (ip.Is4In6()) {
					return ip.appendTo4In6(b)
				}
				return ip.appendTo6(b)
				break
			}
		}
		throw new globalThis.Error("goscript: unreachable return")
	}

	public As16(): Uint8Array {
		const ip = this;
		let a16: Uint8Array = $.arrayValue(new Uint8Array(16))
		byteorder.BEPutUint64($.goSlice(a16, undefined, 8), ip.addr.hi)
		byteorder.BEPutUint64($.goSlice(a16, 8, undefined), ip.addr.lo)
		return $.cloneArrayValue(a16, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 16))
	}

	public As4(): Uint8Array {
		const ip = this;
		let a4: Uint8Array = $.arrayValue(new Uint8Array(4))
		if (($.structEqual(ip.z, z4)) || ip.Is4In6()) {
			byteorder.BEPutUint32($.goSlice(a4, undefined, undefined), $.uint(ip.addr.lo, 32))
			return $.cloneArrayValue(a4, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4))
		}
		if ($.structEqual(ip.z, z0)) {
			$.panic("As4 called on IP zero value")
		}
		$.panic("As4 called on IPv6 address")
		throw new globalThis.Error("goscript: unreachable return")
	}

	public AsSlice(): $.Slice<number> {
		const ip = this;
		switch (ip.z) {
			case z0:
			{
				return null
				break
			}
			case z4:
			{
				let ret: Uint8Array = $.arrayValue(new Uint8Array(4))
				byteorder.BEPutUint32($.goSlice(ret, undefined, undefined), $.uint(ip.addr.lo, 32))
				return $.goSlice(ret, undefined, undefined)
				break
			}
			default:
			{
				let ret: Uint8Array = $.arrayValue(new Uint8Array(16))
				byteorder.BEPutUint64($.goSlice(ret, undefined, 8), ip.addr.hi)
				byteorder.BEPutUint64($.goSlice(ret, 8, undefined), ip.addr.lo)
				return $.goSlice(ret, undefined, undefined)
				break
			}
		}
		throw new globalThis.Error("goscript: unreachable return")
	}

	public BitLen(): number {
		const ip = this;
		switch (ip.z) {
			case z0:
			{
				return 0
				break
			}
			case z4:
			{
				return 32
				break
			}
		}
		return 128
	}

	public Compare(ip2: Addr): number {
		const ip = this;
		let f1 = ip.BitLen()
		let f2 = ip2.BitLen()
		if (f1 < f2) {
			return -1
		}
		if (f1 > f2) {
			return 1
		}
		let hi1 = ip.addr.hi
		let hi2 = ip2.addr.hi
		if (hi1 < hi2) {
			return -1
		}
		if (hi1 > hi2) {
			return 1
		}
		let lo1 = ip.addr.lo
		let lo2 = ip2.addr.lo
		if (lo1 < lo2) {
			return -1
		}
		if (lo1 > lo2) {
			return 1
		}
		if (ip.Is6()) {
			let za = ip.Zone()
			let zb = ip2.Zone()
			if ($.stringCompare(za, zb) < 0) {
				return -1
			}
			if ($.stringCompare(za, zb) > 0) {
				return 1
			}
		}
		return 0
	}

	public Is4(): boolean {
		const ip = this;
		return $.structEqual(ip.z, z4)
	}

	public Is4In6(): boolean {
		const ip = this;
		return (ip.Is6() && (ip.addr.hi == 0n)) && (($.uint64Shr(ip.addr.lo, 32n)) == 65535n)
	}

	public Is6(): boolean {
		const ip = this;
		return (!$.structEqual(ip.z, z0)) && (!$.structEqual(ip.z, z4))
	}

	public IsGlobalUnicast(): boolean {
		let ip: Addr = this;
		if ($.structEqual(ip.z, z0)) {
			// Invalid or zero-value.
			return false
		}

		if (ip.Is4In6()) {
			ip = ip.__goscriptAssign($.markAsStructValue($.cloneStructValue(ip)).Unmap())
		}

		// Match package net's IsGlobalUnicast logic. Notably private IPv4 addresses
		// and ULA IPv6 addresses are still considered "global unicast".
		if (ip.Is4() && (($.structEqual(ip, IPv4Unspecified())) || ($.structEqual(ip, AddrFrom4($.arrayValue(new Uint8Array([255, 255, 255, 255]))))))) {
			return false
		}

		return (((!$.structEqual(ip, IPv6Unspecified())) && !$.markAsStructValue($.cloneStructValue(ip)).IsLoopback()) && !$.markAsStructValue($.cloneStructValue(ip)).IsMulticast()) && !$.markAsStructValue($.cloneStructValue(ip)).IsLinkLocalUnicast()
	}

	public IsInterfaceLocalMulticast(): boolean {
		const ip = this;
		// IPv6 Addressing Architecture (2.7.1. Pre-Defined Multicast Addresses)
		// https://datatracker.ietf.org/doc/html/rfc4291#section-2.7.1
		if (ip.Is6() && !ip.Is4In6()) {
			return $.uint(($.markAsStructValue($.cloneStructValue(ip)).v6u16(0) & 0xff0f), 16) == 0xff01
		}
		return false
	}

	public IsLinkLocalMulticast(): boolean {
		let ip: Addr = this;
		if (ip.Is4In6()) {
			ip = ip.__goscriptAssign($.markAsStructValue($.cloneStructValue(ip)).Unmap())
		}

		// IPv4 Multicast Guidelines (4. Local Network Control Block (224.0.0/24))
		// https://datatracker.ietf.org/doc/html/rfc5771#section-4
		if (ip.Is4()) {
			return ((ip.v4(0) == 224) && (ip.v4(1) == 0)) && (ip.v4(2) == 0)
		}
		// IPv6 Addressing Architecture (2.7.1. Pre-Defined Multicast Addresses)
		// https://datatracker.ietf.org/doc/html/rfc4291#section-2.7.1
		if (ip.Is6()) {
			return $.uint(($.markAsStructValue($.cloneStructValue(ip)).v6u16(0) & 0xff0f), 16) == 0xff02
		}
		return false
	}

	public IsLinkLocalUnicast(): boolean {
		let ip: Addr = this;
		if (ip.Is4In6()) {
			ip = ip.__goscriptAssign($.markAsStructValue($.cloneStructValue(ip)).Unmap())
		}

		// Dynamic Configuration of IPv4 Link-Local Addresses
		// https://datatracker.ietf.org/doc/html/rfc3927#section-2.1
		if (ip.Is4()) {
			return (ip.v4(0) == 169) && (ip.v4(1) == 254)
		}
		// IP Version 6 Addressing Architecture (2.4 Address Type Identification)
		// https://datatracker.ietf.org/doc/html/rfc4291#section-2.4
		if (ip.Is6()) {
			return $.uint(($.markAsStructValue($.cloneStructValue(ip)).v6u16(0) & 0xffc0), 16) == 0xfe80
		}
		return false
	}

	public IsLoopback(): boolean {
		let ip: Addr = this;
		if (ip.Is4In6()) {
			ip = ip.__goscriptAssign($.markAsStructValue($.cloneStructValue(ip)).Unmap())
		}

		// Requirements for Internet Hosts -- Communication Layers (3.2.1.3 Addressing)
		// https://datatracker.ietf.org/doc/html/rfc1122#section-3.2.1.3
		if (ip.Is4()) {
			return ip.v4(0) == 127
		}
		// IP Version 6 Addressing Architecture (2.4 Address Type Identification)
		// https://datatracker.ietf.org/doc/html/rfc4291#section-2.4
		if (ip.Is6()) {
			return (ip.addr.hi == 0n) && (ip.addr.lo == 1n)
		}
		return false
	}

	public IsMulticast(): boolean {
		let ip: Addr = this;
		if (ip.Is4In6()) {
			ip = ip.__goscriptAssign($.markAsStructValue($.cloneStructValue(ip)).Unmap())
		}

		// Host Extensions for IP Multicasting (4. HOST GROUP ADDRESSES)
		// https://datatracker.ietf.org/doc/html/rfc1112#section-4
		if (ip.Is4()) {
			return $.uint((ip.v4(0) & 0xf0), 8) == 0xe0
		}
		// IP Version 6 Addressing Architecture (2.4 Address Type Identification)
		// https://datatracker.ietf.org/doc/html/rfc4291#section-2.4
		if (ip.Is6()) {
			return ($.uint64Shr(ip.addr.hi, 56n)) == 255n
		}
		return false
	}

	public IsPrivate(): boolean {
		let ip: Addr = this;
		if (ip.Is4In6()) {
			ip = ip.__goscriptAssign($.markAsStructValue($.cloneStructValue(ip)).Unmap())
		}

		// Match the stdlib's IsPrivate logic.
		if (ip.Is4()) {
			// RFC 1918 allocates 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 as
			// private IPv4 address subnets.
			return ((ip.v4(0) == 10) || ((ip.v4(0) == 172) && ($.uint((ip.v4(1) & 0xf0), 8) == 16))) || ((ip.v4(0) == 192) && (ip.v4(1) == 168))
		}

		if (ip.Is6()) {
			// RFC 4193 allocates fc00::/7 as the unique local unicast IPv6 address
			// subnet.
			return $.uint(($.markAsStructValue($.cloneStructValue(ip)).v6(0) & 0xfe), 8) == 0xfc
		}

		return false
	}

	public IsUnspecified(): boolean {
		const ip = this;
		return ($.structEqual(ip, IPv4Unspecified())) || ($.structEqual(ip, IPv6Unspecified()))
	}

	public IsValid(): boolean {
		const ip = this;
		return !$.structEqual(ip.z, z0)
	}

	public Less(ip2: Addr): boolean {
		const ip = this;
		return ip.Compare(ip2) == -1
	}

	public MarshalBinary(): [$.Slice<number>, $.GoError] {
		const ip = this;
		return ip.AppendBinary($.makeSlice<number>(0, ip.marshalBinarySize(), "byte"))
	}

	public MarshalText(): [$.Slice<number>, $.GoError] {
		const ip = this;
		let buf: $.Slice<number> = new Uint8Array([]) as $.Slice<number>
		switch (ip.z) {
			case z0:
			{
				break
			}
			case z4:
			{
				const maxCap: number = 15
				buf = $.makeSlice<number>(0, 15, "byte")
				break
			}
			default:
			{
				if (ip.Is4In6()) {
					const maxCap: number = 29
					buf = $.makeSlice<number>(0, 29, "byte")
					break
				}
				const maxCap: number = 46
				buf = $.makeSlice<number>(0, 46, "byte")
				break
			}
		}
		return ip.AppendText(buf)
	}

	public Next(): Addr {
		let ip: Addr = this;
		ip.addr.__goscriptAssign(ip.addr.addOne())
		if (ip.Is4()) {
			if ($.uint(ip.addr.lo, 32) == 0) {
				// Overflowed.
				return new Addr(undefined, true)
			}
		} else {
			if (ip.addr.isZero()) {
				// Overflowed
				return new Addr(undefined, true)
			}
		}
		return (ip).clone()
	}

	public Prefix(b: number): [Prefix, $.GoError] {
		let ip: Addr = this;
		if (b < 0) {
			return [new Prefix(undefined, true), errors.New("negative Prefix bits")]
		}
		let effectiveBits = b
		switch (ip.z) {
			case z0:
			{
				return [new Prefix(undefined, true), null]
				break
			}
			case z4:
			{
				if (b > 32) {
					return [new Prefix(undefined, true), errors.New("prefix length " + strconv.Itoa(b) + " too large for IPv4")]
				}
				effectiveBits += 96
				break
			}
			default:
			{
				if (b > 128) {
					return [new Prefix(undefined, true), errors.New("prefix length " + strconv.Itoa(b) + " too large for IPv6")]
				}
				break
			}
		}
		ip.addr.__goscriptAssign(ip.addr.and(__goscript_uint128.mask6(effectiveBits)))
		return [PrefixFrom(ip, b), null]
	}

	public Prev(): Addr {
		let ip: Addr = this;
		if (ip.Is4()) {
			if ($.uint(ip.addr.lo, 32) == 0) {
				return new Addr(undefined, true)
			}
		} else {
			if (ip.addr.isZero()) {
				return new Addr(undefined, true)
			}
		}
		ip.addr.__goscriptAssign(ip.addr.subOne())
		return (ip).clone()
	}

	public String(): string {
		const ip = this;
		if (!ip.IsValid()) {
			return "invalid IP"
		}
		let b: $.Slice<number> = null! as $.Slice<number>
		switch ((true as boolean)) {
			case $.structEqual(ip.z, z4):
			{
				const max: number = 15
				b = $.makeSlice<number>(0, 15, "byte")
				b = ip.appendTo4(b)
				break
			}
			case ip.Is4In6():
			{
				const max: number = 29
				b = $.makeSlice<number>(0, 29, "byte")
				b = ip.appendTo4In6(b)
				break
			}
			default:
			{
				const max: number = 46
				b = $.makeSlice<number>(0, 46, "byte")
				b = ip.appendTo6(b)
				break
			}
		}
		return $.bytesToString(b)
	}

	public StringExpanded(): string {
		const ip = this;
		switch (ip.z) {
			case z0:
			case z4:
			{
				return ip.String()
				break
			}
		}

		const size: number = 39
		let ret: $.Slice<number> = $.makeSlice<number>(0, 39, "byte")
		for (let i = 0; i < 8; i = ((i + 1) & 0xff)) {
			if (i > 0) {
				ret = $.append(ret, $.uint(58, 8), $.byteSliceHint)
			}

			ret = appendHexPad(ret, $.markAsStructValue($.cloneStructValue(ip)).v6u16(i))
		}

		if (!$.structEqual(ip.z, z6noz)) {
			// The addition of a zone will cause a second allocation, but when there
			// is no zone the ret slice will be stack allocated.
			ret = $.append(ret, $.uint(37, 8), $.byteSliceHint)
			ret = $.appendSlice(ret, $.stringToBytes(ip.Zone()), $.byteSliceHint)
		}
		return $.bytesToString(ret)
	}

	public Unmap(): Addr {
		let ip: Addr = this;
		if (ip.Is4In6()) {
			$.assignStruct(ip.z, $.markAsStructValue($.cloneStructValue(z4)))
		}
		return (ip).clone()
	}

	public UnmarshalBinary(b: $.Slice<number>): $.GoError {
		let ip: Addr | $.VarRef<Addr> | null = this;
		let n = $.sliceLen(b)
		switch ((true as boolean)) {
			case n == 0:
			{
				$.pointerValue<Addr>(ip).__goscriptAssign(new Addr(undefined, true))
				return null
				break
			}
			case n == 4:
			{
				$.pointerValue<Addr>(ip).__goscriptAssign(AddrFrom4($.cloneArrayValue(($.sliceToArray<number>(b, 4, "byte") as Uint8Array), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4))))
				return null
				break
			}
			case n == 16:
			{
				$.pointerValue<Addr>(ip).__goscriptAssign(AddrFrom16($.cloneArrayValue(($.sliceToArray<number>(b, 16, "byte") as Uint8Array), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 16))))
				return null
				break
			}
			case n > 16:
			{
				$.pointerValue<Addr>(ip).__goscriptAssign($.markAsStructValue($.cloneStructValue(AddrFrom16($.cloneArrayValue(($.sliceToArray<number>($.goSlice(b, undefined, 16), 16, "byte") as Uint8Array), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 16))))).WithZone($.bytesToString($.goSlice(b, 16, undefined))))
				return null
				break
			}
		}
		return errors.New("unexpected slice size")
	}

	public UnmarshalText(text: $.Slice<number>): $.GoError {
		let ip: Addr | $.VarRef<Addr> | null = this;
		if ($.sliceLen(text) == 0) {
			$.pointerValue<Addr>(ip).__goscriptAssign(new Addr(undefined, true))
			return null
		}
		let err: $.GoError = null! as $.GoError
		let __goscriptTuple0: any = ParseAddr($.bytesToString(text))
		$.assignStruct($.pointerValue<Addr>(ip), __goscriptTuple0[0])
		err = __goscriptTuple0[1]
		return err
	}

	public WithZone(zone: string): Addr {
		let ip: Addr = this;
		if (!ip.Is6()) {
			return (ip).clone()
		}
		if ($.stringEqual(zone, "")) {
			$.assignStruct(ip.z, $.markAsStructValue($.cloneStructValue(z6noz)))
			return (ip).clone()
		}
		$.assignStruct(ip.z, ($.markAsStructValue($.cloneStructValue(_unique.Make(new addrDetail({isV6: true, zoneV6: zone}, true)))) as _unique.Handle<addrDetail>))
		return (ip).clone()
	}

	public Zone(): string {
		const ip = this;
		if ($.structEqual(ip.z, z0)) {
			return ""
		}
		return $.markAsStructValue($.cloneStructValue(ip.z)).Value().zoneV6
	}

	public appendTo4(ret: $.Slice<number>): $.Slice<number> {
		const ip = this;
		ret = appendDecimal(ret, ip.v4(0))
		ret = $.append(ret, $.uint(46, 8), $.byteSliceHint)
		ret = appendDecimal(ret, ip.v4(1))
		ret = $.append(ret, $.uint(46, 8), $.byteSliceHint)
		ret = appendDecimal(ret, ip.v4(2))
		ret = $.append(ret, $.uint(46, 8), $.byteSliceHint)
		ret = appendDecimal(ret, ip.v4(3))
		return ret
	}

	public appendTo4In6(ret: $.Slice<number>): $.Slice<number> {
		const ip = this;
		ret = $.appendSlice(ret, $.stringToBytes("::ffff:"), $.byteSliceHint)
		ret = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ip)).Unmap())).appendTo4(ret)
		if (!$.structEqual(ip.z, z6noz)) {
			ret = $.append(ret, $.uint(37, 8), $.byteSliceHint)
			ret = $.appendSlice(ret, $.stringToBytes(ip.Zone()), $.byteSliceHint)
		}
		return ret
	}

	public appendTo6(ret: $.Slice<number>): $.Slice<number> {
		const ip = this;
		let zeroStart = 255
		let zeroEnd = 255
		for (let i = 0; i < 8; i = ((i + 1) & 0xff)) {
			let j = i
			while ((j < 8) && ($.markAsStructValue($.cloneStructValue(ip)).v6u16(j) == 0)) {
				j = ((j + 1) & 0xff)
			}
			{
				let l = $.uint(((j - i) & 0xff), 8)
				if ((l >= 2) && (l > $.uint((((zeroEnd - zeroStart) & 0xff)), 8))) {
					let __goscriptAssign0_0: number = i
					let __goscriptAssign0_1: number = j
					zeroStart = __goscriptAssign0_0
					zeroEnd = __goscriptAssign0_1
				}
			}
		}

		for (let i = 0; i < 8; i = ((i + 1) & 0xff)) {
			if (i == zeroStart) {
				ret = $.append(ret, $.uint(58, 8), $.uint(58, 8), $.byteSliceHint)
				i = zeroEnd
				if (i >= 8) {
					break
				}
			} else {
				if (i > 0) {
					ret = $.append(ret, $.uint(58, 8), $.byteSliceHint)
				}
			}

			ret = appendHex(ret, $.markAsStructValue($.cloneStructValue(ip)).v6u16(i))
		}

		if (!$.structEqual(ip.z, z6noz)) {
			ret = $.append(ret, $.uint(37, 8), $.byteSliceHint)
			ret = $.appendSlice(ret, $.stringToBytes(ip.Zone()), $.byteSliceHint)
		}
		return ret
	}

	public hasZone(): boolean {
		const ip = this;
		return ((!$.structEqual(ip.z, z0)) && (!$.structEqual(ip.z, z4))) && (!$.structEqual(ip.z, z6noz))
	}

	public isZero(): boolean {
		const ip = this;
		// Faster than comparing ip == Addr{}, but effectively equivalent,
		// as there's no way to make an IP with a nil z from this package.
		return $.structEqual(ip.z, z0)
	}

	public marshalBinarySize(): number {
		const ip = this;
		switch (ip.z) {
			case z0:
			{
				return 0
				break
			}
			case z4:
			{
				return 4
				break
			}
			default:
			{
				return 16 + $.stringLen(ip.Zone())
				break
			}
		}
		throw new globalThis.Error("goscript: unreachable return")
	}

	public v4(i: number): number {
		const ip = this;
		return $.uint($.uint64Shr(ip.addr.lo, ((((3 - i) & 0xff)) * 8)), 8)
	}

	public v6(i: number): number {
		const ip = this;
		return $.uint($.uint64Shr($.pointerValue<bigint>(($.arrayIndex(ip.addr.halves(), (globalThis.Math.trunc(i / 8)) % 2))), ((((7 - (i % 8)) & 0xff)) * 8)), 8)
	}

	public v6u16(i: number): number {
		const ip = this;
		return $.uint($.uint64Shr($.pointerValue<bigint>(($.arrayIndex(ip.addr.halves(), (globalThis.Math.trunc(i / 4)) % 2))), ((((3 - (i % 4)) & 0xff)) * 16)), 16)
	}

	public withoutZone(): Addr {
		let ip: Addr = this;
		if (!ip.Is6()) {
			return (ip).clone()
		}
		$.assignStruct(ip.z, $.markAsStructValue($.cloneStructValue(z6noz)))
		return (ip).clone()
	}

	static __typeInfo = $.registerStructType(
		"netip.Addr",
		() => new Addr(),
		() => [{ name: "AppendBinary", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "AppendText", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "AppendTo", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }] }, { name: "As16", args: [], returns: [{ type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 16) }] }, { name: "As4", args: [], returns: [{ type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4) }] }, { name: "AsSlice", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }] }, { name: "BitLen", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "Compare", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "Is4", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "Is4In6", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "Is6", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "IsGlobalUnicast", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "IsInterfaceLocalMulticast", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "IsLinkLocalMulticast", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "IsLinkLocalUnicast", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "IsLoopback", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "IsMulticast", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "IsPrivate", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "IsUnspecified", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "IsValid", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "Less", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "MarshalBinary", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "MarshalText", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "Next", args: [], returns: [{ type: "netip.Addr" }] }, { name: "Prefix", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "netip.Prefix" }, { type: "error" }] }, { name: "Prev", args: [], returns: [{ type: "netip.Addr" }] }, { name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "StringExpanded", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "Unmap", args: [], returns: [{ type: "netip.Addr" }] }, { name: "UnmarshalBinary", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }], pointerReceiver: true }, { name: "UnmarshalText", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }], pointerReceiver: true }, { name: "WithZone", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "netip.Addr" }] }, { name: "Zone", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "appendTo4", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }] }, { name: "appendTo4In6", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }] }, { name: "appendTo6", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }] }, { name: "hasZone", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "isZero", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "marshalBinarySize", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "v4", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("uint8") }] }, { name: "v6", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("uint8") }] }, { name: "v6u16", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("uint16") }] }, { name: "withoutZone", args: [], returns: [{ type: "netip.Addr" }] }],
		Addr,
		() => [{ name: "addr", key: "addr", type: "netip.uint128" }, { name: "z", key: "z", type: "unique.Handle" }]
	)
}

export class addrDetail {
	public declare isV6: boolean

	public declare zoneV6: string

	constructor(init?: Partial<{isV6?: boolean, zoneV6?: string}>, __goscriptValue?: boolean) {
		this.isV6 = init?.isV6 ?? (false as boolean)
		this.zoneV6 = init?.zoneV6 ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): addrDetail {
		return new addrDetail(this, true)
	}

	public __goscriptAssign(source: addrDetail): this {
		this.isV6 = source.isV6
		this.zoneV6 = source.zoneV6
		return this
	}

	static __typeInfo = $.registerStructType(
		"netip.addrDetail",
		() => new addrDetail(),
		() => [],
		addrDetail,
		() => [{ name: "isV6", key: "isV6", type: /* @__PURE__ */ $.basicType("bool") }, { name: "zoneV6", key: "zoneV6", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class parseAddrError {
	public declare _in: string

	public declare msg: string

	public declare at: string

	constructor(init?: Partial<{_in?: string, msg?: string, at?: string}>, __goscriptValue?: boolean) {
		this._in = init?._in ?? ("" as string)
		this.msg = init?.msg ?? ("" as string)
		this.at = init?.at ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): parseAddrError {
		return new parseAddrError(this, true)
	}

	public __goscriptAssign(source: parseAddrError): this {
		this._in = source._in
		this.msg = source.msg
		this.at = source.at
		return this
	}

	public async Error(): globalThis.Promise<string> {
		const err = this;
		let q: ((s: string) => string | globalThis.Promise<string>) | null = strconv.Quote
		if (!$.stringEqual(err.at, "")) {
			return "ParseAddr(" + (__goscriptAwait = q!(err._in), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) + "): " + err.msg + " (at " + (__goscriptAwait = q!(err.at), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) + ")"
		}
		return "ParseAddr(" + (__goscriptAwait = q!(err._in), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) + "): " + err.msg
	}

	static __typeInfo = $.registerStructType(
		"netip.parseAddrError",
		() => new parseAddrError(),
		() => [{ name: "Error", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		parseAddrError,
		() => [{ name: "in", key: "_in", type: /* @__PURE__ */ $.basicType("string") }, { name: "msg", key: "msg", type: /* @__PURE__ */ $.basicType("string") }, { name: "at", key: "at", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class AddrPort {
	public declare ip: Addr

	public declare port: number

	constructor(init?: Partial<{ip?: Addr, port?: number}>, __goscriptValue?: boolean) {
		this.ip = init?.ip ? init.ip.clone() : new Addr(undefined, true)
		this.port = init?.port ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): AddrPort {
		return new AddrPort(this, true)
	}

	public __goscriptAssign(source: AddrPort): this {
		this.ip.__goscriptAssign(source.ip)
		this.port = source.port
		return this
	}

	public Addr(): Addr {
		const p = this;
		return (p.ip).clone()
	}

	public AppendBinary(b: $.Slice<number>): [$.Slice<number>, $.GoError] {
		const p = this;
		let __goscriptTuple1: any = $.markAsStructValue($.cloneStructValue(p.Addr())).AppendBinary(b)
		b = __goscriptTuple1[0]
		let err = __goscriptTuple1[1]
		if (err != null) {
			return [null, err]
		}
		return [byteorder.LEAppendUint16(b, p.Port()), null]
	}

	public AppendText(b: $.Slice<number>): [$.Slice<number>, $.GoError] {
		const p = this;
		return [p.AppendTo(b), null]
	}

	public AppendTo(b: $.Slice<number>): $.Slice<number> {
		const p = this;
		switch (p.ip.z) {
			case z0:
			{
				return b
				break
			}
			case z4:
			{
				b = p.ip.appendTo4(b)
				break
			}
			default:
			{
				b = $.append(b, $.uint(91, 8), $.byteSliceHint)
				if (p.ip.Is4In6()) {
					b = p.ip.appendTo4In6(b)
				} else {
					b = p.ip.appendTo6(b)
				}
				b = $.append(b, $.uint(93, 8), $.byteSliceHint)
				break
			}
		}
		b = $.append(b, $.uint(58, 8), $.byteSliceHint)
		b = strconv.AppendUint(b, $.uint64(p.port), 10)
		return b
	}

	public Compare(p2: AddrPort): number {
		const p = this;
		{
			let c = $.markAsStructValue($.cloneStructValue(p.Addr())).Compare(p2.Addr())
			if (c != 0) {
				return c
			}
		}
		return cmp.Compare(p.Port(), p2.Port())
	}

	public IsValid(): boolean {
		const p = this;
		return p.ip.IsValid()
	}

	public MarshalBinary(): [$.Slice<number>, $.GoError] {
		const p = this;
		return p.AppendBinary($.makeSlice<number>(0, $.markAsStructValue($.cloneStructValue(p.Addr())).marshalBinarySize() + 2, "byte"))
	}

	public MarshalText(): [$.Slice<number>, $.GoError] {
		const p = this;
		let buf: $.Slice<number> = new Uint8Array([]) as $.Slice<number>
		switch (p.ip.z) {
			case z0:
			{
				break
			}
			case z4:
			{
				const maxCap: number = 21
				buf = $.makeSlice<number>(0, 21, "byte")
				break
			}
			default:
			{
				const maxCap: number = 54
				buf = $.makeSlice<number>(0, 54, "byte")
				break
			}
		}
		return p.AppendText(buf)
	}

	public Port(): number {
		const p = this;
		return p.port
	}

	public String(): string {
		const p = this;
		let b: $.Slice<number> = null! as $.Slice<number>
		switch (p.ip.z) {
			case z0:
			{
				return "invalid AddrPort"
				break
			}
			case z4:
			{
				const max: number = 21
				b = $.makeSlice<number>(0, 21, "byte")
				b = p.ip.appendTo4(b)
				break
			}
			default:
			{
				if (p.ip.Is4In6()) {
					const max: number = 37
					b = $.makeSlice<number>(0, 37, "byte")
					b = $.append(b, $.uint(91, 8), $.byteSliceHint)
					b = p.ip.appendTo4In6(b)
				} else {
					const max: number = 54
					b = $.makeSlice<number>(0, 54, "byte")
					b = $.append(b, $.uint(91, 8), $.byteSliceHint)
					b = p.ip.appendTo6(b)
				}
				b = $.append(b, $.uint(93, 8), $.byteSliceHint)
				break
			}
		}
		b = $.append(b, $.uint(58, 8), $.byteSliceHint)
		b = strconv.AppendUint(b, $.uint64(p.port), 10)
		return $.bytesToString(b)
	}

	public UnmarshalBinary(b: $.Slice<number>): $.GoError {
		let p: AddrPort | $.VarRef<AddrPort> | null = this;
		if ($.sliceLen(b) < 2) {
			return errors.New("unexpected slice size")
		}
		let addr: $.VarRef<Addr> = $.varRef(new Addr(undefined, true))
		let err = addr.value.UnmarshalBinary($.goSlice(b, undefined, $.sliceLen(b) - 2))
		if (err != null) {
			return err
		}
		$.pointerValue<AddrPort>(p).__goscriptAssign(AddrPortFrom(addr.value, byteorder.LEUint16($.goSlice(b, $.sliceLen(b) - 2, undefined))))
		return null
	}

	public UnmarshalText(text: $.Slice<number>): $.GoError {
		let p: AddrPort | $.VarRef<AddrPort> | null = this;
		if ($.sliceLen(text) == 0) {
			$.pointerValue<AddrPort>(p).__goscriptAssign(new AddrPort(undefined, true))
			return null
		}
		let err: $.GoError = null! as $.GoError
		let __goscriptTuple2: any = ParseAddrPort($.bytesToString(text))
		$.assignStruct($.pointerValue<AddrPort>(p), __goscriptTuple2[0])
		err = __goscriptTuple2[1]
		return err
	}

	static __typeInfo = $.registerStructType(
		"netip.AddrPort",
		() => new AddrPort(),
		() => [{ name: "Addr", args: [], returns: [{ type: "netip.Addr" }] }, { name: "AppendBinary", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "AppendText", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "AppendTo", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }] }, { name: "Compare", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "IsValid", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "MarshalBinary", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "MarshalText", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "Port", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("uint16") }] }, { name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "UnmarshalBinary", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }], pointerReceiver: true }, { name: "UnmarshalText", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }], pointerReceiver: true }],
		AddrPort,
		() => [{ name: "ip", key: "ip", type: "netip.Addr" }, { name: "port", key: "port", type: /* @__PURE__ */ $.basicType("uint16") }]
	)
}

export class Prefix {
	public declare ip: Addr

	// bitsPlusOne stores the prefix bit length plus one.
	// A Prefix is valid if and only if bitsPlusOne is non-zero.
	public declare bitsPlusOne: number

	constructor(init?: Partial<{ip?: Addr, bitsPlusOne?: number}>, __goscriptValue?: boolean) {
		this.ip = init?.ip ? init.ip.clone() : new Addr(undefined, true)
		this.bitsPlusOne = init?.bitsPlusOne ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Prefix {
		return new Prefix(this, true)
	}

	public __goscriptAssign(source: Prefix): this {
		this.ip.__goscriptAssign(source.ip)
		this.bitsPlusOne = source.bitsPlusOne
		return this
	}

	public Addr(): Addr {
		const p = this;
		return (p.ip).clone()
	}

	public AppendBinary(b: $.Slice<number>): [$.Slice<number>, $.GoError] {
		const p = this;
		let __goscriptTuple5: any = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(p.Addr())).withoutZone())).AppendBinary(b)
		b = __goscriptTuple5[0]
		let err = __goscriptTuple5[1]
		if (err != null) {
			return [null, err]
		}
		return [$.append(b, $.uint($.uint(p.Bits(), 8), 8), $.byteSliceHint), null]
	}

	public AppendText(b: $.Slice<number>): [$.Slice<number>, $.GoError] {
		const p = this;
		return [p.AppendTo(b), null]
	}

	public AppendTo(b: $.Slice<number>): $.Slice<number> {
		const p = this;
		if (p.isZero()) {
			return b
		}
		if (!p.IsValid()) {
			return $.appendSlice(b, $.stringToBytes("invalid Prefix"), $.byteSliceHint)
		}

		if ($.structEqual(p.ip.z, z4)) {
			b = p.ip.appendTo4(b)
		} else {
			if (p.ip.Is4In6()) {
				b = $.appendSlice(b, $.stringToBytes("::ffff:"), $.byteSliceHint)
				b = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(p.ip)).Unmap())).appendTo4(b)
			} else {
				b = p.ip.appendTo6(b)
			}
		}

		b = $.append(b, $.uint(47, 8), $.byteSliceHint)
		b = appendDecimal(b, $.uint(p.Bits(), 8))
		return b
	}

	public Bits(): number {
		const p = this;
		return $.int(p.bitsPlusOne) - 1
	}

	public Compare(p2: Prefix): number {
		const p = this;
		// Aside from sorting based on the masked address, this use of
		// Addr.Compare also enforces the valid vs. invalid and address
		// family ordering for the prefix.
		{
			let c = $.markAsStructValue($.cloneStructValue(p.Masked().Addr())).Compare(p2.Masked().Addr())
			if (c != 0) {
				return c
			}
		}

		{
			let c = cmp.Compare(p.Bits(), p2.Bits())
			if (c != 0) {
				return c
			}
		}

		return $.markAsStructValue($.cloneStructValue(p.Addr())).Compare(p2.Addr())
	}

	public Contains(ip: Addr): boolean {
		const p = this;
		if (!p.IsValid() || ip.hasZone()) {
			return false
		}
		{
			let f1 = p.ip.BitLen()
			let f2 = ip.BitLen()
			if (((f1 == 0) || (f2 == 0)) || (f1 != f2)) {
				return false
			}
		}
		if (ip.Is4()) {
			// xor the IP addresses together; mismatched bits are now ones.
			// Shift away the number of bits we don't care about.
			// Shifts in Go are more efficient if the compiler can prove
			// that the shift amount is smaller than the width of the shifted type (64 here).
			// We know that p.bits is in the range 0..32 because p is Valid;
			// the compiler doesn't know that, so mask with 63 to help it.
			// Now truncate to 32 bits, because this is IPv4.
			// If all the bits we care about are equal, the result will be zero.
			return $.uint($.uint64Shr(($.uint64Xor(ip.addr.lo, p.ip.addr.lo)), ((32 - p.Bits()) & 63)), 32) == 0
		} else {
			// xor the IP addresses together.
			// Mask away the bits we don't care about.
			// If all the bits we care about are equal, the result will be zero.
			return ip.addr.xor(p.ip.addr).and(__goscript_uint128.mask6(p.Bits())).isZero()
		}
		throw new globalThis.Error("goscript: unreachable return")
	}

	public IsSingleIP(): boolean {
		const p = this;
		return p.IsValid() && (p.Bits() == p.ip.BitLen())
	}

	public IsValid(): boolean {
		const p = this;
		return p.bitsPlusOne > 0
	}

	public MarshalBinary(): [$.Slice<number>, $.GoError] {
		const p = this;
		// without the zone the max length is 16, plus an additional byte is 17
		return p.AppendBinary($.makeSlice<number>(0, $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(p.Addr())).withoutZone())).marshalBinarySize() + 1, "byte"))
	}

	public MarshalText(): [$.Slice<number>, $.GoError] {
		const p = this;
		let buf: $.Slice<number> = new Uint8Array([]) as $.Slice<number>
		switch (p.ip.z) {
			case z0:
			{
				break
			}
			case z4:
			{
				const maxCap: number = 18
				buf = $.makeSlice<number>(0, 18, "byte")
				break
			}
			default:
			{
				const maxCap: number = 50
				buf = $.makeSlice<number>(0, 50, "byte")
				break
			}
		}
		return p.AppendText(buf)
	}

	public Masked(): Prefix {
		const p = this;
		let [m, ] = $.markAsStructValue($.cloneStructValue(p.ip)).Prefix(p.Bits())
		return (m).clone()
	}

	public Overlaps(o: Prefix): boolean {
		let p: Prefix = this;
		if (!p.IsValid() || !o.IsValid()) {
			return false
		}
		if ($.structEqual(p, o)) {
			return true
		}
		if (p.ip.Is4() != o.ip.Is4()) {
			return false
		}
		let minBits: number = 0
		{
			let pb = p.Bits()
			let ob = o.Bits()
			if (pb < ob) {
				minBits = pb
			} else {
				minBits = ob
			}
		}
		if (minBits == 0) {
			return true
		}
		// One of these Prefix calls might look redundant, but we don't require
		// that p and o values are normalized (via Prefix.Masked) first,
		// so the Prefix call on the one that's already minBits serves to zero
		// out any remaining bits in IP.
		let err: $.GoError = null! as $.GoError
		{
			let __goscriptTuple6: any = $.markAsStructValue($.cloneStructValue(p.ip)).Prefix(minBits)
			p = p.__goscriptAssign(__goscriptTuple6[0])
			err = __goscriptTuple6[1]
			if (err != null) {
				return false
			}
		}
		{
			let __goscriptTuple7: any = $.markAsStructValue($.cloneStructValue(o.ip)).Prefix(minBits)
			o = o.__goscriptAssign(__goscriptTuple7[0])
			err = __goscriptTuple7[1]
			if (err != null) {
				return false
			}
		}
		return $.structEqual(p.ip, o.ip)
	}

	public String(): string {
		const p = this;
		if (!p.IsValid()) {
			return "invalid Prefix"
		}
		let b: $.Slice<number> = null! as $.Slice<number>
		switch ((true as boolean)) {
			case $.structEqual(p.ip.z, z4):
			{
				const maxCap: number = 18
				b = $.makeSlice<number>(0, 18, "byte")
				b = p.ip.appendTo4(b)
				break
			}
			case p.ip.Is4In6():
			{
				const maxCap: number = 25
				b = $.makeSlice<number>(0, 25, "byte")
				b = $.appendSlice(b, $.stringToBytes("::ffff:"), $.byteSliceHint)
				b = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(p.ip)).Unmap())).appendTo4(b)
				break
			}
			default:
			{
				const maxCap: number = 43
				b = $.makeSlice<number>(0, 43, "byte")
				b = p.ip.appendTo6(b)
				break
			}
		}
		b = $.append(b, $.uint(47, 8), $.byteSliceHint)
		b = appendDecimal(b, $.uint(p.Bits(), 8))
		return $.bytesToString(b)
	}

	public UnmarshalBinary(b: $.Slice<number>): $.GoError {
		let p: Prefix | $.VarRef<Prefix> | null = this;
		if ($.sliceLen(b) < 1) {
			return errors.New("unexpected slice size")
		}
		let addr: $.VarRef<Addr> = $.varRef(new Addr(undefined, true))
		let err = addr.value.UnmarshalBinary($.goSlice(b, undefined, $.sliceLen(b) - 1))
		if (err != null) {
			return err
		}
		$.pointerValue<Prefix>(p).__goscriptAssign(PrefixFrom((addr.value).clone(), $.int($.arrayIndex(b!, $.sliceLen(b) - 1))))
		return null
	}

	public async UnmarshalText(text: $.Slice<number>): globalThis.Promise<$.GoError> {
		let p: Prefix | $.VarRef<Prefix> | null = this;
		if ($.sliceLen(text) == 0) {
			$.pointerValue<Prefix>(p).__goscriptAssign(new Prefix(undefined, true))
			return null
		}
		let err: $.GoError = null! as $.GoError
		let __goscriptTuple8: any = await ParsePrefix($.bytesToString(text))
		$.assignStruct($.pointerValue<Prefix>(p), __goscriptTuple8[0])
		err = __goscriptTuple8[1]
		return err
	}

	public isZero(): boolean {
		const p = this;
		return $.structEqual(p, new Prefix(undefined, true))
	}

	static __typeInfo = $.registerStructType(
		"netip.Prefix",
		() => new Prefix(),
		() => [{ name: "Addr", args: [], returns: [{ type: "netip.Addr" }] }, { name: "AppendBinary", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "AppendText", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "AppendTo", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }] }, { name: "Bits", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "Compare", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "Contains", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "IsSingleIP", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "IsValid", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "MarshalBinary", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "MarshalText", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "Masked", args: [], returns: [{ type: "netip.Prefix" }] }, { name: "Overlaps", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "UnmarshalBinary", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }], pointerReceiver: true }, { name: "UnmarshalText", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }], pointerReceiver: true }, { name: "isZero", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }],
		Prefix,
		() => [{ name: "ip", key: "ip", type: "netip.Addr" }, { name: "bitsPlusOne", key: "bitsPlusOne", type: /* @__PURE__ */ $.basicType("uint8") }]
	)
}

export class parsePrefixError {
	public declare _in: string

	public declare msg: string

	constructor(init?: Partial<{_in?: string, msg?: string}>, __goscriptValue?: boolean) {
		this._in = init?._in ?? ("" as string)
		this.msg = init?.msg ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): parsePrefixError {
		return new parsePrefixError(this, true)
	}

	public __goscriptAssign(source: parsePrefixError): this {
		this._in = source._in
		this.msg = source.msg
		return this
	}

	public Error(): string {
		const err = this;
		return "netip.ParsePrefix(" + strconv.Quote(err._in) + "): " + err.msg
	}

	static __typeInfo = $.registerStructType(
		"netip.parsePrefixError",
		() => new parsePrefixError(),
		() => [{ name: "Error", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		parsePrefixError,
		() => [{ name: "in", key: "_in", type: /* @__PURE__ */ $.basicType("string") }, { name: "msg", key: "msg", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export const digits: string = "0123456789abcdef"

export let z0: _unique.Handle<addrDetail> = $.markAsStructValue(new _unique.Handle<addrDetail>())

export function __goscript_set_z0(__goscriptValue: _unique.Handle<addrDetail>): void {
	$.assignStruct(z0, __goscriptValue)
}

export let z4: _unique.Handle<addrDetail> = $.markAsStructValue($.cloneStructValue(_unique.Make(new addrDetail(undefined, true))))

export function __goscript_set_z4(__goscriptValue: _unique.Handle<addrDetail>): void {
	$.assignStruct(z4, __goscriptValue)
}

export let z6noz: _unique.Handle<addrDetail> = $.markAsStructValue($.cloneStructValue(_unique.Make(new addrDetail({isV6: true}, true))))

export function __goscript_set_z6noz(__goscriptValue: _unique.Handle<addrDetail>): void {
	$.assignStruct(z6noz, __goscriptValue)
}

export function IPv6LinkLocalAllNodes(): Addr {
	return AddrFrom16($.arrayValue(new Uint8Array([255, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])))
}

export function IPv6LinkLocalAllRouters(): Addr {
	return AddrFrom16($.arrayValue(new Uint8Array([255, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2])))
}

export function IPv6Loopback(): Addr {
	return AddrFrom16($.arrayValue(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])))
}

export function IPv6Unspecified(): Addr {
	return new Addr({z: $.markAsStructValue($.cloneStructValue(z6noz))}, true)
}

export function IPv4Unspecified(): Addr {
	return AddrFrom4($.arrayValue(new Uint8Array(4)))
}

export function AddrFrom4(addr: Uint8Array): Addr {
	return new Addr({addr: new __goscript_uint128.uint128({hi: 0n, lo: $.uint64Or(($.uint64Or(($.uint64Or(($.uint64Or(281470681743360n, ($.uint64Shl($.uint64($.arrayIndex(addr, 0)), 24n)))), ($.uint64Shl($.uint64($.arrayIndex(addr, 1)), 16n)))), ($.uint64Shl($.uint64($.arrayIndex(addr, 2)), 8n)))), $.uint64($.arrayIndex(addr, 3)))}, true), z: $.markAsStructValue($.cloneStructValue(z4))}, true)
}

export function AddrFrom16(addr: Uint8Array): Addr {
	return new Addr({addr: (() => { const __goscriptLiteralField0 = byteorder.BEUint64($.goSlice(addr, undefined, 8)); const __goscriptLiteralField1 = byteorder.BEUint64($.goSlice(addr, 8, undefined)); return new __goscript_uint128.uint128({hi: __goscriptLiteralField0, lo: __goscriptLiteralField1}, true) })(), z: $.markAsStructValue($.cloneStructValue(z6noz))}, true)
}

export function ParseAddr(s: string): [Addr, $.GoError] {
	for (let i = 0; i < $.stringLen(s); i++) {
		switch ($.indexString(s, i)) {
			case 46:
			{
				return parseIPv4(s)
				break
			}
			case 58:
			{
				return parseIPv6(s)
				break
			}
			case 37:
			{
				return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: s, msg: "missing IPv6 address"}, true), "netip.parseAddrError", "netip.parseAddrError")]
				break
			}
		}
	}
	return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: s, msg: "unable to parse IP"}, true), "netip.parseAddrError", "netip.parseAddrError")]
}

export function MustParseAddr(s: string): Addr {
	let [ip, err] = ParseAddr(s)
	if (err != null) {
		$.panic((err as any))
	}
	return (ip).clone()
}

export function parseIPv4Fields(_in: string, off: number, end: number, fields: $.Slice<number>): $.GoError {
	let val: number = 0
	let pos: number = 0
	let digLen: number = 0
	let s = $.sliceStringOrBytes(_in, off, end)
	for (let __goscriptSliceWindow0 = $.sliceRange(fields), i = 0; i < $.stringLen(s); i++) {
		if (($.indexString(s, i) >= 48) && ($.indexString(s, i) <= 57)) {
			if ((digLen == 1) && (val == 0)) {
				return $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "IPv4 field has octet with leading zero"}, true), "netip.parseAddrError", "netip.parseAddrError")
			}
			val = ((val * 10) + $.int($.indexString(s, i))) - 48
			digLen++
			if (val > 255) {
				return $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "IPv4 field has value >255"}, true), "netip.parseAddrError", "netip.parseAddrError")
			}
		} else {
			if ($.indexString(s, i) == 46) {
				// .1.2.3
				// 1.2.3.
				// 1..2.3
				if (((i == 0) || (i == ($.stringLen(s) - 1))) || ($.indexString(s, i - 1) == 46)) {
					return $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "IPv4 field must have at least one digit", at: $.sliceStringOrBytes(s, i, undefined)}, true), "netip.parseAddrError", "netip.parseAddrError")
				}
				// 1.2.3.4.5
				if (pos == 3) {
					return $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "IPv4 address too long"}, true), "netip.parseAddrError", "netip.parseAddrError")
				}
				;(__goscriptSliceWindow0.backing as any[])[$.windowSlot(__goscriptSliceWindow0, pos)] = $.uint(val, 8)
				pos++
				val = 0
				digLen = 0
			} else {
				return $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "unexpected character", at: $.sliceStringOrBytes(s, i, undefined)}, true), "netip.parseAddrError", "netip.parseAddrError")
			}
		}
	}
	if (pos < 3) {
		return $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "IPv4 address too short"}, true), "netip.parseAddrError", "netip.parseAddrError")
	}
	$.sliceElems(fields!)[$.sliceSlot(fields!, 3)] = $.uint(val, 8)
	return null
}

export function parseIPv4(s: string): [Addr, $.GoError] {
	let ip: Addr = new Addr(undefined, true)
	let err: $.GoError = null! as $.GoError
	let fields: Uint8Array = $.arrayValue(new Uint8Array(4))
	err = parseIPv4Fields(s, 0, $.stringLen(s), $.goSlice(fields, undefined, undefined))
	if (err != null) {
		return [new Addr(undefined, true), err]
	}
	return [AddrFrom4($.cloneArrayValue(fields, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4))), null]
}

export function parseIPv6(_in: string): [Addr, $.GoError] {
	let s = _in

	// Split off the zone right from the start. Yes it's a second scan
	// of the string, but trying to handle it inline makes a bunch of
	// other inner loop conditionals more expensive, and it ends up
	// being slower.
	let zone = ""
	let i: number = bytealg.IndexByteString(s, 37)
	if (i != -1) {
		let __goscriptAssign1_0: string = $.sliceStringOrBytes(s, undefined, i)
		let __goscriptAssign1_1: string = $.sliceStringOrBytes(s, i + 1, undefined)
		s = __goscriptAssign1_0
		zone = __goscriptAssign1_1
		if ($.stringEqual(zone, "")) {
			// Not allowed to have an empty zone if explicitly specified.
			return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "zone must be a non-empty string"}, true), "netip.parseAddrError", "netip.parseAddrError")]
		}
	}

	let ip: Uint8Array = $.arrayValue(new Uint8Array(16))
	let ellipsis = -1

	// Might have leading ellipsis
	if ((($.stringLen(s) >= 2) && ($.indexString(s, 0) == 58)) && ($.indexString(s, 1) == 58)) {
		ellipsis = 0
		s = $.sliceStringOrBytes(s, 2, undefined)
		// Might be only ellipsis
		if ($.stringLen(s) == 0) {
			return [$.markAsStructValue($.cloneStructValue(IPv6Unspecified())).WithZone(zone), null]
		}
	}

	// Loop, parsing hex numbers followed by colon.
	i = 0
	while (i < 16) {
		// Hex number. Similar to parseIPv4, inlining the hex number
		// parsing yields a significant performance increase.
		let off = 0
		let acc = 0
		for (; off < $.stringLen(s); off++) {
			let c = $.indexString(s, off)
			if ((c >= 48) && (c <= 57)) {
				acc = $.uint((((((acc << 4) >>> 0)) + $.uint($.uint(((c - 48) & 0xff), 8), 32)) >>> 0), 32)
			} else {
				if ((c >= 97) && (c <= 102)) {
					acc = $.uint((((((acc << 4) >>> 0)) + $.uint($.uint((((((c - 97) & 0xff)) + 10) & 0xff), 8), 32)) >>> 0), 32)
				} else {
					if ((c >= 65) && (c <= 70)) {
						acc = $.uint((((((acc << 4) >>> 0)) + $.uint($.uint((((((c - 65) & 0xff)) + 10) & 0xff), 8), 32)) >>> 0), 32)
					} else {
						break
					}
				}
			}
			if (off > 3) {
				//more than 4 digits in group, fail.
				return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "each group must have 4 or less digits", at: s}, true), "netip.parseAddrError", "netip.parseAddrError")]
			}
			if (acc > 65535) {
				// Overflow, fail.
				return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "IPv6 field has value >=2^16", at: s}, true), "netip.parseAddrError", "netip.parseAddrError")]
			}
		}
		if (off == 0) {
			// No digits found, fail.
			return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "each colon-separated field must have at least one digit", at: s}, true), "netip.parseAddrError", "netip.parseAddrError")]
		}

		// If followed by dot, might be in trailing IPv4.
		if ((off < $.stringLen(s)) && ($.indexString(s, off) == 46)) {
			if ((ellipsis < 0) && (i != 12)) {
				// Not the right place.
				return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "embedded IPv4 address must replace the final 2 fields of the address", at: s}, true), "netip.parseAddrError", "netip.parseAddrError")]
			}
			if ((i + 4) > 16) {
				// Not enough room.
				return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "too many hex fields to fit an embedded IPv4 at the end of the address", at: s}, true), "netip.parseAddrError", "netip.parseAddrError")]
			}

			let end = $.stringLen(_in)
			if ($.stringLen(zone) > 0) {
				end -= $.stringLen(zone) + 1
			}
			let err = parseIPv4Fields(_in, end - $.stringLen(s), end, $.goSlice(ip, i, i + 4))
			if (err != null) {
				return [new Addr(undefined, true), err]
			}
			s = ""
			i += 4
			break
		}

		// Save this 16-bit chunk.
		ip[i] = $.uint($.uintShr(acc, 8, 32), 8)
		ip[i + 1] = $.uint(acc, 8)
		i += 2

		// Stop at end of string.
		s = $.sliceStringOrBytes(s, off, undefined)
		if ($.stringLen(s) == 0) {
			break
		}

		// Otherwise must be followed by colon and more.
		if ($.indexString(s, 0) != 58) {
			return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "unexpected character, want colon", at: s}, true), "netip.parseAddrError", "netip.parseAddrError")]
		} else {
			if ($.stringLen(s) == 1) {
				return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "colon must be followed by more characters", at: s}, true), "netip.parseAddrError", "netip.parseAddrError")]
			}
		}
		s = $.sliceStringOrBytes(s, 1, undefined)

		// Look for ellipsis.
		if ($.indexString(s, 0) == 58) {
			if (ellipsis >= 0) {
				return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "multiple :: in address", at: s}, true), "netip.parseAddrError", "netip.parseAddrError")]
			}
			ellipsis = i
			s = $.sliceStringOrBytes(s, 1, undefined)
			if ($.stringLen(s) == 0) {
				break
			}
		}
	}

	// Must have used entire string.
	if ($.stringLen(s) != 0) {
		return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "trailing garbage after address", at: s}, true), "netip.parseAddrError", "netip.parseAddrError")]
	}

	// If didn't parse enough, expand ellipsis.
	if (i < 16) {
		if (ellipsis < 0) {
			return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "address string too short"}, true), "netip.parseAddrError", "netip.parseAddrError")]
		}
		let n = 16 - i
		for (let j = i - 1; j >= ellipsis; j--) {
			ip[j + n] = $.arrayIndex(ip, j)
		}
		$.clear($.goSlice(ip, ellipsis, ellipsis + n))
	} else {
		if (ellipsis >= 0) {
			// Ellipsis must represent at least one 0 group.
			return [new Addr(undefined, true), $.interfaceValue<$.GoError>(new parseAddrError({_in: _in, msg: "the :: must expand to at least one field of zeros"}, true), "netip.parseAddrError", "netip.parseAddrError")]
		}
	}
	return [$.markAsStructValue($.cloneStructValue(AddrFrom16($.cloneArrayValue(ip, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 16))))).WithZone(zone), null]
}

export function AddrFromSlice(slice: $.Slice<number>): [Addr, boolean] {
	let ip: Addr = new Addr(undefined, true)
	let ok: boolean = false
	switch ($.sliceLen(slice)) {
		case 4:
		{
			return [AddrFrom4($.cloneArrayValue(($.sliceToArray<number>(slice, 4, "byte") as Uint8Array), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4))), true]
			break
		}
		case 16:
		{
			return [AddrFrom16($.cloneArrayValue(($.sliceToArray<number>(slice, 16, "byte") as Uint8Array), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 16))), true]
			break
		}
	}
	return [new Addr(undefined, true), false]
}

export function appendDecimal(b: $.Slice<number>, x: number): $.Slice<number> {
	// Using this function rather than strconv.AppendUint makes IPv4
	// string building 2x faster.

	if (x >= 100) {
		b = $.append(b, $.uint($.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", globalThis.Math.trunc(x / 100)), 8), $.byteSliceHint)
	}
	if (x >= 10) {
		b = $.append(b, $.uint($.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", (globalThis.Math.trunc(x / 10)) % 10), 8), $.byteSliceHint)
	}
	return $.append(b, $.uint($.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", x % 10), 8), $.byteSliceHint)
}

export function appendHex(b: $.Slice<number>, x: number): $.Slice<number> {
	// Using this function rather than strconv.AppendUint makes IPv6
	// string building 2x faster.

	if (x >= 0x1000) {
		b = $.append(b, $.uint($.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", $.uintShr(x, 12, 16)), 8), $.byteSliceHint)
	}
	if (x >= 0x100) {
		b = $.append(b, $.uint($.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", ($.uintShr(x, 8, 16)) & 0xf), 8), $.byteSliceHint)
	}
	if (x >= 0x10) {
		b = $.append(b, $.uint($.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", ($.uintShr(x, 4, 16)) & 0xf), 8), $.byteSliceHint)
	}
	return $.append(b, $.uint($.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", x & 0xf), 8), $.byteSliceHint)
}

export function appendHexPad(b: $.Slice<number>, x: number): $.Slice<number> {
	return $.append(b, $.uint($.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", $.uintShr(x, 12, 16)), 8), $.uint($.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", ($.uintShr(x, 8, 16)) & 0xf), 8), $.uint($.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", ($.uintShr(x, 4, 16)) & 0xf), 8), $.uint($.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", x & 0xf), 8), $.byteSliceHint)
}

export function AddrPortFrom(ip: Addr, port: number): AddrPort {
	return new AddrPort({ip: ip, port: port}, true)
}

export function splitAddrPort(s: string): [string, string, boolean, $.GoError] {
	let ip: string = ""
	let port: string = ""
	let v6: boolean = false
	let err: $.GoError = null! as $.GoError
	let i = bytealg.LastIndexByteString(s, 58)
	if (i == -1) {
		return ["", "", false, errors.New("not an ip:port")]
	}

	let __goscriptAssign2_0: string = $.sliceStringOrBytes(s, undefined, i)
	let __goscriptAssign2_1: string = $.sliceStringOrBytes(s, i + 1, undefined)
	ip = __goscriptAssign2_0
	port = __goscriptAssign2_1
	if ($.stringLen(ip) == 0) {
		return ["", "", false, errors.New("no IP")]
	}
	if ($.stringLen(port) == 0) {
		return ["", "", false, errors.New("no port")]
	}
	if ($.indexString(ip, 0) == 91) {
		if (($.stringLen(ip) < 2) || ($.indexString(ip, $.stringLen(ip) - 1) != 93)) {
			return ["", "", false, errors.New("missing ]")]
		}
		ip = $.sliceStringOrBytes(ip, 1, $.stringLen(ip) - 1)
		v6 = true
	}

	return [ip, port, v6, null]
}

export function ParseAddrPort(s: string): [AddrPort, $.GoError] {
	let ipp: AddrPort = new AddrPort(undefined, true)
	let [ip, port, v6, err] = splitAddrPort(s)
	if (err != null) {
		return [(ipp).clone(), err]
	}
	let __goscriptTuple3: any = strconv.ParseUint(port, 10, 16)
	let port16 = __goscriptTuple3[0]
	err = __goscriptTuple3[1]
	if (err != null) {
		return [(ipp).clone(), errors.New("invalid port " + strconv.Quote(port) + " parsing " + strconv.Quote(s))]
	}
	ipp.port = $.uint(port16, 16)
	let __goscriptTuple4: any = ParseAddr(ip)
	ipp.ip.__goscriptAssign(__goscriptTuple4[0])
	err = __goscriptTuple4[1]
	if (err != null) {
		return [new AddrPort(undefined, true), err]
	}
	if (v6 && ipp.ip.Is4()) {
		return [new AddrPort(undefined, true), errors.New("invalid ip:port " + strconv.Quote(s) + ", square brackets can only be used with IPv6 addresses")]
	} else {
		if (!v6 && ipp.ip.Is6()) {
			return [new AddrPort(undefined, true), errors.New("invalid ip:port " + strconv.Quote(s) + ", IPv6 addresses must be surrounded by square brackets")]
		}
	}
	return [(ipp).clone(), null]
}

export function MustParseAddrPort(s: string): AddrPort {
	let [ip, err] = ParseAddrPort(s)
	if (err != null) {
		$.panic((err as any))
	}
	return (ip).clone()
}

export function PrefixFrom(ip: Addr, bits: number): Prefix {
	let bitsPlusOne: number = 0
	if ((!ip.isZero() && (bits >= 0)) && (bits <= ip.BitLen())) {
		bitsPlusOne = $.uint((($.uint(bits, 8) + 1) & 0xff), 8)
	}
	return (() => { const __goscriptLiteralField2 = $.markAsStructValue($.cloneStructValue(ip)).withoutZone(); return new Prefix({ip: __goscriptLiteralField2, bitsPlusOne: bitsPlusOne}, true) })()
}

export async function ParsePrefix(s: string): globalThis.Promise<[Prefix, $.GoError]> {
	let i = bytealg.LastIndexByteString(s, 47)
	if (i < 0) {
		return [new Prefix(undefined, true), $.interfaceValue<$.GoError>(new parsePrefixError({_in: s, msg: "no '/'"}, true), "netip.parsePrefixError", "netip.parsePrefixError")]
	}
	let [ip, err] = ParseAddr($.sliceStringOrBytes(s, undefined, i))
	if (err != null) {
		return [new Prefix(undefined, true), $.interfaceValue<$.GoError>((await (async () => { const __goscriptLiteralField3 = (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait); return new parsePrefixError({_in: s, msg: __goscriptLiteralField3}, true) })()), "netip.parsePrefixError", "netip.parsePrefixError")]
	}
	// IPv6 zones are not allowed: https://go.dev/issue/51899
	if (ip.Is6() && (!$.structEqual(ip.z, z6noz))) {
		return [new Prefix(undefined, true), $.interfaceValue<$.GoError>(new parsePrefixError({_in: s, msg: "IPv6 zones cannot be present in a prefix"}, true), "netip.parsePrefixError", "netip.parsePrefixError")]
	}

	let bitsStr = $.sliceStringOrBytes(s, i + 1, undefined)

	// strconv.Atoi accepts a leading sign and leading zeroes, but we don't want that.
	if (($.stringLen(bitsStr) > 1) && (($.indexString(bitsStr, 0) < 49) || ($.indexString(bitsStr, 0) > 57))) {
		return [new Prefix(undefined, true), $.interfaceValue<$.GoError>((() => { const __goscriptLiteralField4 = "bad bits after slash: " + strconv.Quote(bitsStr); return new parsePrefixError({_in: s, msg: __goscriptLiteralField4}, true) })(), "netip.parsePrefixError", "netip.parsePrefixError")]
	}

	let __goscriptTuple9: any = strconv.Atoi(bitsStr)
	let bits = __goscriptTuple9[0]
	err = __goscriptTuple9[1]
	if (err != null) {
		return [new Prefix(undefined, true), $.interfaceValue<$.GoError>((() => { const __goscriptLiteralField5 = "bad bits after slash: " + strconv.Quote(bitsStr); return new parsePrefixError({_in: s, msg: __goscriptLiteralField5}, true) })(), "netip.parsePrefixError", "netip.parsePrefixError")]
	}
	let maxBits = 32
	if (ip.Is6()) {
		maxBits = 128
	}
	if ((bits < 0) || (bits > maxBits)) {
		return [new Prefix(undefined, true), $.interfaceValue<$.GoError>(new parsePrefixError({_in: s, msg: "prefix length out of range"}, true), "netip.parsePrefixError", "netip.parsePrefixError")]
	}
	return [PrefixFrom(ip, bits), null]
}

export async function MustParsePrefix(s: string): globalThis.Promise<Prefix> {
	let [ip, err] = await ParsePrefix(s)
	if (err != null) {
		$.panic((err as any))
	}
	return (ip).clone()
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "netip.addrDetail", zero: () => new addrDetail(undefined, true) }})
}

var __goscriptAwait: any
