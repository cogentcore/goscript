// Generated file based on generic_erased_struct_make.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class queue {
	public get buf(): $.Slice<any> {
		return this._fields.buf
	}

	public set buf(value: $.Slice<any>) {
		this._fields.buf = value
	}

	public _fields: {
		buf: $.Slice<any>
	}

	constructor(init?: Partial<{buf?: $.Slice<any>}>, __goscriptValue?: boolean) {
		this._fields = {
			buf: init?.buf ?? (null! as $.Slice<any>)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): queue {
		return new queue(this, true)
	}

	public __goscriptAssign(source: queue): void {
		const target = this._fields
		const values = source._fields
		target.buf = values.buf
	}

	static __typeInfo = $.registerStructType(
		"main.queue",
		() => new queue(),
		() => [],
		queue,
		() => [{ name: "buf", key: "buf", type: /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] }) }]
	)
}

export function newQueue(__typeArgs: $.GenericTypeArgs | undefined, capacity: number): queue | $.VarRef<queue> | null {
	return new queue({buf: $.makeSlice<any>(capacity, undefined, undefined, () => ($.genericZero(__typeArgs, "T", null) as any))})
}

export async function main(): globalThis.Promise<void> {
	let q: queue | $.VarRef<queue> | null = (newQueue(__goscriptStatic0(), 2) as queue | $.VarRef<queue> | null)
	$.pointerValue<queue>(q).buf![0] = 7
	await $.println($.sliceLen($.pointerValue<queue>(q).buf), $.arrayIndex($.pointerValue<queue>(q).buf!, 0))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
