// Generated file based on atomic_struct_field_init.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as atomic from "@goscript/sync/atomic/index.js"

export class MyStruct {
	public declare closed: atomic.Bool

	public declare count: atomic.Int32

	public declare flag: atomic.Uint32

	constructor(__goscriptValue?: boolean, closed$?: atomic.Bool, count$?: atomic.Int32, flag$?: atomic.Uint32) {
		this.closed = closed$ ?? $.markAsStructValue(new atomic.Bool())
		this.count = count$ ?? $.markAsStructValue(new atomic.Int32())
		this.flag = flag$ ?? $.markAsStructValue(new atomic.Uint32())
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(true, $.markAsStructValue($.cloneStructValue(this.closed)), $.markAsStructValue($.cloneStructValue(this.count)), $.markAsStructValue($.cloneStructValue(this.flag)))
	}

	public __goscriptAssign(source: MyStruct): this {
		$.assignStruct(this.closed, source.closed)
		$.assignStruct(this.count, source.count)
		$.assignStruct(this.flag, source.flag)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [],
		MyStruct,
		() => [{ name: "closed", key: "closed", type: "atomic.Bool" }, { name: "count", key: "count", type: "atomic.Int32" }, { name: "flag", key: "flag", type: "atomic.Uint32" }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Test struct initialization with atomic fields
	let s = new MyStruct(true)

	// Test that the atomic fields work correctly
	s.closed.Store(true)
	s.count.Store(42)
	s.flag.Store(100)

	await $.println("closed:", s.closed.Load())
	await $.println("count:", s.count.Load())
	await $.println("flag:", s.flag.Load())

	// Test struct initialization with init values
	let s2 = new MyStruct(true, $.markAsStructValue(new atomic.Bool()), $.markAsStructValue(new atomic.Int32()), $.markAsStructValue(new atomic.Uint32()))

	s2.closed.Store(false)
	s2.count.Store(24)
	s2.flag.Store(50)

	await $.println("s2 closed:", s2.closed.Load())
	await $.println("s2 count:", s2.count.Load())
	await $.println("s2 flag:", s2.flag.Load())

	await $.println("atomic struct field test finished")
}

if ($.isMainScript(import.meta)) {
	await main()
}
