// Generated file based on protobuf_cross_file_clone.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import type * as protobuf_go_lite from "@goscript/github.com/aperturerobotics/protobuf-go-lite/index.js"

import type * as json from "@goscript/github.com/aperturerobotics/protobuf-go-lite/json/index.js"

import * as __goscript_child_pb_ts from "./child.pb.ts"

import * as __goscript_parent_pb_ts from "./parent.pb.ts"
import "./child.pb.ts"
import "./parent.pb.ts"

export async function main(): globalThis.Promise<void> {
	let parent = new __goscript_parent_pb_ts.Parent({Child: new __goscript_child_pb_ts.Child({Name: "hello"}), Children: $.arrayToSlice<__goscript_child_pb_ts.Child | $.VarRef<__goscript_child_pb_ts.Child> | null>([new __goscript_child_pb_ts.Child({Name: "one"}), new __goscript_child_pb_ts.Child({Name: "two"})])})
	let parent$: __goscript_parent_pb_ts.Parent = parent == null ? $.pointerTarget<__goscript_parent_pb_ts.Parent>(parent) : (parent as any).__isVarRef === true ? (parent as any).value : (parent as any).__goValue === undefined ? (parent as any) : $.pointerTarget<__goscript_parent_pb_ts.Parent>(parent)

	let clone = (parent !== null && (parent as any).__isVarRef !== true && (parent as any).__goValue === undefined ? ((parent as any) as __goscript_parent_pb_ts.Parent).CloneVT() : __goscript_parent_pb_ts.Parent.prototype.CloneVT.call(parent))
	let clone$: __goscript_parent_pb_ts.Parent = clone == null ? $.pointerTarget<__goscript_parent_pb_ts.Parent>(clone) : (clone as any).__isVarRef === true ? (clone as any).value : (clone as any).__goValue === undefined ? (clone as any) : $.pointerTarget<__goscript_parent_pb_ts.Parent>(clone)
	await $.println("clone nil:", clone == null)
	await $.println("child name:", $.pointerValue<__goscript_child_pb_ts.Child>((clone$ as __goscript_parent_pb_ts.Parent).Child).Name)
	await $.println("child ptr same:", ((clone$ as __goscript_parent_pb_ts.Parent).Child === (parent$ as __goscript_parent_pb_ts.Parent).Child || $.pointerAliasesMade && $.pointerEqual((clone$ as __goscript_parent_pb_ts.Parent).Child, (parent$ as __goscript_parent_pb_ts.Parent).Child)))
	await $.println("children count:", $.sliceLen((clone$ as __goscript_parent_pb_ts.Parent).Children))
	await $.println("children[0]:", $.pointerValue<__goscript_child_pb_ts.Child>($.arrayIndex((clone$ as __goscript_parent_pb_ts.Parent).Children!, 0)).Name)
	await $.println("children[1]:", $.pointerValue<__goscript_child_pb_ts.Child>($.arrayIndex((clone$ as __goscript_parent_pb_ts.Parent).Children!, 1)).Name)
	await $.println("children ptr same:", ($.arrayIndex((clone$ as __goscript_parent_pb_ts.Parent).Children!, 0) === $.arrayIndex((parent$ as __goscript_parent_pb_ts.Parent).Children!, 0) || $.pointerAliasesMade && $.pointerEqual($.arrayIndex((clone$ as __goscript_parent_pb_ts.Parent).Children!, 0), $.arrayIndex((parent$ as __goscript_parent_pb_ts.Parent).Children!, 0))))

	// Deep equality after clone.
	await $.println("equal:", (parent !== null && (parent as any).__isVarRef !== true && (parent as any).__goValue === undefined ? ((parent as any) as __goscript_parent_pb_ts.Parent).EqualVT(clone) : __goscript_parent_pb_ts.Parent.prototype.EqualVT.call(parent, clone)))

	// Mutating the clone must not touch the parent.
	$.pointerValue<__goscript_child_pb_ts.Child>((clone$ as __goscript_parent_pb_ts.Parent).Child).Name = "changed"
	await $.println("parent untouched:", $.stringEqual($.pointerValue<__goscript_child_pb_ts.Child>((parent$ as __goscript_parent_pb_ts.Parent).Child).Name, "hello"))
}

if ($.isMainScript(import.meta)) {
	await main()
}
