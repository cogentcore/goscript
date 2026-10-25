// Generated file based on reflect_zero_int64.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"
import * as time from "@goscript/time/index.js"

export class timer {
	public declare start: time.Time

	public declare total: time.Duration

	constructor(__goscriptValue?: boolean, start$?: time.Time, total$?: time.Duration) {
		this.start = start$ ?? $.markAsStructValue(new time.Time())
		this.total = total$ ?? 0n
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): timer {
		return new timer(true, $.markAsStructValue($.cloneStructValue(this.start)), this.total)
	}

	public __goscriptAssign(source: timer): this {
		$.assignStruct(this.start, source.start)
		this.total = source.total
		return this
	}

	public Start(): void {
		const t: timer | $.VarRef<timer> | null = this;
		$.assignStruct($.pointerValue<timer>(t).start, time.Now())
	}

	static __typeInfo = $.registerStructType(
		"main.timer",
		() => new timer(),
		() => [$.methodSignature("Start", [], [], true)],
		timer,
		() => [/* @__PURE__ */ $.structField("start", "time.Time", [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/reflect_zero_int64" }), /* @__PURE__ */ $.structField("total", /* @__PURE__ */ $.basicType("int64", "time.Duration"), [1], 24, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/reflect_zero_int64" })]
	)
}

export function isZero(x: any): boolean {
	return reflect.DeepEqual(x, $.markAsStructValue($.cloneStructValue(reflect.Zero($.pointerValueOrNil(reflect.TypeOf(x))!))).Interface())
}

