// Generated file based on generic_receiver_type_param_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type nistPoint = {
	Add(__typeArgs: $.GenericTypeArgs | undefined, _p0: any, _p1: any): any | globalThis.Promise<any>
}

$.registerInterfaceType(
	"main.nistPoint",
	null,
	[{ name: "Add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }]
);

export class nistCurve {
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): nistCurve {
		return new nistCurve(this, true)
	}

	public __goscriptAssign(source: nistCurve): void {
	}

	public async Add(__typeArgs: $.GenericTypeArgs | undefined, p1: any, p2: any): globalThis.Promise<any> {
		const curve: nistCurve | $.VarRef<nistCurve> | null = this;
		return ((__goscriptAwait = $.callGenericMethod(__typeArgs, "Point", "Add", p1, $.copyElement(p1), $.copyElement(p2)), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as any)
	}

	public Zero(__typeArgs: $.GenericTypeArgs | undefined): any {
		const curve: nistCurve | $.VarRef<nistCurve> | null = this;
		let p: any = $.genericZero(__typeArgs, "Point", null)
		return $.copyElement(p)
	}

	static __typeInfo = $.registerStructType(
		"main.nistCurve",
		() => new nistCurve(),
		() => [{ name: "Add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: { kind: $.TypeKind.Interface, methods: [$.methodSignature("Add", [{ kind: $.TypeKind.Interface, methods: [] }, { kind: $.TypeKind.Interface, methods: [] }], [{ kind: $.TypeKind.Interface, methods: [] }])] } }], pointerReceiver: true }, { name: "Zero", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [$.methodSignature("Add", [{ kind: $.TypeKind.Interface, methods: [] }, { kind: $.TypeKind.Interface, methods: [] }], [{ kind: $.TypeKind.Interface, methods: [] }])] } }], pointerReceiver: true }],
		nistCurve,
		() => []
	)
}

export class point {
	public get N(): number {
		return this._fields.N
	}

	public set N(value: number) {
		this._fields.N = value
	}

	public _fields: {
		N: number
	}

	constructor(init?: Partial<{N?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			N: init?.N ?? (0 as number)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): point {
		return new point(this, true)
	}

	public __goscriptAssign(source: point): void {
		const target = this._fields
		const values = source._fields
		target.N = values.N
	}

	public Add(a: point | $.VarRef<point> | null, b: point | $.VarRef<point> | null): point | $.VarRef<point> | null {
		const p: point | $.VarRef<point> | null = this;
		return new point({N: $.pointerValue<point>(a).N + $.pointerValue<point>(b).N})
	}

	static __typeInfo = $.registerStructType(
		"main.point",
		() => new point(),
		() => [{ name: "Add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("main.point") }], pointerReceiver: true }],
		point,
		() => [{ name: "N", key: "N", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export let curve: nistCurve | $.VarRef<nistCurve> | null = new nistCurve()

export function __goscript_set_curve(__goscriptValue: nistCurve | $.VarRef<nistCurve> | null): void {
	curve = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	let p: point | $.VarRef<point> | null = (await nistCurve.prototype.Add.call(curve, __goscriptStatic0(), new point({N: 2}), new point({N: 3})) as point | $.VarRef<point> | null)
	await $.println("sum:", $.pointerValue<point>(p).N)
	if (nistCurve.prototype.Zero.call(curve, __goscriptStatic0()) == null) {
		await $.println("zero")
	}
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, Point: { type: /* @__PURE__ */ $.pointerType("main.point"), zero: () => null, methods: {Add: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Add(...$.stripGenericTypeArgs(args))} }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
