// Generated file based on conn_id_generator_methods.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type connRunner = {
	Add(_p0: number): void
}

$.registerInterfaceType(
	"main.connRunner",
	null,
	[{ name: "Add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }]
);

export type sourceRunner = {
	SourceOnly(_p0: number): void
}

$.registerInterfaceType(
	"main.sourceRunner",
	null,
	[{ name: "SourceOnly", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }]
);

export type connRunners = globalThis.Map<connRunner | null, connRunnerCallbacks> | null

$.registerNamedType("main.connRunners", /* @__PURE__ */ $.mapType("main.connRunner", "main.connRunnerCallbacks"));

$.registerNamedValueType(
	"main.connRunners",
	{AddConnectionID: (receiver: any, ...args: any[]) => (connRunners_AddConnectionID as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("AddConnectionID", [["id", /* @__PURE__ */ $.basicType("int")]])]
);

$.registerNamedValueType(
	"*main.connRunners",
	{AddConnectionID: (receiver: any, ...args: any[]) => (connRunners_AddConnectionID as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("AddConnectionID", [["id", /* @__PURE__ */ $.basicType("int")]])]
);

export class transport {
	public declare values: globalThis.Map<number, number> | null

	constructor(__goscriptValue?: boolean, values$?: globalThis.Map<number, number> | null) {
		this.values = values$ ?? (null! as globalThis.Map<number, number> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): transport {
		return new transport(true, this.values)
	}

	public __goscriptAssign(source: transport): this {
		this.values = source.values
		return this
	}

	public SourceOnly(id: number): void {
		const h: transport | $.VarRef<transport> | null = this;
		$.mapSet($.pointerValue<transport>(h).values, id, id)
	}

	static __typeInfo = $.registerStructType(
		"main.transport",
		() => new transport(),
		() => [{ name: "SourceOnly", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		transport,
		() => [{ name: "values", key: "values", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")) }]
	)
}

export class packetHandlerMap {
	public declare values: globalThis.Map<number, number> | null

	constructor(__goscriptValue?: boolean, values$?: globalThis.Map<number, number> | null) {
		this.values = values$ ?? (null! as globalThis.Map<number, number> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): packetHandlerMap {
		return new packetHandlerMap(true, this.values)
	}

	public __goscriptAssign(source: packetHandlerMap): this {
		this.values = source.values
		return this
	}

	public Add(id: number): void {
		const h: packetHandlerMap | $.VarRef<packetHandlerMap> | null = this;
		$.mapSet($.pointerValue<packetHandlerMap>(h).values, id, id)
	}

	static __typeInfo = $.registerStructType(
		"main.packetHandlerMap",
		() => new packetHandlerMap(),
		() => [{ name: "Add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		packetHandlerMap,
		() => [{ name: "values", key: "values", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")) }]
	)
}

export class connRunnerCallbacks {
	public declare AddConnectionID: ((_p0: number) => void) | null

	constructor(__goscriptValue?: boolean, AddConnectionID$?: ((_p0: number) => void) | null) {
		this.AddConnectionID = AddConnectionID$ ?? (null! as ((_p0: number) => void) | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): connRunnerCallbacks {
		return new connRunnerCallbacks(true, this.AddConnectionID)
	}

	public __goscriptAssign(source: connRunnerCallbacks): this {
		this.AddConnectionID = source.AddConnectionID
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.connRunnerCallbacks",
		() => new connRunnerCallbacks(),
		() => [],
		connRunnerCallbacks,
		() => [{ name: "AddConnectionID", key: "AddConnectionID", type: ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [] } as $.FunctionTypeInfo) }]
	)
}

export function connRunners_AddConnectionID(cr: connRunners, id: number): void {
	for (const [__rangeKey, c] of cr?.entries() ?? []) {
		c.AddConnectionID!(id)
	}
}

export function newConnRunnerCallbacks(runner: connRunner | null): connRunnerCallbacks {
	return new connRunnerCallbacks(true, $.functionValue((id: number) => {
		void (runner !== null && (runner as any).__isVarRef !== true && ((runner as any).__goValue === undefined || (runner as any).__goType?.charCodeAt(0) !== 42) ? (runner as Exclude<connRunner, null>) : $.pointerValue<Exclude<connRunner, null>>(runner)).Add(id)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [] } as $.FunctionTypeInfo)))
}

export async function testVarRefConversion(): globalThis.Promise<void> {
	let value = $.varRef(new transport(true, $.makeMap<number, number>()))
	let source = value
	let destination = $.unsafePointerCast<packetHandlerMap | $.VarRef<packetHandlerMap> | null>(source, packetHandlerMap)
	void (destination !== null && (destination as any).__isVarRef !== true && (destination as any).__goValue === undefined ? ((destination as any) as packetHandlerMap).Add(9) : packetHandlerMap.prototype.Add.call(destination, 9))
	value.value = value.value.__goscriptAssign(new transport(true, $.makeMap<number, number>()))
	void (destination !== null && (destination as any).__isVarRef !== true && (destination as any).__goValue === undefined ? ((destination as any) as packetHandlerMap).Add(10) : packetHandlerMap.prototype.Add.call(destination, 10))
	await $.println("varref destination:", $.mapGet<number, number, number>(value.value.values, 10, 0)[0])
}

export async function main(): globalThis.Promise<void> {
	let t = new transport(false, $.makeMap<number, number>())
	let t$: transport = t == null ? $.pointerTarget<transport>(t) : (t as any).__isVarRef === true ? (t as any).value : (t as any).__goValue === undefined ? (t as any) : $.pointerTarget<transport>(t)
	let runner = $.unsafePointerCast<packetHandlerMap | $.VarRef<packetHandlerMap> | null>(t, packetHandlerMap)
	void (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? ((t as any) as transport).SourceOnly(3) : transport.prototype.SourceOnly.call(t, 3))
	let runnerAgainDest = $.unsafePointerCast<packetHandlerMap | $.VarRef<packetHandlerMap> | null>(t, packetHandlerMap)
	let runners = $.makeMap<connRunner | null, connRunnerCallbacks>([[$.interfaceValue<connRunner | null>(runner, "*main.packetHandlerMap", /* @__PURE__ */ $.pointerType("main.packetHandlerMap")), newConnRunnerCallbacks($.interfaceValue<connRunner | null>(runner, "*main.packetHandlerMap", /* @__PURE__ */ $.pointerType("main.packetHandlerMap")))]])
	let sourceInterface: sourceRunner | null = $.interfaceValue<sourceRunner | null>(t, "*main.transport", /* @__PURE__ */ $.pointerType("main.transport"))
	let destinationInterface: connRunner | null = $.interfaceValue<connRunner | null>(runner, "*main.packetHandlerMap", /* @__PURE__ */ $.pointerType("main.packetHandlerMap"))
	connRunners_AddConnectionID(runners, 7)
	let runnerAgain = $.unsafePointerCast<transport | $.VarRef<transport> | null>(runner, transport)
	await $.println("source:", $.mapGet<number, number, number>((t$ as transport).values, 3, 0)[0])
	await $.println("same destination view:", (runner === runnerAgainDest || ($.pointerAliasesMade || (runner as any)?.__goElementBacking !== undefined) && $.pointerEqual(runner, runnerAgainDest)))
	await $.println("destination:", $.mapGet<number, number, number>((t$ as transport).values, 7, 0)[0])
	await $.println("same pointer:", (t === runnerAgain || ($.pointerAliasesMade || (t as any)?.__goElementBacking !== undefined) && $.pointerEqual(t, runnerAgain)))
	await $.println("boxed same pointer:", (t === runnerAgain || ($.pointerAliasesMade || (t as any)?.__goElementBacking !== undefined) && $.pointerEqual(t, runnerAgain)))
	void (__goscriptAwait = (sourceInterface !== null && (sourceInterface as any).__isVarRef !== true && ((sourceInterface as any).__goValue === undefined || (sourceInterface as any).__goType?.charCodeAt(0) !== 42) ? (sourceInterface as Exclude<sourceRunner, null>) : $.pointerValue<Exclude<sourceRunner, null>>(sourceInterface)).SourceOnly(4), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	void (__goscriptAwait = (destinationInterface !== null && (destinationInterface as any).__isVarRef !== true && ((destinationInterface as any).__goValue === undefined || (destinationInterface as any).__goType?.charCodeAt(0) !== 42) ? (destinationInterface as Exclude<connRunner, null>) : $.pointerValue<Exclude<connRunner, null>>(destinationInterface)).Add(8), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	let pointerValues = $.makeMap<transport | $.VarRef<transport> | null, number>([[t, 42]], /* @__PURE__ */ $.pointerType("main.transport"))
	await $.println("map lookup:", $.mapGet<transport | $.VarRef<transport> | null, number, number>(pointerValues, runnerAgain, 0)[0])
	await testVarRefConversion()
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
