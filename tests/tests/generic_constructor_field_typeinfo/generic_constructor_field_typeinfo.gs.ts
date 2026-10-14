// Generated file based on generic_constructor_field_typeinfo.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Block = {
	MarshalBlock(): [$.Slice<number>, $.GoError]
	UnmarshalBlock(_p0: $.Slice<number>): $.GoError
}

$.registerInterfaceType(
	"main.Block",
	null,
	[{ name: "MarshalBlock", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "UnmarshalBlock", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }] }]
);

export class blockType {
	public get typeID(): string {
		return this._fields.typeID
	}

	public set typeID(value: string) {
		this._fields.typeID = value
	}

	public get _constructor(): (() => any | globalThis.Promise<any>) | null {
		return this._fields._constructor
	}

	public set _constructor(value: (() => any | globalThis.Promise<any>) | null) {
		this._fields._constructor = value
	}

	public _fields: {
		typeID: string
		_constructor: (() => any | globalThis.Promise<any>) | null
	}

	constructor(init?: Partial<{typeID?: string, _constructor?: (() => any | globalThis.Promise<any>) | null}>) {
		this._fields = {
			typeID: init?.typeID ?? ("" as string),
			_constructor: init?._constructor ?? (null! as (() => any | globalThis.Promise<any>) | null)
		}
	}

	public clone(): blockType {
		return $.markAsStructValue(new blockType(this))
	}

	public async Constructor(__typeArgs: $.GenericTypeArgs | undefined): globalThis.Promise<Block | null> {
		const t: blockType | $.VarRef<blockType> | null = this;
		return $.typeParamInterfaceValue<Block | null>(await $.pointerValue<blockType>(t)._constructor!(), __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [$.methodSignature("MarshalBlock", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("UnmarshalBlock", [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["error"])] }, zero: () => null })
	}

	public GetBlockTypeID(__typeArgs: $.GenericTypeArgs | undefined): string {
		const t: blockType | $.VarRef<blockType> | null = this;
		return $.pointerValue<blockType>(t).typeID
	}

	static __typeInfo = $.registerStructType(
		"main.blockType",
		() => new blockType(),
		() => [{ name: "Constructor", args: [], returns: [{ type: "main.Block" }] }, { name: "GetBlockTypeID", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		blockType,
		() => [{ name: "typeID", key: "typeID", type: /* @__PURE__ */ $.basicType("string") }, { name: "constructor", key: "_constructor", type: ({ kind: $.TypeKind.Function, params: [], results: [{ kind: $.TypeKind.Interface, methods: [$.methodSignature("MarshalBlock", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("UnmarshalBlock", [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["error"])] }] } as $.FunctionTypeInfo) }]
	)
}

export class sampleBlock {
	public _fields: {
	}

	constructor(init?: Partial<{}>) {
		this._fields = {
		}
	}

	public clone(): sampleBlock {
		return $.markAsStructValue(new sampleBlock(this))
	}

	public MarshalBlock(): [$.Slice<number>, $.GoError] {
		return [new Uint8Array([1, 2, 3]) as $.Slice<number>, null]
	}

	public UnmarshalBlock(_p0: $.Slice<number>): $.GoError {
		return null
	}

	static __typeInfo = $.registerStructType(
		"main.sampleBlock",
		() => new sampleBlock(),
		() => [{ name: "MarshalBlock", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "UnmarshalBlock", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }] }],
		sampleBlock,
		() => []
	)
}

export function NewBlockType(__typeArgs: $.GenericTypeArgs | undefined, typeID: string, _constructor: (() => any | globalThis.Promise<any>) | null): blockType | $.VarRef<blockType> | null {
	return new blockType({typeID: typeID, _constructor: _constructor})
}

export async function main(): globalThis.Promise<void> {
	let bt: blockType | $.VarRef<blockType> | null = (NewBlockType(__goscriptStatic0(), "sample", $.functionValue((): sampleBlock | $.VarRef<sampleBlock> | null => {
		return new sampleBlock()
	}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.pointerType("main.sampleBlock")] } as $.FunctionTypeInfo))) as blockType | $.VarRef<blockType> | null)
	let blk = await blockType.prototype.Constructor.call(bt, __goscriptStatic0())
	let __goscriptTuple0: any = await $.pointerValue<Exclude<Block, null>>(blk).MarshalBlock()
	let data: $.Slice<number> = __goscriptTuple0[0]
	await $.println(blockType.prototype.GetBlockTypeID.call(bt, __goscriptStatic0()), $.len(data))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.pointerType("main.sampleBlock"), zero: () => null, methods: {MarshalBlock: (receiver: any, ...args: any[]) => $.pointerValue(receiver).MarshalBlock(...$.stripGenericTypeArgs(args)), UnmarshalBlock: (receiver: any, ...args: any[]) => $.pointerValue(receiver).UnmarshalBlock(...$.stripGenericTypeArgs(args))} }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
