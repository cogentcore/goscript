// Generated file based on func_lit_outer_function_tuple.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type opener = ((_p0: string) => [string, $.GoError] | globalThis.Promise<[string, $.GoError]>) | null

export type wrapper = ((_p0: string) => [string, $.GoError] | globalThis.Promise<[string, $.GoError]>) | null

export type updater = (() => $.GoError | globalThis.Promise<$.GoError>) | null

export function wrap(open: opener | null): wrapper | null {
	return $.functionValue((path: string): [string, $.GoError] => {
		let [value, err] = (open!(path) as [string, $.GoError])
		if (err != null) {
			return ["", err]
		}
		return ["wrapped:" + value, null]
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string"), "error"] } as $.FunctionTypeInfo))
}

export function open(path: string): [string, $.GoError] {
	return [path, null]
}

export function run(update: updater | null): $.GoError {
	let err = ((): $.GoError => {
		return (update!() as $.GoError)
	})()
	if (err != null) {
		return err
	}
	return null
}

export function noop(): $.GoError {
	return null
}

export async function main(): globalThis.Promise<void> {
	let wrapped = wrap(open)
	let [value, err] = (wrapped!("ok") as [string, $.GoError])
	if (err != null) {
		await $.println("err")
		return
	}
	await $.println(value)
	if (run(noop) == null) {
		await $.println("run ok")
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
