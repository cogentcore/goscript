// Generated file based on convert.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function pointerToJS(__typeArgs: $.GenericTypeArgs | undefined, v: any): globalThis.Promise<any> {
	if ((v as any) == null) {
		return null
	}
	return $.callGenericMethod(__typeArgs, "P", "toJS", v)
}
