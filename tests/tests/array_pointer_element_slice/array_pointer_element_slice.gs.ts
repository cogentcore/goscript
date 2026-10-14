// Generated file based on array_pointer_element_slice.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class node {
	public get sub(): $.Slice<node | $.VarRef<node> | null> {
		return this._fields.sub
	}

	public set sub(value: $.Slice<node | $.VarRef<node> | null>) {
		this._fields.sub = value
	}

	public get sub0(): (node | $.VarRef<node> | null)[] {
		return this._fields.sub0
	}

	public set sub0(value: (node | $.VarRef<node> | null)[]) {
		this._fields.sub0 = value
	}

	public _fields: {
		sub: $.Slice<node | $.VarRef<node> | null>
		sub0: (node | $.VarRef<node> | null)[]
	}

	constructor(init?: Partial<{sub?: $.Slice<node | $.VarRef<node> | null>, sub0?: (node | $.VarRef<node> | null)[]}>) {
		this._fields = {
			sub: init?.sub ?? (null! as $.Slice<node | $.VarRef<node> | null>),
			sub0: init?.sub0 !== undefined ? $.cloneArrayValue(init.sub0, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.pointerType("main.node"), 1)) : $.arrayValue(globalThis.Array.from({ length: 1 }, () => null))
		}
	}

	public clone(): node {
		return $.markAsStructValue(new node(this))
	}

	public __goscriptAssign(source: node): void {
		const target = this._fields
		const values = source._fields
		target.sub = values.sub
		target.sub0 = $.assignFieldValue(target.sub0, values.sub0, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.pointerType("main.node"), 1))
	}

	static __typeInfo = $.registerStructType(
		"main.node",
		() => new node(),
		() => [],
		node,
		() => [{ name: "sub", key: "sub", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.node")) }, { name: "sub0", key: "sub0", type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.pointerType("main.node"), 1) }]
	)
}

export async function main(): globalThis.Promise<void> {
	let root: node | $.VarRef<node> | null = new node()
	let child: node | $.VarRef<node> | null = new node()
	$.pointerValue<node>(root).sub = $.append($.goSlice($.pointerValue<node>(root).sub0, undefined, 0), child, $.appendZeros.nil)

	await $.println($.sliceLen($.pointerValue<node>(root).sub), $.pointerEqual($.arrayIndex($.pointerValue<node>(root).sub!, 0), child))
}

if ($.isMainScript(import.meta)) {
	await main()
}
