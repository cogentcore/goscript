// Generated file based on url.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as bytes from "@goscript/bytes/index.js"

import * as errors from "@goscript/errors/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as godebug from "@goscript/internal/godebug/index.js"

import * as netip from "@goscript/net/netip/index.js"

import * as path2 from "@goscript/path/index.js"

import * as slices from "@goscript/slices/index.js"

import * as strconv from "@goscript/strconv/index.js"

import * as strings from "@goscript/strings/index.js"

import "@goscript/unsafe/index.js"

import * as __goscript_encoding_table from "./encoding_table.gs.ts"
import "@goscript/bytes/index.js"
import "@goscript/errors/index.js"
import "@goscript/fmt/index.js"
import "@goscript/internal/godebug/index.js"
import "@goscript/net/netip/index.js"
import "@goscript/path/index.js"
import "@goscript/slices/index.js"
import "@goscript/strconv/index.js"
import "@goscript/strings/index.js"
import "./encoding_table.gs.ts"

$.registerTypePackagePath("net/url", ["url.Error", "url.EscapeError", "url.InvalidHostError", "url.URL", "url.Userinfo", "url.Values"])

export type EscapeError = string

$.registerNamedValueType(
	"url.EscapeError",
	{Error: (receiver: any, ...args: any[]) => (EscapeError_Error as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*url.EscapeError",
	{Error: (receiver: any, ...args: any[]) => (EscapeError_Error as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type InvalidHostError = string

$.registerNamedValueType(
	"url.InvalidHostError",
	{Error: (receiver: any, ...args: any[]) => (InvalidHostError_Error as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*url.InvalidHostError",
	{Error: (receiver: any, ...args: any[]) => (InvalidHostError_Error as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type Values = globalThis.Map<string, $.Slice<string>> | null

$.registerNamedType("url.Values", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"))));

$.registerNamedValueType(
	"url.Values",
	{Add: (receiver: any, ...args: any[]) => (Values_Add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Clone: (receiver: any, ...args: any[]) => (Values_Clone as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Del: (receiver: any, ...args: any[]) => (Values_Del as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Encode: (receiver: any, ...args: any[]) => (Values_Encode as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Get: (receiver: any, ...args: any[]) => (Values_Get as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Has: (receiver: any, ...args: any[]) => (Values_Has as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Set: (receiver: any, ...args: any[]) => (Values_Set as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["key", /* @__PURE__ */ $.basicType("string")], ["value", /* @__PURE__ */ $.basicType("string")]]), $.methodSignature("Clone", [], ["url.Values"]), $.methodSignature("Del", [["key", /* @__PURE__ */ $.basicType("string")]]), $.methodSignature("Encode", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Get", [["key", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Has", [["key", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Set", [["key", /* @__PURE__ */ $.basicType("string")], ["value", /* @__PURE__ */ $.basicType("string")]])]
);

$.registerNamedValueType(
	"*url.Values",
	{Add: (receiver: any, ...args: any[]) => (Values_Add as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Clone: (receiver: any, ...args: any[]) => (Values_Clone as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Del: (receiver: any, ...args: any[]) => (Values_Del as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Encode: (receiver: any, ...args: any[]) => (Values_Encode as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Get: (receiver: any, ...args: any[]) => (Values_Get as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Has: (receiver: any, ...args: any[]) => (Values_Has as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Set: (receiver: any, ...args: any[]) => (Values_Set as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["key", /* @__PURE__ */ $.basicType("string")], ["value", /* @__PURE__ */ $.basicType("string")]]), $.methodSignature("Clone", [], ["url.Values"]), $.methodSignature("Del", [["key", /* @__PURE__ */ $.basicType("string")]]), $.methodSignature("Encode", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Get", [["key", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Has", [["key", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Set", [["key", /* @__PURE__ */ $.basicType("string")], ["value", /* @__PURE__ */ $.basicType("string")]])]
);

export class Error {
	public declare Op: string

	public declare URL: string

	public declare Err: $.GoError

	constructor(init?: Partial<{Op?: string, URL?: string, Err?: $.GoError}>, __goscriptValue?: boolean) {
		this.Op = init?.Op ?? ("" as string)
		this.URL = init?.URL ?? ("" as string)
		this.Err = init?.Err ?? (null! as $.GoError)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Error {
		return new Error(this, true)
	}

	public __goscriptAssign(source: Error): this {
		this.Op = source.Op
		this.URL = source.URL
		this.Err = $.assignFieldValue(this.Err, source.Err, "error")
		return this
	}

	public async Error(): globalThis.Promise<string> {
		const e: Error | $.VarRef<Error> | null = this;
		const e$: Error = e == null ? $.pointerTarget<Error>(e) : (e as any).__isVarRef === true ? (e as any).value : (e as any).__goValue === undefined ? (e as any) : $.pointerTarget<Error>(e)
		return fmt.Sprintf("%s %q: %s", (e$ as Error).Op, (e$ as Error).URL, ((e$ as Error).Err as any))
	}

	public async Temporary(): globalThis.Promise<boolean> {
		const e: Error | $.VarRef<Error> | null = this;
		let [t, ok] = $.typeAssertTuple<any>($.pointerValue<Error>(e).Err, { kind: $.TypeKind.Interface, methods: [{ name: "Temporary", args: [], returns: [{ name: "_r0", type: /* @__PURE__ */ $.basicType("bool") }] }] })
		return ok && (__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as any) : $.pointerValue<any>(t)).Temporary(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	}

	public async Timeout(): globalThis.Promise<boolean> {
		const e: Error | $.VarRef<Error> | null = this;
		let [t, ok] = $.typeAssertTuple<any>($.pointerValue<Error>(e).Err, { kind: $.TypeKind.Interface, methods: [{ name: "Timeout", args: [], returns: [{ name: "_r0", type: /* @__PURE__ */ $.basicType("bool") }] }] })
		return ok && (__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as any) : $.pointerValue<any>(t)).Timeout(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	}

	public Unwrap(): $.GoError {
		const e: Error | $.VarRef<Error> | null = this;
		return $.pointerValue<Error>(e).Err
	}

	static __typeInfo = $.registerStructType(
		"url.Error",
		() => new Error(),
		() => [{ name: "Error", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Temporary", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "Timeout", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "Unwrap", args: [], returns: [{ type: "error" }], pointerReceiver: true }],
		Error,
		() => [{ name: "Op", key: "Op", type: /* @__PURE__ */ $.basicType("string") }, { name: "URL", key: "URL", type: /* @__PURE__ */ $.basicType("string") }, { name: "Err", key: "Err", type: "error" }]
	)
}

export class URL {
	public declare Scheme: string

	public declare Opaque: string

	public declare User: Userinfo | $.VarRef<Userinfo> | null

	public declare Host: string

	public declare Path: string

	public declare Fragment: string

	// RawQuery contains the encoded query values, without the initial '?'.
	// Use URL.Query to decode the query.
	public declare RawQuery: string

	// RawPath is an optional field containing an encoded path hint.
	// See the EscapedPath method for more details.
	//
	// In general, code should call EscapedPath instead of reading RawPath.
	public declare RawPath: string

	// RawFragment is an optional field containing an encoded fragment hint.
	// See the EscapedFragment method for more details.
	//
	// In general, code should call EscapedFragment instead of reading RawFragment.
	public declare RawFragment: string

	// ForceQuery indicates whether the original URL contained a query ('?') character.
	// When set, the String method will include a trailing '?', even when RawQuery is empty.
	public declare ForceQuery: boolean

	// OmitHost indicates the URL has an empty host (authority).
	// When set, the String method will not include the host when it is empty.
	public declare OmitHost: boolean

	constructor(init?: Partial<{Scheme?: string, Opaque?: string, User?: Userinfo | $.VarRef<Userinfo> | null, Host?: string, Path?: string, Fragment?: string, RawQuery?: string, RawPath?: string, RawFragment?: string, ForceQuery?: boolean, OmitHost?: boolean}>, __goscriptValue?: boolean) {
		this.Scheme = init?.Scheme ?? ("" as string)
		this.Opaque = init?.Opaque ?? ("" as string)
		this.User = init?.User ?? (null! as Userinfo | $.VarRef<Userinfo> | null)
		this.Host = init?.Host ?? ("" as string)
		this.Path = init?.Path ?? ("" as string)
		this.Fragment = init?.Fragment ?? ("" as string)
		this.RawQuery = init?.RawQuery ?? ("" as string)
		this.RawPath = init?.RawPath ?? ("" as string)
		this.RawFragment = init?.RawFragment ?? ("" as string)
		this.ForceQuery = init?.ForceQuery ?? (false as boolean)
		this.OmitHost = init?.OmitHost ?? (false as boolean)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): URL {
		return new URL(this, true)
	}

	public __goscriptAssign(source: URL): this {
		this.Scheme = source.Scheme
		this.Opaque = source.Opaque
		this.User = source.User
		this.Host = source.Host
		this.Path = source.Path
		this.Fragment = source.Fragment
		this.RawQuery = source.RawQuery
		this.RawPath = source.RawPath
		this.RawFragment = source.RawFragment
		this.ForceQuery = source.ForceQuery
		this.OmitHost = source.OmitHost
		return this
	}

	public AppendBinary(b: $.Slice<number>): [$.Slice<number>, $.GoError] {
		const u: URL | $.VarRef<URL> | null = this;
		return [$.appendSlice(b, $.stringToBytes((u !== null && (u as any).__isVarRef !== true && (u as any).__goValue === undefined ? ((u as any) as URL).String() : URL.prototype.String.call(u))), $.byteSliceHint), null]
	}

	public Clone(): URL | $.VarRef<URL> | null {
		const u: URL | $.VarRef<URL> | null = this;
		const u$: URL = u == null ? $.pointerTarget<URL>(u) : (u as any).__isVarRef === true ? (u as any).value : (u as any).__goValue === undefined ? (u as any) : $.pointerTarget<URL>(u)
		if (u == null) {
			return null
		}

		let uc = $.varRef<URL>(((u$ as URL)).clone())
		if ((u$ as URL).User != null) {
			$.pointerValue<URL>(uc).User = $.varRef<Userinfo>(($.pointerValue<Userinfo>((u$ as URL).User)).clone())
		}
		return uc
	}

	public EscapedFragment(): string {
		const u: URL | $.VarRef<URL> | null = this;
		const u$: URL = u == null ? $.pointerTarget<URL>(u) : (u as any).__isVarRef === true ? (u as any).value : (u as any).__goValue === undefined ? (u as any) : $.pointerTarget<URL>(u)
		if ((!$.stringEqual((u$ as URL).RawFragment, "")) && validEncoded((u$ as URL).RawFragment, 64)) {
			let [f, err] = unescape((u$ as URL).RawFragment, 64)
			if ((err == null) && ($.stringEqual(f, (u$ as URL).Fragment))) {
				return (u$ as URL).RawFragment
			}
		}
		return escape((u$ as URL).Fragment, 64)
	}

	public EscapedPath(): string {
		const u: URL | $.VarRef<URL> | null = this;
		const u$: URL = u == null ? $.pointerTarget<URL>(u) : (u as any).__isVarRef === true ? (u as any).value : (u as any).__goValue === undefined ? (u as any) : $.pointerTarget<URL>(u)
		if ((!$.stringEqual((u$ as URL).RawPath, "")) && validEncoded((u$ as URL).RawPath, 1)) {
			let [p, err] = unescape((u$ as URL).RawPath, 1)
			if ((err == null) && ($.stringEqual(p, (u$ as URL).Path))) {
				return (u$ as URL).RawPath
			}
		}
		if ($.stringEqual((u$ as URL).Path, "*")) {
			return "*"
		}
		return escape((u$ as URL).Path, 1)
	}

	public Hostname(): string {
		const u: URL | $.VarRef<URL> | null = this;
		let [host, ] = splitHostPort($.pointerValue<URL>(u).Host)
		return host
	}

	public IsAbs(): boolean {
		const u: URL | $.VarRef<URL> | null = this;
		return !$.stringEqual($.pointerValue<URL>(u).Scheme, "")
	}

	public JoinPath(elem: $.Slice<string>): URL | $.VarRef<URL> | null {
		const u: URL | $.VarRef<URL> | null = this;
		let __goscriptTuple0: any = (u !== null && (u as any).__isVarRef !== true && (u as any).__goValue === undefined ? ((u as any) as URL).joinPath(elem) : URL.prototype.joinPath.call(u, elem))
		let url: URL | $.VarRef<URL> | null = __goscriptTuple0[0]
		return url
	}

	public MarshalBinary(): [$.Slice<number>, $.GoError] {
		const u: URL | $.VarRef<URL> | null = this;
		let text: $.Slice<number> = null! as $.Slice<number>
		let err: $.GoError = null! as $.GoError
		return (u !== null && (u as any).__isVarRef !== true && (u as any).__goValue === undefined ? ((u as any) as URL).AppendBinary(null) : URL.prototype.AppendBinary.call(u, null))
	}

	public Parse(ref: string): [URL | $.VarRef<URL> | null, $.GoError] {
		const u: URL | $.VarRef<URL> | null = this;
		let __goscriptTuple1: any = Parse(ref)
		let refURL: URL | $.VarRef<URL> | null = __goscriptTuple1[0]
		let err = __goscriptTuple1[1]
		if (err != null) {
			return [null, err]
		}
		return [(u !== null && (u as any).__isVarRef !== true && (u as any).__goValue === undefined ? ((u as any) as URL).ResolveReference(refURL) : URL.prototype.ResolveReference.call(u, refURL)), null]
	}

	public Port(): string {
		const u: URL | $.VarRef<URL> | null = this;
		let [, port] = splitHostPort($.pointerValue<URL>(u).Host)
		return port
	}

	public Query(): Values {
		const u: URL | $.VarRef<URL> | null = this;
		let __goscriptTuple2: any = ParseQuery($.pointerValue<URL>(u).RawQuery)
		let v: Values = __goscriptTuple2[0]
		return v
	}

	public Redacted(): string {
		const u: URL | $.VarRef<URL> | null = this;
		if (u == null) {
			return ""
		}

		let ru = $.varRef(($.pointerValue<URL>(u)).clone())
		{
			let [, has] = Userinfo.prototype.Password.call(ru.value.User)
			if (has) {
				ru.value.User = UserPassword(Userinfo.prototype.Username.call(ru.value.User), "xxxxx")
			}
		}
		return ru.value.String()
	}

	public RequestURI(): string {
		const u: URL | $.VarRef<URL> | null = this;
		const u$: URL = u == null ? $.pointerTarget<URL>(u) : (u as any).__isVarRef === true ? (u as any).value : (u as any).__goValue === undefined ? (u as any) : $.pointerTarget<URL>(u)
		let result = (u$ as URL).Opaque
		if ($.stringEqual(result, "")) {
			result = (u !== null && (u as any).__isVarRef !== true && (u as any).__goValue === undefined ? ((u as any) as URL).EscapedPath() : URL.prototype.EscapedPath.call(u))
			if ($.stringEqual(result, "")) {
				result = "/"
			}
		} else {
			if (strings.HasPrefix(result, "//")) {
				result = (u$ as URL).Scheme + ":" + result
			}
		}
		if ((u$ as URL).ForceQuery || (!$.stringEqual((u$ as URL).RawQuery, ""))) {
			result += "?" + (u$ as URL).RawQuery
		}
		return result
	}

	public ResolveReference(ref: URL | $.VarRef<URL> | null): URL | $.VarRef<URL> | null {
		const u: URL | $.VarRef<URL> | null = this;
		const u$: URL = u == null ? $.pointerTarget<URL>(u) : (u as any).__isVarRef === true ? (u as any).value : (u as any).__goValue === undefined ? (u as any) : $.pointerTarget<URL>(u)
		const ref$: URL = ref == null ? $.pointerTarget<URL>(ref) : (ref as any).__isVarRef === true ? (ref as any).value : (ref as any).__goValue === undefined ? (ref as any) : $.pointerTarget<URL>(ref)
		let url = $.varRef(((ref$ as URL)).clone())
		if ($.stringEqual((ref$ as URL).Scheme, "")) {
			url.value.Scheme = (u$ as URL).Scheme
		}
		if (((!$.stringEqual((ref$ as URL).Scheme, "")) || (!$.stringEqual((ref$ as URL).Host, ""))) || ((ref$ as URL).User != null)) {
			// The "absoluteURI" or "net_path" cases.
			// We can ignore the error from setPath since we know we provided a
			// validly-escaped path.
			url.value.setPath(resolvePath((ref !== null && (ref as any).__isVarRef !== true && (ref as any).__goValue === undefined ? ((ref as any) as URL).EscapedPath() : URL.prototype.EscapedPath.call(ref)), ""))
			return url
		}
		if (!$.stringEqual((ref$ as URL).Opaque, "")) {
			url.value.User = null
			url.value.Host = ""
			url.value.Path = ""
			return url
		}
		if ((($.stringEqual((ref$ as URL).Path, "")) && !(ref$ as URL).ForceQuery) && ($.stringEqual((ref$ as URL).RawQuery, ""))) {
			url.value.RawQuery = (u$ as URL).RawQuery
			if ($.stringEqual((ref$ as URL).Fragment, "")) {
				url.value.Fragment = (u$ as URL).Fragment
				url.value.RawFragment = (u$ as URL).RawFragment
			}
		}
		if (($.stringEqual((ref$ as URL).Path, "")) && (!$.stringEqual((u$ as URL).Opaque, ""))) {
			url.value.Opaque = (u$ as URL).Opaque
			url.value.User = null
			url.value.Host = ""
			url.value.Path = ""
			return url
		}
		// The "abs_path" or "rel_path" cases.
		url.value.Host = (u$ as URL).Host
		url.value.User = (u$ as URL).User
		url.value.setPath(resolvePath((u !== null && (u as any).__isVarRef !== true && (u as any).__goValue === undefined ? ((u as any) as URL).EscapedPath() : URL.prototype.EscapedPath.call(u)), (ref !== null && (ref as any).__isVarRef !== true && (ref as any).__goValue === undefined ? ((ref as any) as URL).EscapedPath() : URL.prototype.EscapedPath.call(ref))))
		return url
	}

	public String(): string {
		const u: URL | $.VarRef<URL> | null = this;
		const u$: URL = u == null ? $.pointerTarget<URL>(u) : (u as any).__isVarRef === true ? (u as any).value : (u as any).__goValue === undefined ? (u as any) : $.pointerTarget<URL>(u)
		let buf: $.VarRef<strings.Builder> = $.varRef($.markAsStructValue(new strings.Builder()))

		let n = $.stringLen((u$ as URL).Scheme)
		if (!$.stringEqual((u$ as URL).Opaque, "")) {
			n += $.stringLen((u$ as URL).Opaque)
		} else {
			if (!(u$ as URL).OmitHost && (((!$.stringEqual((u$ as URL).Scheme, "")) || (!$.stringEqual((u$ as URL).Host, ""))) || ((u$ as URL).User != null))) {
				let username = Userinfo.prototype.Username.call((u$ as URL).User)
				let [password, ] = Userinfo.prototype.Password.call((u$ as URL).User)
				n += ($.stringLen(username) + $.stringLen(password)) + $.stringLen((u$ as URL).Host)
			}
			n += $.stringLen((u$ as URL).Path)
		}
		n += $.stringLen((u$ as URL).RawQuery) + $.stringLen((u$ as URL).RawFragment)
		n += 12
		buf.value.Grow(n)

		if (!$.stringEqual((u$ as URL).Scheme, "")) {
			buf.value.WriteString((u$ as URL).Scheme)
			buf.value.WriteByte(58)
		}
		if (!$.stringEqual((u$ as URL).Opaque, "")) {
			buf.value.WriteString((u$ as URL).Opaque)
		} else {
			if (((!$.stringEqual((u$ as URL).Scheme, "")) || (!$.stringEqual((u$ as URL).Host, ""))) || ((u$ as URL).User != null)) {
				if (((u$ as URL).OmitHost && ($.stringEqual((u$ as URL).Host, ""))) && ((u$ as URL).User == null)) {
				} else {
					if (((!$.stringEqual((u$ as URL).Host, "")) || (!$.stringEqual((u$ as URL).Path, ""))) || ((u$ as URL).User != null)) {
						buf.value.WriteString("//")
					}
					{
						let ui = (u$ as URL).User
						if (ui != null) {
							buf.value.WriteString((ui !== null && (ui as any).__isVarRef !== true && (ui as any).__goValue === undefined ? ((ui as any) as Userinfo).String() : Userinfo.prototype.String.call(ui)))
							buf.value.WriteByte(64)
						}
					}
					{
						let h = (u$ as URL).Host
						if (!$.stringEqual(h, "")) {
							buf.value.WriteString(escape(h, 4))
						}
					}
				}
			}
			let __goscriptShadow0 = (u !== null && (u as any).__isVarRef !== true && (u as any).__goValue === undefined ? ((u as any) as URL).EscapedPath() : URL.prototype.EscapedPath.call(u))
			if ((((u$ as URL).OmitHost && ($.stringEqual((u$ as URL).Host, ""))) && ((u$ as URL).User == null)) && strings.HasPrefix(__goscriptShadow0, "//")) {
				// Escape the first / in a path starting with "//" and no authority
				// so that re-parsing the URL doesn't turn the path into an authority
				// (e.g., Path="//host/p" producing "http://host/p").
				buf.value.WriteString("%2F")
				__goscriptShadow0 = $.sliceStringOrBytes(__goscriptShadow0, 1, undefined)
			}
			if (((!$.stringEqual(__goscriptShadow0, "")) && ($.indexString(__goscriptShadow0, 0) != 47)) && (!$.stringEqual((u$ as URL).Host, ""))) {
				buf.value.WriteByte(47)
			}
			if (buf.value.Len() == 0) {
				// RFC 3986 §4.2
				// A path segment that contains a colon character (e.g., "this:that")
				// cannot be used as the first segment of a relative-path reference, as
				// it would be mistaken for a scheme name. Such a segment must be
				// preceded by a dot-segment (e.g., "./this:that") to make a relative-
				// path reference.
				{
					let [segment, , ] = strings.Cut(__goscriptShadow0, "/")
					if (strings.Contains(segment, ":")) {
						buf.value.WriteString("./")
					}
				}
			}
			buf.value.WriteString(__goscriptShadow0)
		}
		if ((u$ as URL).ForceQuery || (!$.stringEqual((u$ as URL).RawQuery, ""))) {
			buf.value.WriteByte(63)
			buf.value.WriteString((u$ as URL).RawQuery)
		}
		if (!$.stringEqual((u$ as URL).Fragment, "")) {
			buf.value.WriteByte(35)
			buf.value.WriteString((u !== null && (u as any).__isVarRef !== true && (u as any).__goValue === undefined ? ((u as any) as URL).EscapedFragment() : URL.prototype.EscapedFragment.call(u)))
		}
		return buf.value.String()
	}

	public UnmarshalBinary(text: $.Slice<number>): $.GoError {
		let u: URL | $.VarRef<URL> | null = this;
		let __goscriptTuple3: any = Parse($.bytesToString(text))
		let u1: URL | $.VarRef<URL> | null = __goscriptTuple3[0]
		let err = __goscriptTuple3[1]
		if (err != null) {
			return err
		}
		$.pointerValue<URL>(u).__goscriptAssign($.pointerValue<URL>(u1))
		return null
	}

	public joinPath(elem: $.Slice<string>): [URL | $.VarRef<URL> | null, $.GoError] {
		const u: URL | $.VarRef<URL> | null = this;
		elem = $.appendSlice($.arrayToSlice<string>([(u !== null && (u as any).__isVarRef !== true && (u as any).__goValue === undefined ? ((u as any) as URL).EscapedPath() : URL.prototype.EscapedPath.call(u))]), elem)
		let p: string = ""
		if (!strings.HasPrefix($.arrayIndex(elem!, 0), "/")) {
			// Return a relative path if u is relative,
			// but ensure that it contains no ../ elements.
			$.sliceElems(elem!)[$.sliceSlot(elem!, 0)] = "/" + $.arrayIndex(elem!, 0)
			p = $.sliceStringOrBytes(path2.Join(...(elem ?? [])), 1, undefined)
		} else {
			p = path2.Join(...(elem ?? []))
		}
		// path.Join will remove any trailing slashes.
		// Preserve at least one.
		if (strings.HasSuffix($.arrayIndex(elem!, $.sliceLen(elem) - 1), "/") && !strings.HasSuffix(p, "/")) {
			p += "/"
		}
		let url = $.varRef(($.pointerValue<URL>(u)).clone())
		let err = url.value.setPath(p)
		return [url, err]
	}

	public setFragment(f: string): $.GoError {
		let u: URL | $.VarRef<URL> | null = this;
		const u$: URL = u == null ? $.pointerTarget<URL>(u) : (u as any).__isVarRef === true ? (u as any).value : (u as any).__goValue === undefined ? (u as any) : $.pointerTarget<URL>(u)
		let [frag, err] = unescape(f, 64)
		if (err != null) {
			return err
		}
		;(u$ as URL).Fragment = frag
		{
			let escf = escape(frag, 64)
			if ($.stringEqual(f, escf)) {
				// Default encoding is fine.
				;(u$ as URL).RawFragment = ""
			} else {
				;(u$ as URL).RawFragment = f
			}
		}
		return null
	}

	public setPath(p: string): $.GoError {
		let u: URL | $.VarRef<URL> | null = this;
		const u$: URL = u == null ? $.pointerTarget<URL>(u) : (u as any).__isVarRef === true ? (u as any).value : (u as any).__goValue === undefined ? (u as any) : $.pointerTarget<URL>(u)
		let [__goscriptShadow1, err] = unescape(p, 1)
		if (err != null) {
			return err
		}
		;(u$ as URL).Path = __goscriptShadow1
		{
			let escp = escape(__goscriptShadow1, 1)
			if ($.stringEqual(p, escp)) {
				// Default encoding is fine.
				;(u$ as URL).RawPath = ""
			} else {
				;(u$ as URL).RawPath = p
			}
		}
		return null
	}

	static __typeInfo = $.registerStructType(
		"url.URL",
		() => new URL(),
		() => [{ name: "AppendBinary", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }], pointerReceiver: true }, { name: "Clone", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("url.URL") }], pointerReceiver: true }, { name: "EscapedFragment", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "EscapedPath", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Hostname", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "IsAbs", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "JoinPath", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("url.URL") }], pointerReceiver: true }, { name: "MarshalBinary", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }], pointerReceiver: true }, { name: "Parse", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("url.URL") }, { type: "error" }], pointerReceiver: true }, { name: "Port", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Query", args: [], returns: [{ type: "url.Values" }], pointerReceiver: true }, { name: "Redacted", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "RequestURI", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "ResolveReference", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("url.URL") }], pointerReceiver: true }, { name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "UnmarshalBinary", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }], pointerReceiver: true }, { name: "joinPath", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("url.URL") }, { type: "error" }], pointerReceiver: true }, { name: "setFragment", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }], pointerReceiver: true }, { name: "setPath", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }], pointerReceiver: true }],
		URL,
		() => [{ name: "Scheme", key: "Scheme", type: /* @__PURE__ */ $.basicType("string") }, { name: "Opaque", key: "Opaque", type: /* @__PURE__ */ $.basicType("string") }, { name: "User", key: "User", type: /* @__PURE__ */ $.pointerType("url.Userinfo") }, { name: "Host", key: "Host", type: /* @__PURE__ */ $.basicType("string") }, { name: "Path", key: "Path", type: /* @__PURE__ */ $.basicType("string") }, { name: "Fragment", key: "Fragment", type: /* @__PURE__ */ $.basicType("string") }, { name: "RawQuery", key: "RawQuery", type: /* @__PURE__ */ $.basicType("string") }, { name: "RawPath", key: "RawPath", type: /* @__PURE__ */ $.basicType("string") }, { name: "RawFragment", key: "RawFragment", type: /* @__PURE__ */ $.basicType("string") }, { name: "ForceQuery", key: "ForceQuery", type: /* @__PURE__ */ $.basicType("bool") }, { name: "OmitHost", key: "OmitHost", type: /* @__PURE__ */ $.basicType("bool") }]
	)
}

export class Userinfo {
	public declare username: string

	public declare password: string

	public declare passwordSet: boolean

	constructor(init?: Partial<{username?: string, password?: string, passwordSet?: boolean}>, __goscriptValue?: boolean) {
		this.username = init?.username ?? ("" as string)
		this.password = init?.password ?? ("" as string)
		this.passwordSet = init?.passwordSet ?? (false as boolean)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Userinfo {
		return new Userinfo(this, true)
	}

	public __goscriptAssign(source: Userinfo): this {
		this.username = source.username
		this.password = source.password
		this.passwordSet = source.passwordSet
		return this
	}

	public Password(): [string, boolean] {
		const u: Userinfo | $.VarRef<Userinfo> | null = this;
		const u$: Userinfo = u == null ? $.pointerTarget<Userinfo>(u) : (u as any).__isVarRef === true ? (u as any).value : (u as any).__goValue === undefined ? (u as any) : $.pointerTarget<Userinfo>(u)
		if (u == null) {
			return ["", false]
		}
		return [(u$ as Userinfo).password, (u$ as Userinfo).passwordSet]
	}

	public String(): string {
		const u: Userinfo | $.VarRef<Userinfo> | null = this;
		const u$: Userinfo = u == null ? $.pointerTarget<Userinfo>(u) : (u as any).__isVarRef === true ? (u as any).value : (u as any).__goValue === undefined ? (u as any) : $.pointerTarget<Userinfo>(u)
		if (u == null) {
			return ""
		}
		let s = escape((u$ as Userinfo).username, 16)
		if ((u$ as Userinfo).passwordSet) {
			s += ":" + escape((u$ as Userinfo).password, 16)
		}
		return s
	}

	public Username(): string {
		const u: Userinfo | $.VarRef<Userinfo> | null = this;
		if (u == null) {
			return ""
		}
		return $.pointerValue<Userinfo>(u).username
	}

	static __typeInfo = $.registerStructType(
		"url.Userinfo",
		() => new Userinfo(),
		() => [{ name: "Password", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }, { type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Username", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		Userinfo,
		() => [{ name: "username", key: "username", type: /* @__PURE__ */ $.basicType("string") }, { name: "password", key: "password", type: /* @__PURE__ */ $.basicType("string") }, { name: "passwordSet", key: "passwordSet", type: /* @__PURE__ */ $.basicType("bool") }]
	)
}

export const upperhex: string = "0123456789ABCDEF"

export const defaultMaxParams: number = 10000

export let urlstrictcolons: godebug.Setting | $.VarRef<godebug.Setting> | null = godebug.New("urlstrictcolons")

export function __goscript_set_urlstrictcolons(__goscriptValue: godebug.Setting | $.VarRef<godebug.Setting> | null): void {
	urlstrictcolons = __goscriptValue
}

export function ishex(c: number): boolean {
	return $.uint(($.arrayIndex(__goscript_encoding_table.table, c) & 128), 8) != 0
}

export function unhex(c: number): number {
	return $.uint((((9 * ($.uintShr(c, 6, 8))) + (c & 15)) & 0xff), 8)
}

export function EscapeError_Error(e: EscapeError): string {
	return "invalid URL escape " + strconv.Quote(e)
}

export function InvalidHostError_Error(e: InvalidHostError): string {
	return "invalid character " + strconv.Quote(e) + " in host name"
}

export function shouldEscape(c: number, mode: __goscript_encoding_table.encoding): boolean {
	return $.uint(($.arrayIndex(__goscript_encoding_table.table, c) & mode), 8) == 0
}

export function QueryUnescape(s: string): [string, $.GoError] {
	return unescape(s, 32)
}

export function PathUnescape(s: string): [string, $.GoError] {
	return unescape(s, 2)
}

export function unescape(s: string, mode: __goscript_encoding_table.encoding): [string, $.GoError] {
	// Count %, check that they're well-formed.
	let n = 0
	let hasPlus = false
	for (let i = 0; i < $.stringLen(s); ) {
		switch ($.indexString(s, i)) {
			case 37:
			{
				n++
				if ((((i + 2) >= $.stringLen(s)) || !ishex($.indexString(s, i + 1))) || !ishex($.indexString(s, i + 2))) {
					s = $.sliceStringOrBytes(s, i, undefined)
					if ($.stringLen(s) > 3) {
						s = $.sliceStringOrBytes(s, undefined, 3)
					}
					return ["", $.namedValueInterfaceValue<$.GoError>(s, "url.EscapeError", {"Error": EscapeError_Error}, /* @__PURE__ */ $.basicType("string", "url.EscapeError"))]
				}
				// Per https://tools.ietf.org/html/rfc3986#page-21
				// in the host component %-encoding can only be used
				// for non-ASCII bytes.
				// But https://tools.ietf.org/html/rfc6874#section-2
				// introduces %25 being allowed to escape a percent sign
				// in IPv6 scoped-address literals. Yay.
				if (((mode == 4) && (unhex($.indexString(s, i + 1)) < 8)) && (!$.stringEqual($.sliceStringOrBytes(s, i, i + 3), "%25"))) {
					return ["", $.namedValueInterfaceValue<$.GoError>($.sliceStringOrBytes(s, i, i + 3), "url.EscapeError", {"Error": EscapeError_Error}, /* @__PURE__ */ $.basicType("string", "url.EscapeError"))]
				}
				if (mode == 8) {
					// RFC 6874 says basically "anything goes" for zone identifiers
					// and that even non-ASCII can be redundantly escaped,
					// but it seems prudent to restrict %-escaped bytes here to those
					// that are valid host name bytes in their unescaped form.
					// That is, you can use escaping in the zone identifier but not
					// to introduce bytes you couldn't just write directly.
					// But Windows puts spaces here! Yay.
					let v = $.uint((((unhex($.indexString(s, i + 1)) << 4) & 0xff)) | unhex($.indexString(s, i + 2)), 8)
					if (((!$.stringEqual($.sliceStringOrBytes(s, i, i + 3), "%25")) && (v != 32)) && shouldEscape(v, 4)) {
						return ["", $.namedValueInterfaceValue<$.GoError>($.sliceStringOrBytes(s, i, i + 3), "url.EscapeError", {"Error": EscapeError_Error}, /* @__PURE__ */ $.basicType("string", "url.EscapeError"))]
					}
				}
				i += 3
				break
			}
			case 43:
			{
				hasPlus = mode == 32
				i++
				break
			}
			default:
			{
				if ((((mode == 4) || (mode == 8)) && ($.indexString(s, i) < 0x80)) && shouldEscape($.indexString(s, i), mode)) {
					return ["", $.namedValueInterfaceValue<$.GoError>($.sliceStringOrBytes(s, i, i + 1), "url.InvalidHostError", {"Error": InvalidHostError_Error}, /* @__PURE__ */ $.basicType("string", "url.InvalidHostError"))]
				}
				i++
				break
			}
		}
	}

	if ((n == 0) && !hasPlus) {
		return [s, null]
	}

	let unescapedPlusSign: number = 0
	switch (mode) {
		case 32:
		{
			unescapedPlusSign = 32
			break
		}
		default:
		{
			unescapedPlusSign = 43
			break
		}
	}
	let t: $.VarRef<strings.Builder> = $.varRef($.markAsStructValue(new strings.Builder()))
	t.value.Grow($.stringLen(s) - (2 * n))
	for (let i = 0; i < $.stringLen(s); i++) {
		switch ($.indexString(s, i)) {
			case 37:
			{
				t.value.WriteByte($.uint((((unhex($.indexString(s, i + 1)) << 4) & 0xff)) | unhex($.indexString(s, i + 2)), 8))
				i += 2
				break
			}
			case 43:
			{
				t.value.WriteByte(unescapedPlusSign)
				break
			}
			default:
			{
				t.value.WriteByte($.indexString(s, i))
				break
			}
		}
	}
	return [t.value.String(), null]
}

export function QueryEscape(s: string): string {
	return escape(s, 32)
}

export function PathEscape(s: string): string {
	return escape(s, 2)
}

export function escape(s: string, mode: __goscript_encoding_table.encoding): string {
	let spaceCount = 0
	let hexCount = 0
	for (let __goscriptRangeTarget0 = $.stringToBytes(s), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let c = $.uint((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as number), 8)
		if (shouldEscape(c, mode)) {
			if ((c == 32) && (mode == 32)) {
				spaceCount++
			} else {
				hexCount++
			}
		}
	}

	if ((spaceCount == 0) && (hexCount == 0)) {
		return s
	}

	let buf: Uint8Array = $.arrayValue(new Uint8Array(64))
	let t: $.Slice<number> = null! as $.Slice<number>

	let required = $.stringLen(s) + (2 * hexCount)
	if (required <= 64) {
		t = $.goSlice(buf, undefined, required)
	} else {
		t = $.makeSlice<number>(required, undefined, "byte")
	}

	if (hexCount == 0) {
		$.copy(t, s)
		for (let __goscriptSliceWindow0 = $.sliceRange(t), i = 0; i < $.stringLen(s); i++) {
			if ($.indexString(s, i) == 32) {
				;(__goscriptSliceWindow0.backing as any[])[$.windowSlot(__goscriptSliceWindow0, i)] = 43
			}
		}
		return $.bytesToString(t)
	}

	let j = 0
	for (let __goscriptRangeTarget1 = $.stringToBytes(s), __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __goscriptSliceWindow1 = $.sliceRange(t), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let c = $.uint((__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as number), 8)
		switch ((true as boolean)) {
			case (c == 32) && (mode == 32):
			{
				;(__goscriptSliceWindow1.backing as any[])[$.windowSlot(__goscriptSliceWindow1, j)] = 43
				j++
				break
			}
			case shouldEscape(c, mode):
			{
				;(__goscriptSliceWindow1.backing as any[])[$.windowSlot(__goscriptSliceWindow1, j)] = 37;
				;(__goscriptSliceWindow1.backing as any[])[$.windowSlot(__goscriptSliceWindow1, j + 1)] = $.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x41\x42\x43\x44\x45\x46", $.uintShr(c, 4, 8));
				;(__goscriptSliceWindow1.backing as any[])[$.windowSlot(__goscriptSliceWindow1, j + 2)] = $.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x41\x42\x43\x44\x45\x46", c & 15)
				j += 3
				break
			}
			default:
			{
				;(__goscriptSliceWindow1.backing as any[])[$.windowSlot(__goscriptSliceWindow1, j)] = c
				j++
				break
			}
		}
	}
	return $.bytesToString(t)
}

export function User(username: string): Userinfo | $.VarRef<Userinfo> | null {
	return new Userinfo({username: username, password: "", passwordSet: false})
}

export function UserPassword(username: string, password: string): Userinfo | $.VarRef<Userinfo> | null {
	return new Userinfo({username: username, password: password, passwordSet: true})
}

export function getScheme(rawURL: string): [string, string, $.GoError] {
	let scheme: string = ""
	let path: string = ""
	let err: $.GoError = null! as $.GoError
	for (let i = 0; i < $.stringLen(rawURL); i++) {
		let c = $.indexString(rawURL, i)
		switch ((true as boolean)) {
			case ((97 <= c) && (c <= 122)) || ((65 <= c) && (c <= 90)):
			{
				break
			}
			case ((((48 <= c) && (c <= 57)) || (c == 43)) || (c == 45)) || (c == 46):
			{
				if (i == 0) {
					return ["", rawURL, null]
				}
				break
			}
			case c == 58:
			{
				if (i == 0) {
					return ["", "", errors.New("missing protocol scheme")]
				}
				return [$.sliceStringOrBytes(rawURL, undefined, i), $.sliceStringOrBytes(rawURL, i + 1, undefined), null]
				break
			}
			default:
			{
				return ["", rawURL, null]
				break
			}
		}
	}
	return ["", rawURL, null]
}

export function Parse(rawURL: string): [URL | $.VarRef<URL> | null, $.GoError] {
	// Cut off #frag
	let [u, frag, ] = strings.Cut(rawURL, "#")
	let __goscriptTuple4: any = parse(u, false)
	let url: URL | $.VarRef<URL> | null = __goscriptTuple4[0]
	let err = __goscriptTuple4[1]
	if (err != null) {
		return [null, $.interfaceValue<$.GoError>(new Error({Op: "parse", URL: u, Err: err}), "*url.Error", /* @__PURE__ */ $.pointerType("url.Error"))]
	}
	if ($.stringEqual(frag, "")) {
		return [url, null]
	}
	{
		err = (url !== null && (url as any).__isVarRef !== true && (url as any).__goValue === undefined ? ((url as any) as URL).setFragment(frag) : URL.prototype.setFragment.call(url, frag))
		if (err != null) {
			return [null, $.interfaceValue<$.GoError>(new Error({Op: "parse", URL: rawURL, Err: err}), "*url.Error", /* @__PURE__ */ $.pointerType("url.Error"))]
		}
	}
	return [url, null]
}

export function ParseRequestURI(rawURL: string): [URL | $.VarRef<URL> | null, $.GoError] {
	let __goscriptTuple5: any = parse(rawURL, true)
	let url: URL | $.VarRef<URL> | null = __goscriptTuple5[0]
	let err = __goscriptTuple5[1]
	if (err != null) {
		return [null, $.interfaceValue<$.GoError>(new Error({Op: "parse", URL: rawURL, Err: err}), "*url.Error", /* @__PURE__ */ $.pointerType("url.Error"))]
	}
	return [url, null]
}

export function parse(rawURL: string, viaRequest: boolean): [URL | $.VarRef<URL> | null, $.GoError] {
	let rest: string = ""
	let err: $.GoError = null! as $.GoError

	if (stringContainsCTLByte(rawURL)) {
		return [null, errors.New("net/url: invalid control character in URL")]
	}

	if (($.stringEqual(rawURL, "")) && viaRequest) {
		return [null, errors.New("empty url")]
	}
	let url = new URL()
	let url$: URL = url == null ? $.pointerTarget<URL>(url) : (url as any).__isVarRef === true ? (url as any).value : (url as any).__goValue === undefined ? (url as any) : $.pointerTarget<URL>(url)

	if ($.stringEqual(rawURL, "*")) {
		;(url$ as URL).Path = "*"
		return [url, null]
	}

	// Split off possible leading "http:", "mailto:", etc.
	// Cannot contain escaped characters.
	{
		let __goscriptTuple6: any = getScheme(rawURL);
		;(url$ as URL).Scheme = __goscriptTuple6[0]
		rest = __goscriptTuple6[1]
		err = __goscriptTuple6[2]
		if (err != null) {
			return [null, err]
		}
	}
	;(url$ as URL).Scheme = strings.ToLower((url$ as URL).Scheme)

	if (strings.HasSuffix(rest, "?") && (strings.Count(rest, "?") == 1)) {
		;(url$ as URL).ForceQuery = true
		rest = $.sliceStringOrBytes(rest, undefined, $.stringLen(rest) - 1)
	} else {
		let __goscriptTuple7: any = strings.Cut(rest, "?")
		rest = __goscriptTuple7[0];
		;(url$ as URL).RawQuery = __goscriptTuple7[1]
	}

	if (!strings.HasPrefix(rest, "/")) {
		if (!$.stringEqual((url$ as URL).Scheme, "")) {
			// We consider rootless paths per RFC 3986 as opaque.
			;(url$ as URL).Opaque = rest
			return [url, null]
		}
		if (viaRequest) {
			return [null, errors.New("invalid URI for request")]
		}

		// Avoid confusion with malformed schemes, like cache_object:foo/bar.
		// See golang.org/issue/16822.
		//
		// RFC 3986, §3.3:
		// In addition, a URI reference (Section 4.1) may be a relative-path reference,
		// in which case the first path segment cannot contain a colon (":") character.
		{
			let [segment, , ] = strings.Cut(rest, "/")
			if (strings.Contains(segment, ":")) {
				// First path segment has colon. Not allowed in relative URL.
				return [null, errors.New("first path segment in URL cannot contain colon")]
			}
		}
	}

	if (((!$.stringEqual((url$ as URL).Scheme, "")) || (!viaRequest && !strings.HasPrefix(rest, "///"))) && strings.HasPrefix(rest, "//")) {
		let authority: string = ""
		let __goscriptAssign0_0: string = $.sliceStringOrBytes(rest, 2, undefined)
		let __goscriptAssign0_1: string = ""
		authority = __goscriptAssign0_0
		rest = __goscriptAssign0_1
		{
			let i: number = strings.Index(authority, "/")
			if (i >= 0) {
				let __goscriptAssign1_0: string = $.sliceStringOrBytes(authority, undefined, i)
				let __goscriptAssign1_1: string = $.sliceStringOrBytes(authority, i, undefined)
				authority = __goscriptAssign1_0
				rest = __goscriptAssign1_1
			}
		}
		let __goscriptTuple8: any = parseAuthority((url$ as URL).Scheme, authority);
		;(url$ as URL).User = __goscriptTuple8[0];
		;(url$ as URL).Host = __goscriptTuple8[1]
		err = __goscriptTuple8[2]
		if (err != null) {
			return [null, err]
		}
	} else {
		if ((!$.stringEqual((url$ as URL).Scheme, "")) && strings.HasPrefix(rest, "/")) {
			// OmitHost is set to true when rawURL has an empty host (authority).
			// See golang.org/issue/46059.
			;(url$ as URL).OmitHost = true
		}
	}

	// Set Path and, optionally, RawPath.
	// RawPath is a hint of the encoding of Path. We don't want to set it if
	// the default escaping of Path is equivalent, to help make sure that people
	// don't rely on it in general.
	{
		let __goscriptShadow2 = (url !== null && (url as any).__isVarRef !== true && (url as any).__goValue === undefined ? ((url as any) as URL).setPath(rest) : URL.prototype.setPath.call(url, rest))
		if (__goscriptShadow2 != null) {
			return [null, __goscriptShadow2]
		}
	}
	return [url, null]
}

export function parseAuthority(scheme: string, authority: string): [Userinfo | $.VarRef<Userinfo> | null, string, $.GoError] {
	let user: Userinfo | $.VarRef<Userinfo> | null = null! as Userinfo | $.VarRef<Userinfo> | null
	let host: string = ""
	let err: $.GoError = null! as $.GoError
	let i = strings.LastIndex(authority, "@")
	if (i < 0) {
		let __goscriptTuple9: any = parseHost(scheme, authority)
		host = __goscriptTuple9[0]
		err = __goscriptTuple9[1]
	} else {
		let __goscriptTuple10: any = parseHost(scheme, $.sliceStringOrBytes(authority, i + 1, undefined))
		host = __goscriptTuple10[0]
		err = __goscriptTuple10[1]
	}
	if (err != null) {
		return [null, "", err]
	}
	if (i < 0) {
		return [null, host, null]
	}
	let userinfo = $.sliceStringOrBytes(authority, undefined, i)
	if (!validUserinfo(userinfo)) {
		return [null, "", errors.New("net/url: invalid userinfo")]
	}
	if (!strings.Contains(userinfo, ":")) {
		{
			let __goscriptTuple11: any = unescape(userinfo, 16)
			userinfo = __goscriptTuple11[0]
			err = __goscriptTuple11[1]
			if (err != null) {
				return [null, "", err]
			}
		}
		user = User(userinfo)
	} else {
		let [username, password, ] = strings.Cut(userinfo, ":")
		{
			let __goscriptTuple12: any = unescape(username, 16)
			username = __goscriptTuple12[0]
			err = __goscriptTuple12[1]
			if (err != null) {
				return [null, "", err]
			}
		}
		{
			let __goscriptTuple13: any = unescape(password, 16)
			password = __goscriptTuple13[0]
			err = __goscriptTuple13[1]
			if (err != null) {
				return [null, "", err]
			}
		}
		user = UserPassword(username, password)
	}
	return [user, host, null]
}

export function parseHost(scheme: string, host: string): [string, $.GoError] {
	{
		let openBracketIdx = strings.LastIndex(host, "[")
		if (openBracketIdx > 0) {
			return ["", errors.New("invalid IP-literal")]
		} else {
			if (openBracketIdx == 0) {
				// Parse an IP-Literal in RFC 3986 and RFC 6874.
				// E.g., "[fe80::1]", "[fe80::1%25en0]", "[fe80::1]:80".
				let closeBracketIdx = strings.LastIndex(host, "]")
				if (closeBracketIdx < 0) {
					return ["", errors.New("missing ']' in host")]
				}

				let colonPort = $.sliceStringOrBytes(host, closeBracketIdx + 1, undefined)
				if (!validOptionalPort(colonPort)) {
					return ["", fmt.Errorf("invalid port %q after host", colonPort)]
				}
				let [unescapedColonPort, err] = unescape(colonPort, 4)
				if (err != null) {
					return ["", err]
				}

				let hostname = $.sliceStringOrBytes(host, openBracketIdx + 1, closeBracketIdx)
				let unescapedHostname: string = ""
				// RFC 6874 defines that %25 (%-encoded percent) introduces
				// the zone identifier, and the zone identifier can use basically
				// any %-encoding it likes. That's different from the host, which
				// can only %-encode non-ASCII bytes.
				// We do impose some restrictions on the zone, to avoid stupidity
				// like newlines.
				let zoneIdx = strings.Index(hostname, "%25")
				if (zoneIdx >= 0) {
					let [hostPart, __goscriptShadow3] = unescape($.sliceStringOrBytes(hostname, undefined, zoneIdx), 4)
					if (__goscriptShadow3 != null) {
						return ["", __goscriptShadow3]
					}
					let __goscriptTuple14: any = unescape($.sliceStringOrBytes(hostname, zoneIdx, undefined), 8)
					let zonePart = __goscriptTuple14[0]
					__goscriptShadow3 = __goscriptTuple14[1]
					if (__goscriptShadow3 != null) {
						return ["", __goscriptShadow3]
					}
					unescapedHostname = hostPart + zonePart
				} else {
					let __goscriptShadow4: $.GoError = null! as $.GoError
					let __goscriptTuple15: any = unescape(hostname, 4)
					unescapedHostname = __goscriptTuple15[0]
					__goscriptShadow4 = __goscriptTuple15[1]
					if (__goscriptShadow4 != null) {
						return ["", __goscriptShadow4]
					}
				}

				// Per RFC 3986, only a host identified by a valid
				// IPv6 address can be enclosed by square brackets.
				// This excludes any IPv4, but notably not IPv4-mapped addresses.
				let __goscriptTuple16: any = netip.ParseAddr(unescapedHostname)
				let addr = __goscriptTuple16[0]
				err = __goscriptTuple16[1]
				if (err != null) {
					return ["", fmt.Errorf("invalid host: %w", (err as any))]
				}
				if (addr.Is4()) {
					return ["", errors.New("invalid IP-literal")]
				}
				return ["[" + unescapedHostname + "]" + unescapedColonPort, null]
			} else {
				{
					let i = strings.Index(host, ":")
					if (i != -1) {
						let lastColon = strings.LastIndex(host, ":")
						if (lastColon != i) {
							// RFC 3986 does not allow colons to appear in the host subcomponent.
							//
							// However, a number of databases including PostgreSQL and MongoDB
							// permit a comma-separated list of hosts (with optional ports) in the
							// host subcomponent.
							//
							// Since we historically permitted colons to appear in the host,
							// enforce strict colons only for http and https URLs.
							//
							// See https://go.dev/issue/75223 and https://go.dev/issue/78077.
							if (($.stringEqual(scheme, "http")) || ($.stringEqual(scheme, "https"))) {
								if ($.stringEqual(godebug.Setting.prototype.Value.call($.pointerValue<godebug.Setting>(urlstrictcolons)), "0")) {
									godebug.Setting.prototype.IncNonDefault.call($.pointerValue<godebug.Setting>(urlstrictcolons))
									i = lastColon
								}
							} else {
								i = lastColon
							}
						}
						let colonPort = $.sliceStringOrBytes(host, i, undefined)
						if (!validOptionalPort(colonPort)) {
							return ["", fmt.Errorf("invalid port %q after host", colonPort)]
						}
					}
				}
			}
		}
	}

	let err: $.GoError = null! as $.GoError
	{
		let __goscriptTuple17: any = unescape(host, 4)
		host = __goscriptTuple17[0]
		err = __goscriptTuple17[1]
		if (err != null) {
			return ["", err]
		}
	}
	return [host, null]
}

export function badSetPath(_p0: URL | $.VarRef<URL> | null, _p1: string): $.GoError {
	return null! as $.GoError
}

export function validEncoded(s: string, mode: __goscript_encoding_table.encoding): boolean {
	for (let i = 0; i < $.stringLen(s); i++) {
		// RFC 3986, Appendix A.
		// pchar = unreserved / pct-encoded / sub-delims / ":" / "@".
		// shouldEscape is not quite compliant with the RFC,
		// so we check the sub-delims ourselves and let
		// shouldEscape handle the others.
		switch ($.indexString(s, i)) {
			case 33:
			case 36:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 59:
			case 61:
			case 58:
			case 64:
			{
				break
			}
			case 91:
			case 93:
			{
				break
			}
			case 37:
			{
				break
			}
			default:
			{
				if (shouldEscape($.indexString(s, i), mode)) {
					return false
				}
				break
			}
		}
	}
	return true
}

export function validOptionalPort(port: string): boolean {
	if ($.stringEqual(port, "")) {
		return true
	}
	if ($.indexString(port, 0) != 58) {
		return false
	}
	for (let __goscriptRunes0 = $.stringRunes($.sliceStringOrBytes(port, 1, undefined)); __goscriptRunes0.next(); ) {
		const b = __goscriptRunes0.rune
		if ((b < 48) || (b > 57)) {
			return false
		}
	}
	return true
}

export function Values_Get(v: Values, key: string): string {
	let vs = $.mapGet<string, $.Slice<string>, $.Slice<string>>(v, key, null)[0]
	if ($.sliceLen(vs) == 0) {
		return ""
	}
	return $.arrayIndex(vs!, 0)
}

export function Values_Set(v: Values, key: string, value: string): void {
	$.mapSet(v, key, $.arrayToSlice<string>([value]))
}

export function Values_Add(v: Values, key: string, value: string): void {
	$.mapSet(v, key, $.appendOne($.mapGet<string, $.Slice<string>, $.Slice<string>>(v, key, null)[0], value))
}

export function Values_Del(v: Values, key: string): void {
	$.deleteMapEntry(v, key)
}

export function Values_Has(v: Values, key: string): boolean {
	let [, ok] = $.mapGet<string, $.Slice<string>, $.Slice<string>>(v, key, null)
	return ok
}

export function Values_Clone(vs: Values): Values {
	if (vs == null) {
		return null
	}

	let newVals = $.makeMap<string, $.Slice<string>>()
	for (let [k, v] of vs?.entries() ?? []) {
		$.mapSet(newVals, k, (slices.Clone(v) as $.Slice<string>))
	}
	return newVals
}

export function ParseQuery(query: string): [Values, $.GoError] {
	let m = $.makeMap<string, $.Slice<string>>()
	let err = parseQuery(m, query)
	return [m, err]
}

export let urlmaxqueryparams: godebug.Setting | $.VarRef<godebug.Setting> | null = godebug.New("urlmaxqueryparams")

export function __goscript_set_urlmaxqueryparams(__goscriptValue: godebug.Setting | $.VarRef<godebug.Setting> | null): void {
	urlmaxqueryparams = __goscriptValue
}

export function urlParamsWithinMax(params: number): boolean {
	let withinDefaultMax = params <= 10000
	if ($.stringEqual(godebug.Setting.prototype.Value.call($.pointerValue<godebug.Setting>(urlmaxqueryparams)), "")) {
		return withinDefaultMax
	}
	let [customMax, err] = strconv.Atoi(godebug.Setting.prototype.Value.call($.pointerValue<godebug.Setting>(urlmaxqueryparams)))
	if (err != null) {
		return withinDefaultMax
	}
	let withinCustomMax = (customMax == 0) || (params < customMax)
	if (withinDefaultMax != withinCustomMax) {
		godebug.Setting.prototype.IncNonDefault.call($.pointerValue<godebug.Setting>(urlmaxqueryparams))
	}
	return withinCustomMax
}

export function parseQuery(m: Values, query: string): $.GoError {
	let err: $.GoError = null! as $.GoError
	if (!urlParamsWithinMax(strings.Count(query, "&") + 1)) {
		return errors.New("number of URL query parameters exceeded limit")
	}
	while (!$.stringEqual(query, "")) {
		let key: string = ""
		let __goscriptTuple18: any = strings.Cut(query, "&")
		key = __goscriptTuple18[0]
		query = __goscriptTuple18[1]
		if (strings.Contains(key, ";")) {
			err = fmt.Errorf("invalid semicolon separator in query")
			continue
		}
		if ($.stringEqual(key, "")) {
			continue
		}
		let __goscriptTuple19: any = strings.Cut(key, "=")
		key = __goscriptTuple19[0]
		let value = __goscriptTuple19[1]
		let __goscriptTuple20: any = QueryUnescape(key)
		key = __goscriptTuple20[0]
		let err1 = __goscriptTuple20[1]
		if (err1 != null) {
			if (err == null) {
				err = err1
			}
			continue
		}
		let __goscriptTuple21: any = QueryUnescape(value)
		value = __goscriptTuple21[0]
		err1 = __goscriptTuple21[1]
		if (err1 != null) {
			if (err == null) {
				err = err1
			}
			continue
		}
		$.mapSet(m, key, $.appendOne($.mapGet<string, $.Slice<string>, $.Slice<string>>(m, key, null)[0], value))
	}
	return err
}

export function Values_Encode(v: Values): string {
	if ($.len(v) == 0) {
		return ""
	}
	let buf: $.VarRef<strings.Builder> = $.varRef($.markAsStructValue(new strings.Builder()))
	// To minimize allocations, we eschew iterators and pre-size the slice in
	// which we collect v's keys.
	let keys = $.makeSlice<string>($.len(v), undefined, "string")
	let i: number = 0
	for (const [k, __rangeValue] of v?.entries() ?? []) {
		$.sliceElems(keys!)[$.sliceSlot(keys!, i)] = k
		i++
	}
	slices.Sort(keys)
	for (let __goscriptRangeTarget3 = keys, __goscriptRangeWindow2 = $.sliceRange(__goscriptRangeTarget3), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow2.length; __rangeIndex++) {
		let k = (__goscriptRangeWindow2.backing[__goscriptRangeWindow2.offset + __rangeIndex] as string)
		let vs = $.mapGet<string, $.Slice<string>, $.Slice<string>>(v, k, null)[0]
		let keyEscaped = QueryEscape(k)
		for (let __goscriptRangeTarget2 = vs, __goscriptRangeWindow3 = $.sliceRange(__goscriptRangeTarget2), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow3.length; __rangeIndex++) {
			let v = (__goscriptRangeWindow3.backing[__goscriptRangeWindow3.offset + __rangeIndex] as string)
			if (buf.value.Len() > 0) {
				buf.value.WriteByte(38)
			}
			buf.value.WriteString(keyEscaped)
			buf.value.WriteByte(61)
			buf.value.WriteString(QueryEscape(v))
		}
	}
	return buf.value.String()
}

export function resolvePath(base: string, ref: string): string {
	let full: string = ""
	if ($.stringEqual(ref, "")) {
		full = base
	} else {
		if ($.indexString(ref, 0) != 47) {
			let i = strings.LastIndex(base, "/")
			full = $.sliceStringOrBytes(base, undefined, i + 1) + ref
		} else {
			full = ref
		}
	}
	if ($.stringEqual(full, "")) {
		return ""
	}

	let dst: $.Slice<number> = $.makeSlice<number>(0, $.stringLen(full) + 1, "byte")
	dst = $.append(dst, $.uint(47, 8), $.byteSliceHint)
	let elem = ""
	let remaining = full
	let found = true
	let first = true
	while (found) {
		let __goscriptTuple22: any = strings.Cut(remaining, "/")
		elem = __goscriptTuple22[0]
		remaining = __goscriptTuple22[1]
		found = __goscriptTuple22[2]
		switch (elem) {
			case ".":
			{
				first = false
				continue
				break
			}
			case "..":
			{
				{
					let i: number = bytes.LastIndexByte($.goSlice(dst, 1, undefined), 47)
					if (i >= 0) {
						dst = $.goSlice(dst, undefined, i + 1)
					} else {
						dst = $.goSlice(dst, undefined, 1)
					}
				}
				first = $.sliceLen(dst) == 1
				break
			}
			default:
			{
				if (!first) {
					dst = $.append(dst, $.uint(47, 8), $.byteSliceHint)
				}
				dst = $.appendSlice(dst, $.stringToBytes(elem), $.byteSliceHint)
				first = false
				break
			}
		}
	}

	if (($.stringEqual(elem, ".")) || ($.stringEqual(elem, ".."))) {
		dst = $.append(dst, $.uint(47, 8), $.byteSliceHint)
	}

	// We wrote an initial '/', but we don't want two.
	if (($.sliceLen(dst) > 1) && ($.arrayIndex(dst!, 1) == 47)) {
		return $.bytesToString($.goSlice(dst, 1, undefined))
	}
	return $.bytesToString(dst)
}

export function splitHostPort(hostPort: string): [string, string] {
	let host: string = ""
	let port: string = ""
	host = hostPort

	let colon: number = strings.LastIndexByte(host, 58)
	if ((colon != -1) && validOptionalPort($.sliceStringOrBytes(host, colon, undefined))) {
		let __goscriptAssign2_0: string = $.sliceStringOrBytes(host, undefined, colon)
		let __goscriptAssign2_1: string = $.sliceStringOrBytes(host, colon + 1, undefined)
		host = __goscriptAssign2_0
		port = __goscriptAssign2_1
	}

	if (strings.HasPrefix(host, "[") && strings.HasSuffix(host, "]")) {
		host = $.sliceStringOrBytes(host, 1, $.stringLen(host) - 1)
	}

	return [host, port]
}

export function validUserinfo(s: string): boolean {
	for (let __goscriptRunes1 = $.stringRunes(s); __goscriptRunes1.next(); ) {
		const r = __goscriptRunes1.rune
		if ((65 <= r) && (r <= 90)) {
			continue
		}
		if ((97 <= r) && (r <= 122)) {
			continue
		}
		if ((48 <= r) && (r <= 57)) {
			continue
		}
		switch (r) {
			case 45:
			case 46:
			case 95:
			case 58:
			case 126:
			case 33:
			case 36:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 59:
			case 61:
			case 37:
			{
				continue
				break
			}
			case 64:
			{
				continue
				break
			}
			default:
			{
				return false
				break
			}
		}
	}
	return true
}

export function stringContainsCTLByte(s: string): boolean {
	for (let i = 0; i < $.stringLen(s); i++) {
		let b = $.indexString(s, i)
		if ((b < 32) || (b == 0x7f)) {
			return true
		}
	}
	return false
}

export function JoinPath(base: string, elem: $.Slice<string>): [string, $.GoError] {
	let result: string = ""
	let err: $.GoError = null! as $.GoError
	let __goscriptTuple23: any = Parse(base)
	let url: URL | $.VarRef<URL> | null = __goscriptTuple23[0]
	err = __goscriptTuple23[1]
	if (err != null) {
		return [result, err]
	}
	let __goscriptTuple24: any = (url !== null && (url as any).__isVarRef !== true && (url as any).__goValue === undefined ? ((url as any) as URL).joinPath(elem) : URL.prototype.joinPath.call(url, elem))
	let res: URL | $.VarRef<URL> | null = __goscriptTuple24[0]
	err = __goscriptTuple24[1]
	if (err != null) {
		return ["", err]
	}
	return [(res !== null && (res as any).__isVarRef !== true && (res as any).__goValue === undefined ? ((res as any) as URL).String() : URL.prototype.String.call(res)), null]
}

var __goscriptAwait: any
