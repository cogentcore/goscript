// Generated file based on nil_pointer_receiver_field_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class child {
	public declare value: string

	constructor(init?: Partial<{value?: string}>, __goscriptValue?: boolean) {
		this.value = init?.value ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): child {
		return new child(this, true)
	}

	public __goscriptAssign(source: child): this {
		this.value = source.value
		return this
	}

	public Clone(): child | $.VarRef<child> | null {
		const c: child | $.VarRef<child> | null = this;
		if (c == null) {
			return null
		}
		return new child({value: $.pointerValue<child>(c).value})
	}

	static __typeInfo = $.registerStructType(
		"main.child",
		() => new child(),
		() => [{ name: "Clone", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("main.child") }], pointerReceiver: true }],
		child,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class parent {
	public declare child: child | $.VarRef<child> | null

	constructor(init?: Partial<{child?: child | $.VarRef<child> | null}>, __goscriptValue?: boolean) {
		this.child = init?.child ?? (null! as child | $.VarRef<child> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): parent {
		return new parent(this, true)
	}

	public __goscriptAssign(source: parent): this {
		this.child = source.child
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.parent",
		() => new parent(),
		() => [],
		parent,
		() => [{ name: "child", key: "child", type: /* @__PURE__ */ $.pointerType("main.child") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let p: parent = new parent(undefined, true)
	if (child.prototype.Clone.call(p.child) == null) {
		await $.println("nil clone")
	}
	p.child = new child({value: "ok"})
	await $.println($.pointerValue<child>(child.prototype.Clone.call(p.child)).value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
