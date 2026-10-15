// Generated file based on atomic_struct_field_init.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as atomic from "@goscript/sync/atomic/index.js"

export class MyStruct {
	public declare closed: atomic.Bool

	public declare count: atomic.Int32

	public declare flag: atomic.Uint32

	constructor(init?: Partial<{closed?: atomic.Bool, count?: atomic.Int32, flag?: atomic.Uint32}>, __goscriptValue?: boolean) {
		this.closed = init?.closed ? $.markAsStructValue($.cloneStructValue(init.closed)) : $.markAsStructValue(new atomic.Bool())
		this.count = init?.count ? $.markAsStructValue($.cloneStructValue(init.count)) : $.markAsStructValue(new atomic.Int32())
		this.flag = init?.flag ? $.markAsStructValue($.cloneStructValue(init.flag)) : $.markAsStructValue(new atomic.Uint32())
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(this, true)
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
	let s = new MyStruct(undefined, true)

	// Test that the atomic fields work correctly
	s.closed.Store(true)
	s.count.Store(42)
	s.flag.Store(100)

	await $.println("closed:", s.closed.Load())
	await $.println("count:", s.count.Load())
	await $.println("flag:", s.flag.Load())

	// Test struct initialization with init values
	let s2 = new MyStruct({closed: $.markAsStructValue(new atomic.Bool()), count: $.markAsStructValue(new atomic.Int32()), flag: $.markAsStructValue(new atomic.Uint32())}, true)

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
