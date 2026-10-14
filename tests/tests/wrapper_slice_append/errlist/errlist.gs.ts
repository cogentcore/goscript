// Generated file based on errlist.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/wrapper_slice_append/errlist", ["errlist.ErrorList", "errlist.AStruct"])

export type ErrorList = $.Slice<string>

$.registerNamedType("errlist.ErrorList", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")));

$.registerNamedValueType(
	"*errlist.ErrorList",
	{Add: (receiver: any, ...args: any[]) => (ErrorList_Add as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Add", [["msg", /* @__PURE__ */ $.basicType("string")]])]
);

export class AStruct {
	public get Msg(): string {
		return this._fields.Msg
	}

	public set Msg(value: string) {
		this._fields.Msg = value
	}

	public _fields: {
		Msg: string
	}

	constructor(init?: Partial<{Msg?: string}>) {
		this._fields = {
			Msg: init?.Msg ?? ("" as string)
		}
	}

	public clone(): AStruct {
		return $.markAsStructValue(new AStruct(this))
	}

	public __goscriptAssign(source: AStruct): void {
		const target = this._fields
		const values = source._fields
		target.Msg = values.Msg
	}

	public Set(msg: string): void {
		let a: AStruct | $.VarRef<AStruct> | null = this;
		$.pointerValue<AStruct>(a).Msg = msg
	}

	static __typeInfo = $.registerStructType(
		"errlist.AStruct",
		() => new AStruct(),
		() => [{ name: "Set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		AStruct,
		() => [{ name: "Msg", key: "Msg", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export function ErrorList_Add(p: $.VarRef<ErrorList> | null, msg: string): void {
	p!.value = ($.append(($.pointerValue<ErrorList>(p) as ErrorList), msg) as ErrorList)
}
