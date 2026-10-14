// Generated file based on package_import_text_template.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as os from "@goscript/os/index.js"

import * as template from "@goscript/text/template/index.js"

import type * as io from "@goscript/io/index.js"
import "@goscript/os/index.js"
import "@goscript/text/template/index.js"

export class item {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Count(): number {
		return this._fields.Count
	}

	public set Count(value: number) {
		this._fields.Count = value
	}

	public _fields: {
		Name: string
		Count: number
	}

	constructor(init?: Partial<{Name?: string, Count?: number}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Count: init?.Count ?? (0 as number)
		}
	}

	public clone(): item {
		return $.markAsStructValue(new item(this))
	}

	public __goscriptAssign(source: item): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Count = values.Count
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
	let t: template.Template | $.VarRef<template.Template> | null = template.Must(...((await template.Template.prototype.Parse.call(template.New("x"), "{{range $i, $e := .}}{{$i}}:{{$e.Name}}={{$e.Count}}{{if gt $e.Count 1}} many{{end}}\n{{end}}")) as [template.Template | $.VarRef<template.Template> | null, $.GoError]))
	{
		let err = await template.Template.prototype.Execute.call(t, $.interfaceValue<io.Writer | null>(os.Stdout, "*os.File", /* @__PURE__ */ $.pointerType("os.File")), $.interfaceValue($.arrayToSlice<item>([$.markAsStructValue(new item({Name: "a", Count: 1})), $.markAsStructValue(new item({Name: "b", Count: 2}))]), "[]main.item", /* @__PURE__ */ $.sliceType("main.item")))
		if (err != null) {
			await $.println(await $.pointerValue<Exclude<$.GoError, null>>(err).Error())
		}
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}
