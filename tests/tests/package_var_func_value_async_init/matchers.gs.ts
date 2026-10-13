// Generated file based on matchers.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as types from "@goscript/github.com/s4wave/goscript/tests/tests/package_var_func_value_async_init/types/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/package_var_func_value_async_init/types/index.js"

export var newType: ((ext: string, mime: string) => types.Type | globalThis.Promise<types.Type>) | null

export function __goscript_init_newType(): void {
	if (((newType) as any) === undefined) {
		newType = types.NewType
	}
}

export function __goscript_get_newType(): ((ext: string, mime: string) => types.Type | globalThis.Promise<types.Type>) | null {
	if (((newType) as any) === undefined) {
		__goscript_init_newType()
	}
	return newType
}

export function __goscript_set_newType(__goscriptValue: ((ext: string, mime: string) => types.Type | globalThis.Promise<types.Type>) | null): void {
	newType = __goscriptValue
}