export async function main(): globalThis.Promise<void> {
	let i64 = 0n
	await $.println(isZero($.basicInterfaceValue(i64, "int64")))
	let d: time.Duration = 0n
	await $.println(isZero($.namedValueInterfaceValue<any>(d, "time.Duration", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())))
	let tm = $.markAsStructValue(new time.Time())
	await $.println(isZero($.structInterfaceValue($.markAsStructValue($.cloneStructValue(tm)), "time.Time", __goscriptStatic3())))
	await $.println(isZero($.structInterfaceValue($.markAsStructValue(new time.Time()), "time.Time", __goscriptStatic3())))
	await $.println($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.namedValueInterfaceValue<any>(d, "time.Duration", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())))).IsZero(), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.structInterfaceValue($.markAsStructValue($.cloneStructValue(tm)), "time.Time", __goscriptStatic3())))).IsZero())
	await $.println($.markAsStructValue($.cloneStructValue(tm)).Year(), $.markAsStructValue($.cloneStructValue(tm)).String(), $.markAsStructValue($.cloneStructValue(tm)).Format("2006-01-02"))

	// assigning a Time field through a pointer copies the Time
	let t: $.VarRef<timer> = $.varRef(new timer(true))
	await $.println(isZero($.structInterfaceValue($.markAsStructValue($.cloneStructValue(t.value.start)), "time.Time", __goscriptStatic3())), isZero($.namedValueInterfaceValue<any>(t.value.total, "time.Duration", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())))
	t.value.Start()
	await $.println(isZero($.structInterfaceValue($.markAsStructValue($.cloneStructValue(t.value.start)), "time.Time", __goscriptStatic3())), $.markAsStructValue($.cloneStructValue(t.value.start)).Year() > 2000)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Abs: (receiver: any) => (time.Duration_Abs as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Hours: (receiver: any) => (time.Duration_Hours as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Microseconds: (receiver: any) => (time.Duration_Microseconds as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Milliseconds: (receiver: any) => (time.Duration_Milliseconds as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Minutes: (receiver: any) => (time.Duration_Minutes as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Nanoseconds: (receiver: any) => (time.Duration_Nanoseconds as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Round: (receiver: any, ...args: any[]) => (time.Duration_Round as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Seconds: (receiver: any) => (time.Duration_Seconds as any)(($.isVarRef(receiver) ? receiver.value : receiver)), String: (receiver: any) => (time.Duration_String as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Truncate: (receiver: any, ...args: any[]) => (time.Duration_Truncate as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), format: (receiver: any, ...args: any[]) => (time.Duration_format as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("int64", "time.Duration"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Abs", [], [/* @__PURE__ */ $.basicType("int64", "time.Duration")]), $.methodSignature("Hours", [], [/* @__PURE__ */ $.basicType("float64")]), $.methodSignature("Microseconds", [], [/* @__PURE__ */ $.basicType("int64")]), $.methodSignature("Milliseconds", [], [/* @__PURE__ */ $.basicType("int64")]), $.methodSignature("Minutes", [], [/* @__PURE__ */ $.basicType("float64")]), $.methodSignature("Nanoseconds", [], [/* @__PURE__ */ $.basicType("int64")]), $.methodSignature("Round", [["m", /* @__PURE__ */ $.basicType("int64", "time.Duration")]], [/* @__PURE__ */ $.basicType("int64", "time.Duration")]), $.methodSignature("Seconds", [], [/* @__PURE__ */ $.basicType("float64")]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Truncate", [["m", /* @__PURE__ */ $.basicType("int64", "time.Duration")]], [/* @__PURE__ */ $.basicType("int64", "time.Duration")]), $.methodSignature("format", [["buf", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 32))]], [/* @__PURE__ */ $.basicType("int")])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ($.overrideTypeMethods("time.Time", "time.Time", () => [$.methodSignature("Add", [["d", /* @__PURE__ */ $.basicType("int64", "time.Duration")]], ["time.Time"]), $.methodSignature("AddDate", [["years", /* @__PURE__ */ $.basicType("int")], ["months", /* @__PURE__ */ $.basicType("int")], ["days", /* @__PURE__ */ $.basicType("int")]], ["time.Time"]), $.methodSignature("After", [["u", "time.Time"]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("AppendBinary", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("AppendFormat", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["layout", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]), $.methodSignature("AppendText", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("Before", [["u", "time.Time"]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Clock", [], [["hour", /* @__PURE__ */ $.basicType("int")], ["min", /* @__PURE__ */ $.basicType("int")], ["sec", /* @__PURE__ */ $.basicType("int")]]), $.methodSignature("Compare", [["u", "time.Time"]], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Date", [], [["year", /* @__PURE__ */ $.basicType("int")], ["month", /* @__PURE__ */ $.basicType("int", "time.Month")], ["day", /* @__PURE__ */ $.basicType("int")]]), $.methodSignature("Day", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Equal", [["u", "time.Time"]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Format", [["layout", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("GoString", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("GobDecode", [["data", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], ["error"], true), $.methodSignature("GobEncode", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("Hour", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("ISOWeek", [], [["year", /* @__PURE__ */ $.basicType("int")], ["week", /* @__PURE__ */ $.basicType("int")]]), $.methodSignature("In", [["loc", /* @__PURE__ */ $.pointerType("time.Location")]], ["time.Time"]), $.methodSignature("IsDST", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("IsZero", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Local", [], ["time.Time"]), $.methodSignature("Location", [], [/* @__PURE__ */ $.pointerType("time.Location")]), $.methodSignature("MarshalBinary", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("MarshalJSON", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("MarshalText", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("Minute", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Month", [], [/* @__PURE__ */ $.basicType("int", "time.Month")]), $.methodSignature("Nanosecond", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Round", [["d", /* @__PURE__ */ $.basicType("int64", "time.Duration")]], ["time.Time"]), $.methodSignature("Second", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Sub", [["u", "time.Time"]], [/* @__PURE__ */ $.basicType("int64", "time.Duration")]), $.methodSignature("Truncate", [["d", /* @__PURE__ */ $.basicType("int64", "time.Duration")]], ["time.Time"]), $.methodSignature("UTC", [], ["time.Time"]), $.methodSignature("Unix", [], [/* @__PURE__ */ $.basicType("int64")]), $.methodSignature("UnixMicro", [], [/* @__PURE__ */ $.basicType("int64")]), $.methodSignature("UnixMilli", [], [/* @__PURE__ */ $.basicType("int64")]), $.methodSignature("UnixNano", [], [/* @__PURE__ */ $.basicType("int64")]), $.methodSignature("UnmarshalBinary", [["data", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], ["error"], true), $.methodSignature("UnmarshalJSON", [["data", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], ["error"], true), $.methodSignature("UnmarshalText", [["data", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], ["error"], true), $.methodSignature("Weekday", [], [/* @__PURE__ */ $.basicType("int", "time.Weekday")]), $.methodSignature("Year", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("YearDay", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Zone", [], [["name", /* @__PURE__ */ $.basicType("string")], ["offset", /* @__PURE__ */ $.basicType("int")]]), $.methodSignature("ZoneBounds", [], [["start", "time.Time"], ["end", "time.Time"]])]))
}

if ($.isMainScript(import.meta)) {
	await main()
}
