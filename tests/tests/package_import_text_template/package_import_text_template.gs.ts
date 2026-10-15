// Generated file based on package_import_text_template.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as os from "@goscript/os/index.js"

import * as template from "@goscript/text/template/index.js"

import type * as io from "@goscript/io/index.js"
import "@goscript/os/index.js"
import "@goscript/text/template/index.js"

export class item {
	public declare Name: string

	public declare Count: number

	constructor(init?: Partial<{Name?: string, Count?: number}>, __goscriptValue?: boolean) {
		this.Name = init?.Name ?? ("" as string)
		this.Count = init?.Count ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(this, true)
	}

	public __goscriptAssign(source: item): this {
		this.Name = source.Name
		this.Count = source.Count
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [],
		item,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [1], 16, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	let t = template.Must(...((await template.Template.prototype.Parse.call(template.New("x"), "{{range $i, $e := .}}{{$i}}:{{$e.Name}}={{$e.Count}}{{if gt $e.Count 1}} many{{end}}\n{{end}}")) as [template.Template | $.VarRef<template.Template> | null, $.GoError]))
	{
		let err = await template.Template.prototype.Execute.call(t, $.interfaceValue<io.Writer | null>(os.Stdout, "*os.File", /* @__PURE__ */ $.pointerType("os.File")), $.interfaceValue($.arrayToSlice<item>([new item({Name: "a", Count: 1}, true), new item({Name: "b", Count: 2}, true)]), "[]main.item", /* @__PURE__ */ $.sliceType("main.item")))
		if (err != null) {
			await $.println((__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
