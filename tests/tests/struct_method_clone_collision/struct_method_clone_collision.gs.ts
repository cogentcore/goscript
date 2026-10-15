// Generated file based on struct_method_clone_collision.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Box {
	public declare Value: number

	constructor(init?: Partial<{Value?: number}>, __goscriptValue?: boolean) {
		this.Value = init?.Value ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public __goscriptClone(): Box {
		return new Box(this, true)
	}

	public __goscriptAssign(source: Box): this {
		this.Value = source.Value
		return this
	}

	public clone(): Box | $.VarRef<Box> | null {
		const b: Box | $.VarRef<Box> | null = this;
		return new Box({Value: $.pointerValue<Box>(b).Value + 1})
	}

	static __typeInfo = $.registerStructType(
		"main.Box",
		() => new Box(),
		() => [{ name: "clone", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("main.Box") }], pointerReceiver: true }],
		Box,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function copyBox(b: Box, __goscriptBorrow?: boolean): Box {
	return (__goscriptBorrow === true ? b : $.markAsStructValue($.cloneStructValue(b)))
}

export async function main(): globalThis.Promise<void> {
	let original = $.varRef($.markAsStructValue(new Box({Value: 1})))
	let copied = copyBox(original.value)
	original.value.Value = 3
	let methodCopy = Box.prototype.clone.call((original))
	await $.println("copied:", copied.Value)
	await $.println("method:", $.pointerValue<Box>(methodCopy).Value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
