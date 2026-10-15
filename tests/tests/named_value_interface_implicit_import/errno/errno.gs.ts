// Generated file based on errno.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/errno", ["errno.Errno"])

export type Errno = number

$.registerNamedValueType(
	"errno.Errno",
	{Error: (receiver: any) => (Errno_Error as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*errno.Errno",
	{Error: (receiver: any) => (Errno_Error as any)($.pointerValue(receiver))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

export function Errno_Error(e: Errno): string {
	switch (e) {
		case 20:
		{
			return "not a directory"
			break
		}
	}
	return "errno"
}
