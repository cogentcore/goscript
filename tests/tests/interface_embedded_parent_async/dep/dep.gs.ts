// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/interface_embedded_parent_async/dep", ["dep.Directive"])

export type Directive = {
	Validate(): $.GoError | globalThis.Promise<$.GoError>
}

$.registerInterfaceType(
	"dep.Directive",
	null,
	[{ name: "Validate", args: [], returns: [{ type: "error" }] }]
);

export async function Use(d: Directive | null): globalThis.Promise<boolean> {
	return (__goscriptAwait = (d !== null && (d as any).__isVarRef !== true && ((d as any).__goValue === undefined || (d as any).__goType?.charCodeAt(0) !== 42) ? (d as Exclude<Directive, null>) : $.pointerValue<Exclude<Directive, null>>(d)).Validate(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == null
}

export function Accept(d: Directive | null): boolean {
	return d != null
}

var __goscriptAwait: any
