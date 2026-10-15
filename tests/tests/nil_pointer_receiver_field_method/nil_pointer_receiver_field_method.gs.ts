// Generated file based on nil_pointer_receiver_field_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class child {
	public declare value: string

	constructor(__goscriptValue?: boolean, value$?: string) {
		this.value = value$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): child {
		return new child(true, this.value)
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
		return new child(false, $.pointerValue<child>(c).value)
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

	constructor(__goscriptValue?: boolean, child$?: child | $.VarRef<child> | null) {
		this.child = child$ ?? (null! as child | $.VarRef<child> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): parent {
		return new parent(true, this.child)
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
	let p: parent = new parent(true)
	if (child.prototype.Clone.call(p.child) == null) {
		await $.println("nil clone")
	}
	p.child = new child(false, "ok")
	await $.println($.pointerValue<child>(child.prototype.Clone.call(p.child)).value)
}

if ($.isMainScript(import.meta)) {
	await main()
}
