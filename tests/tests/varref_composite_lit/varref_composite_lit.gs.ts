// Generated file based on varref_composite_lit.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MockInode {
	public declare Value: number

	constructor(__goscriptValue?: boolean, Value$?: number) {
		this.Value = Value$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): MockInode {
		return new MockInode(true, this.Value)
	}

	public __goscriptAssign(source: MockInode): this {
		this.Value = source.Value
		return this
	}

	public getValue(): number {
		const m: MockInode | $.VarRef<MockInode> | null = this;
		return $.pointerValue<MockInode>(m).Value
	}

	static __typeInfo = $.registerStructType(
		"main.MockInode",
		() => new MockInode(),
		() => [{ name: "getValue", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		MockInode,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// This should generate: let childInode: MockInode | null = new MockInode({Value: 42})
	// Not: let childInode: MockInode | null = $.varRef(new MockInode({Value: 42}))
	// Because we're taking the address of a composite literal, not a variable
	let childInode: MockInode | $.VarRef<MockInode> | null = new MockInode(false, 42)

	// Use the pointer
	await $.println("childInode.Value:", $.pointerValue<MockInode>(childInode).Value)
	await $.println("childInode.getValue():", (childInode !== null && (childInode as any).__isVarRef !== true && (childInode as any).__goValue === undefined ? ((childInode as any) as MockInode).getValue() : MockInode.prototype.getValue.call(childInode)))
}

if ($.isMainScript(import.meta)) {
	await main()
}
