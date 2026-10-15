// Generated file based on package_import_container_list.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as list from "@goscript/container/list/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as sync from "@goscript/sync/index.js"
import "@goscript/container/list/index.js"
import "@goscript/fmt/index.js"
import "@goscript/sync/index.js"

export class pooledElement {
	public get Value(): any {
		return this._fields.Value
	}

	public set Value(value: any) {
		this._fields.Value = value
	}

	public _fields: {
		Value: any
	}

	constructor(init?: Partial<{Value?: any}>, __goscriptValue?: boolean) {
		this._fields = {
			Value: init?.Value !== undefined ? $.copyElement(init.Value) : (null! as any)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): pooledElement {
		return new pooledElement(this, true)
	}

	public __goscriptAssign(source: pooledElement): void {
		const target = this._fields
		const values = source._fields
		target.Value = $.assignFieldValue(target.Value, values.Value, { kind: $.TypeKind.Interface, methods: [] })
	}

	static __typeInfo = $.registerStructType(
		"main.pooledElement",
		() => new pooledElement(),
		() => [],
		pooledElement,
		() => [{ name: "Value", key: "Value", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export async function printList(name: string, values: list.List | $.VarRef<list.List> | null): globalThis.Promise<void> {
	await fmt.Print(name)
	for (let element: list.Element | $.VarRef<list.Element> | null = (values !== null && (values as any).__isVarRef !== true && (values as any).__goValue === undefined ? ((values as any) as list.List).Front() : list.List.prototype.Front.call(values)); element != null; element = (element !== null && (element as any).__isVarRef !== true && (element as any).__goValue === undefined ? ((element as any) as list.Element).Next() : list.Element.prototype.Next.call(element))) {
		await fmt.Print(" ", $.pointerValue<list.Element>(element).Value)
	}
	await fmt.Println()
}

export function newElementPool(__typeArgs: $.GenericTypeArgs | undefined): sync.Pool | $.VarRef<sync.Pool> | null {
	return new sync.Pool({New: $.functionValue((): any => {
		return $.interfaceValue(new pooledElement({Value: $.genericZero(__typeArgs, "T", null)}), "*main.pooledElement", /* @__PURE__ */ $.pointerType("main.pooledElement"))
	}, ({ kind: $.TypeKind.Function, params: [], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo))})
}

export async function pushPooled(__typeArgs: $.GenericTypeArgs | undefined, pool: sync.Pool | $.VarRef<sync.Pool> | null, value: any): globalThis.Promise<pooledElement | $.VarRef<pooledElement> | null> {
	let element: pooledElement | $.VarRef<pooledElement> | null = $.mustTypeAssert<pooledElement | $.VarRef<pooledElement> | null>(await sync.Pool.prototype.Get.call($.pointerValue<sync.Pool>(pool)), /* @__PURE__ */ $.pointerType("main.pooledElement"))
	$.pointerValue<pooledElement>(element).Value = $.copyElement(value)
	return element
}

export async function main(): globalThis.Promise<void> {
	let values: list.List | $.VarRef<list.List> | null = list.New()
	let middle: list.Element | $.VarRef<list.Element> | null = (values !== null && (values as any).__isVarRef !== true && (values as any).__goValue === undefined ? ((values as any) as list.List).PushFront("middle") : list.List.prototype.PushFront.call(values, "middle"))
	let back: list.Element | $.VarRef<list.Element> | null = (values !== null && (values as any).__isVarRef !== true && (values as any).__goValue === undefined ? ((values as any) as list.List).PushBack("back") : list.List.prototype.PushBack.call(values, "back"))
	void (values !== null && (values as any).__isVarRef !== true && (values as any).__goValue === undefined ? ((values as any) as list.List).PushFront("front") : list.List.prototype.PushFront.call(values, "front"))
	await printList("seed", values)

	let boxed: any = $.interfaceValue(back, "*list.Element", /* @__PURE__ */ $.pointerType("list.Element"))
	list.List.prototype.MoveToFront.call(values, ((boxed as any)?.__goType === "*list.Element" && (boxed as any).__goValue === undefined && (boxed as any).__isTypedNil !== true ? ((boxed as any) as list.Element | $.VarRef<list.Element> | null) : $.mustTypeAssert<list.Element | $.VarRef<list.Element> | null>(boxed, /* @__PURE__ */ $.pointerType("list.Element"))))
	await printList("moved", values)

	await fmt.Println("removed", (values !== null && (values as any).__isVarRef !== true && (values as any).__goValue === undefined ? ((values as any) as list.List).Remove(middle) : list.List.prototype.Remove.call(values, middle)))
	await printList("final", values)
	let pool: sync.Pool | $.VarRef<sync.Pool> | null = newElementPool(__goscriptStatic0())
	let pooled: pooledElement | $.VarRef<pooledElement> | null = (await pushPooled(__goscriptStatic0(), pool, "pooled") as pooledElement | $.VarRef<pooledElement> | null)
	await fmt.Println("pool", $.pointerValue<pooledElement>(pooled).Value)
	sync.Pool.prototype.Put.call($.pointerValue<sync.Pool>(pool), $.interfaceValue(pooled, "*main.pooledElement", /* @__PURE__ */ $.pointerType("main.pooledElement")))
	await fmt.Println("pool-reused", $.pointerValue<pooledElement>(await pushPooled(__goscriptStatic0(), pool, "reused")).Value)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

if ($.isMainScript(import.meta)) {
	await main()
}
