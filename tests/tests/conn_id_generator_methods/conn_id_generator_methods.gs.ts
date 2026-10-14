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
	public get values(): globalThis.Map<number, number> | null {
		return this._fields.values
	}

	public set values(value: globalThis.Map<number, number> | null) {
		this._fields.values = value
	}

	public _fields: {
		values: globalThis.Map<number, number> | null
	}

	constructor(init?: Partial<{values?: globalThis.Map<number, number> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			values: init?.values ?? (null! as globalThis.Map<number, number> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): transport {
		return new transport(this, true)
	}

	public __goscriptAssign(source: transport): void {
		const target = this._fields
		const values = source._fields
		target.values = values.values
	}

	public SourceOnly(id: number): void {
		let h: transport | $.VarRef<transport> | null = this;
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
	public get values(): globalThis.Map<number, number> | null {
		return this._fields.values
	}

	public set values(value: globalThis.Map<number, number> | null) {
		this._fields.values = value
	}

	public _fields: {
		values: globalThis.Map<number, number> | null
	}

	constructor(init?: Partial<{values?: globalThis.Map<number, number> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			values: init?.values ?? (null! as globalThis.Map<number, number> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): packetHandlerMap {
		return new packetHandlerMap(this, true)
	}

	public __goscriptAssign(source: packetHandlerMap): void {
		const target = this._fields
		const values = source._fields
		target.values = values.values
	}

	public Add(id: number): void {
		let h: packetHandlerMap | $.VarRef<packetHandlerMap> | null = this;
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
	public get AddConnectionID(): ((_p0: number) => void) | null {
		return this._fields.AddConnectionID
	}

	public set AddConnectionID(value: ((_p0: number) => void) | null) {
		this._fields.AddConnectionID = value
	}

	public _fields: {
		AddConnectionID: ((_p0: number) => void) | null
	}

	constructor(init?: Partial<{AddConnectionID?: ((_p0: number) => void) | null}>, __goscriptValue?: boolean) {
		this._fields = {
			AddConnectionID: init?.AddConnectionID ?? (null! as ((_p0: number) => void) | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): connRunnerCallbacks {
		return new connRunnerCallbacks(this, true)
	}

	public __goscriptAssign(source: connRunnerCallbacks): void {
		const target = this._fields
		const values = source._fields
		target.AddConnectionID = values.AddConnectionID
	}

	static __typeInfo = $.registerStructType(
		"main.connRunnerCallbacks",
		() => new connRunnerCallbacks(),
		() => [],
		connRunnerCallbacks,
		() => [{ name: "AddConnectionID", key: "AddConnectionID", type: ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [] } as $.FunctionTypeInfo) }]
	)
}

export async function connRunners_AddConnectionID(cr: connRunners, id: number): globalThis.Promise<void> {
	for (const [__rangeKey, c] of cr?.entries() ?? []) {
		void (__goscriptAwait = c.AddConnectionID!(id), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	}
}

export function newConnRunnerCallbacks(runner: connRunner | null): connRunnerCallbacks {
	return new connRunnerCallbacks({AddConnectionID: $.functionValue(async (id: number): globalThis.Promise<void> => {
		void (__goscriptAwait = $.pointerValue<Exclude<connRunner, null>>(runner).Add(id), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [] } as $.FunctionTypeInfo))}, true)
}

export async function testVarRefConversion(): globalThis.Promise<void> {
	let value = $.varRef(new transport({values: $.makeMap<number, number>()}, true))
	let source: transport | $.VarRef<transport> | null = value
	let destination: packetHandlerMap | $.VarRef<packetHandlerMap> | null = $.unsafePointerCast<packetHandlerMap | $.VarRef<packetHandlerMap> | null>(source, packetHandlerMap)
	packetHandlerMap.prototype.Add.call(destination, 9)
	value.value = $.assignStruct(value.value, new transport({values: $.makeMap<number, number>()}, true))
	packetHandlerMap.prototype.Add.call(destination, 10)
	await $.println("varref destination:", $.mapGet<number, number, number>(value.value.values, 10, 0)[0])
}

export async function main(): globalThis.Promise<void> {
	let t: transport | $.VarRef<transport> | null = new transport({values: $.makeMap<number, number>()})
	let t$: transport = t == null ? $.pointerTarget<transport>(t) : (t as any).__isVarRef === true ? (t as any).value : (t as any).__goValue === undefined ? (t as any) : $.pointerTarget<transport>(t)
	let runner: packetHandlerMap | $.VarRef<packetHandlerMap> | null = $.unsafePointerCast<packetHandlerMap | $.VarRef<packetHandlerMap> | null>(t, packetHandlerMap)
	transport.prototype.SourceOnly.call(t, 3)
	let runnerAgainDest: packetHandlerMap | $.VarRef<packetHandlerMap> | null = $.unsafePointerCast<packetHandlerMap | $.VarRef<packetHandlerMap> | null>(t, packetHandlerMap)
	let runners: connRunners = $.makeMap<connRunner | null, connRunnerCallbacks>([[$.interfaceValue<connRunner | null>(runner, "*main.packetHandlerMap", /* @__PURE__ */ $.pointerType("main.packetHandlerMap")), newConnRunnerCallbacks($.interfaceValue<connRunner | null>(runner, "*main.packetHandlerMap", /* @__PURE__ */ $.pointerType("main.packetHandlerMap")))]])
	let sourceInterface: sourceRunner | null = $.interfaceValue<sourceRunner | null>(t, "*main.transport", /* @__PURE__ */ $.pointerType("main.transport"))
	let destinationInterface: connRunner | null = $.interfaceValue<connRunner | null>(runner, "*main.packetHandlerMap", /* @__PURE__ */ $.pointerType("main.packetHandlerMap"))
	await connRunners_AddConnectionID(runners, 7)
	let runnerAgain: transport | $.VarRef<transport> | null = $.unsafePointerCast<transport | $.VarRef<transport> | null>(runner, transport)
	await $.println("source:", $.mapGet<number, number, number>((t$ as transport).values, 3, 0)[0])
	await $.println("same destination view:", $.pointerEqual(runner, runnerAgainDest))
	await $.println("destination:", $.mapGet<number, number, number>((t$ as transport).values, 7, 0)[0])
	await $.println("same pointer:", $.pointerEqual(t, runnerAgain))
	await $.println("boxed same pointer:", $.pointerEqual(t, runnerAgain))
	void (__goscriptAwait = $.pointerValue<Exclude<sourceRunner, null>>(sourceInterface).SourceOnly(4), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	void (__goscriptAwait = $.pointerValue<Exclude<connRunner, null>>(destinationInterface).Add(8), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	let pointerValues: globalThis.Map<transport | $.VarRef<transport> | null, number> | null = $.makeMap<transport | $.VarRef<transport> | null, number>([[t, 42]], /* @__PURE__ */ $.pointerType("main.transport"))
	await $.println("map lookup:", $.mapGet<transport | $.VarRef<transport> | null, number, number>(pointerValues, runnerAgain, 0)[0])
	await testVarRefConversion()
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
