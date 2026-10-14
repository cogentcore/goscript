// Generated file based on the_works.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Op = number

$.registerNamedValueType(
	"main.Op",
	{String: (receiver: any, ...args: any[]) => (Op_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Op",
	{String: (receiver: any, ...args: any[]) => (Op_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export type Report = {
	Program(): string
}

$.registerInterfaceType(
	"main.Report",
	null,
	[{ name: "Program", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class Instr {
	public get Op(): Op {
		return this._fields.Op
	}

	public set Op(value: Op) {
		this._fields.Op = value
	}

	public get Arg(): bigint {
		return this._fields.Arg
	}

	public set Arg(value: bigint) {
		this._fields.Arg = value
	}

	public _fields: {
		Op: Op
		Arg: bigint
	}

	constructor(init?: Partial<{Op?: Op, Arg?: bigint}>) {
		this._fields = {
			Op: init?.Op ?? (0 as Op),
			Arg: init?.Arg ?? (0n as bigint)
		}
	}

	public clone(): Instr {
		return $.markAsStructValue(new Instr(this))
	}

	public __goscriptAssign(source: Instr): void {
		const target = this._fields
		const values = source._fields
		target.Op = values.Op
		target.Arg = values.Arg
	}

	static __typeInfo = $.registerStructType(
		"main.Instr",
		() => new Instr(),
		() => [],
		Instr,
		() => [{ name: "Op", key: "Op", type: /* @__PURE__ */ $.basicType("int", "main.Op") }, { name: "Arg", key: "Arg", type: /* @__PURE__ */ $.basicType("int64") }]
	)
}

export class Program {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Code(): $.Slice<Instr> {
		return this._fields.Code
	}

	public set Code(value: $.Slice<Instr>) {
		this._fields.Code = value
	}

	public _fields: {
		Name: string
		Code: $.Slice<Instr>
	}

	constructor(init?: Partial<{Name?: string, Code?: $.Slice<Instr>}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Code: init?.Code ?? (null! as $.Slice<Instr>)
		}
	}

	public clone(): Program {
		return $.markAsStructValue(new Program(this))
	}

	public __goscriptAssign(source: Program): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Code = values.Code
	}

	public Listing(): ((_yield: ((_p0: number, _p1: Instr) => boolean | globalThis.Promise<boolean>) | null) => void) | null {
		const p = this;
		return $.functionValue(async (_yield: ((_p0: number, _p1: Instr) => boolean | globalThis.Promise<boolean>) | null): globalThis.Promise<void> => {
			for (let __goscriptRangeTarget0 = p.Code, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), pc = 0; pc < __goscriptRangeWindow0.length; pc++) {
				let _in = $.markAsStructValue($.cloneStructValue((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + pc] as Instr)))
				if (!(__goscriptAwait = _yield!(pc, $.markAsStructValue($.cloneStructValue(_in))), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)) {
					return
				}
			}
		}, ({ kind: $.TypeKind.Function, params: [({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), "main.Instr"], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo))
	}

	static __typeInfo = $.registerStructType(
		"main.Program",
		() => new Program(),
		() => [{ name: "Listing", args: [], returns: [{ type: ({ kind: $.TypeKind.Function, params: [({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), "main.Instr"], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo) }] }],
		Program,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Code", key: "Code", type: /* @__PURE__ */ $.sliceType("main.Instr") }]
	)
}

export class Stack {
	public get items(): $.Slice<any> {
		return this._fields.items
	}

	public set items(value: $.Slice<any>) {
		this._fields.items = value
	}

	public _fields: {
		items: $.Slice<any>
	}

	constructor(init?: Partial<{items?: $.Slice<any>}>) {
		this._fields = {
			items: init?.items ?? (null! as $.Slice<any>)
		}
	}

	public clone(): Stack {
		return $.markAsStructValue(new Stack(this))
	}

	public __goscriptAssign(source: Stack): void {
		const target = this._fields
		const values = source._fields
		target.items = values.items
	}

	public Pop(__typeArgs: $.GenericTypeArgs | undefined): any {
		let s: Stack | $.VarRef<Stack> | null = this;
		const s$ = $.pointerTarget<Stack>(s)
		if ($.sliceLen((s$ as Stack).items) == 0) {
			$.panic("stack underflow")
		}
		let v = $.copyElement($.arrayIndex((s$ as Stack).items!, $.sliceLen((s$ as Stack).items) - 1));
		;(s$ as Stack).items = $.goSlice((s$ as Stack).items, undefined, $.sliceLen((s$ as Stack).items) - 1)
		return $.copyElement(v)
	}

	public Push(__typeArgs: $.GenericTypeArgs | undefined, v: any): void {
		let s: Stack | $.VarRef<Stack> | null = this;
		const s$ = $.pointerTarget<Stack>(s);
		;(s$ as Stack).items = $.append((s$ as Stack).items, v, $.appendZero(() => ($.genericZero(__typeArgs, "T", null) as any)))
	}

	static __typeInfo = $.registerStructType(
		"main.Stack",
		() => new Stack(),
		() => [{ name: "Pop", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }], pointerReceiver: true }, { name: "Push", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		Stack,
		() => [{ name: "items", key: "items", type: /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] }) }]
	)
}

export class VM {
	public get pc(): number {
		return this._fields.pc
	}

	public set pc(value: number) {
		this._fields.pc = value
	}

	public get steps(): number {
		return this._fields.steps
	}

	public set steps(value: number) {
		this._fields.steps = value
	}

	public get stack(): Stack {
		return this._fields.stack
	}

	public set stack(value: Stack) {
		this._fields.stack = value
	}

	public _fields: {
		pc: number
		steps: number
		stack: Stack
	}

	constructor(init?: Partial<{pc?: number, steps?: number, stack?: Stack}>) {
		this._fields = {
			pc: init?.pc ?? (0 as number),
			steps: init?.steps ?? (0 as number),
			stack: init?.stack ? $.markAsStructValue($.cloneStructValue(init.stack)) : $.markAsStructValue(new Stack())
		}
	}

	public clone(): VM {
		return $.markAsStructValue(new VM(this))
	}

	public __goscriptAssign(source: VM): void {
		const target = this._fields
		const values = source._fields
		target.pc = values.pc
		target.steps = values.steps
		$.assignStruct(target.stack, values.stack)
	}

	public Step(code: $.Slice<Instr>): boolean {
		let vm: VM | $.VarRef<VM> | null = this;
		const vm$ = $.pointerTarget<VM>(vm)
		let _in = $.markAsStructValue($.cloneStructValue($.arrayIndex(code!, (vm$ as VM).pc)));
		;(vm$ as VM).pc++;
		;(vm$ as VM).steps++
		let s: Stack | $.VarRef<Stack> | null = $.fieldRef((vm$ as VM)._fields, "stack")
		switch (_in.Op) {
			case 0:
			{
				Stack.prototype.Push.call(s, __goscriptStatic0(), _in.Arg)
				break
			}
			case 1:
			{
				let v = (Stack.prototype.Pop.call(s, __goscriptStatic0()) as bigint)
				Stack.prototype.Push.call(s, __goscriptStatic0(), v)
				Stack.prototype.Push.call(s, __goscriptStatic0(), v)
				break
			}
			case 2:
			{
				let b = (Stack.prototype.Pop.call(s, __goscriptStatic0()) as bigint)
				let a = (Stack.prototype.Pop.call(s, __goscriptStatic0()) as bigint)
				Stack.prototype.Push.call(s, __goscriptStatic0(), a)
				Stack.prototype.Push.call(s, __goscriptStatic0(), b)
				Stack.prototype.Push.call(s, __goscriptStatic0(), a)
				break
			}
			case 3:
			{
				let b = (Stack.prototype.Pop.call(s, __goscriptStatic0()) as bigint)
				let a = (Stack.prototype.Pop.call(s, __goscriptStatic0()) as bigint)
				Stack.prototype.Push.call(s, __goscriptStatic0(), b)
				Stack.prototype.Push.call(s, __goscriptStatic0(), a)
				break
			}
			case 4:
			{
				Stack.prototype.Pop.call(s, __goscriptStatic0())
				break
			}
			case 5:
			{
				Stack.prototype.Push.call(s, __goscriptStatic0(), $.int64Sub(Stack.prototype.Pop.call(s, __goscriptStatic0()), 1n))
				break
			}
			case 6:
			{
				Stack.prototype.Push.call(s, __goscriptStatic0(), $.int64Add(Stack.prototype.Pop.call(s, __goscriptStatic0()), Stack.prototype.Pop.call(s, __goscriptStatic0())))
				break
			}
			case 7:
			{
				Stack.prototype.Push.call(s, __goscriptStatic0(), $.int64Mul(Stack.prototype.Pop.call(s, __goscriptStatic0()), Stack.prototype.Pop.call(s, __goscriptStatic0())))
				break
			}
			case 8:
			{
				if (Stack.prototype.Pop.call(s, __goscriptStatic0()) != 0n) {
					;(vm$ as VM).pc = $.int(_in.Arg)
				}
				break
			}
			case 9:
			{
				return true
				break
			}
		}
		return false
	}

	static __typeInfo = $.registerStructType(
		"main.VM",
		() => new VM(),
		() => [{ name: "Step", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }],
		VM,
		() => [{ name: "pc", key: "pc", type: /* @__PURE__ */ $.basicType("int") }, { name: "steps", key: "steps", type: /* @__PURE__ */ $.basicType("int") }, { name: "stack", key: "stack", type: "main.Stack" }]
	)
}

export class Answer {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Value(): bigint {
		return this._fields.Value
	}

	public set Value(value: bigint) {
		this._fields.Value = value
	}

	public get Steps(): number {
		return this._fields.Steps
	}

	public set Steps(value: number) {
		this._fields.Steps = value
	}

	public _fields: {
		Name: string
		Value: bigint
		Steps: number
	}

	constructor(init?: Partial<{Name?: string, Value?: bigint, Steps?: number}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Value: init?.Value ?? (0n as bigint),
			Steps: init?.Steps ?? (0 as number)
		}
	}

	public clone(): Answer {
		return $.markAsStructValue(new Answer(this))
	}

	public __goscriptAssign(source: Answer): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Value = values.Value
		target.Steps = values.Steps
	}

	public Program(): string {
		const a = this;
		return a.Name
	}

	static __typeInfo = $.registerStructType(
		"main.Answer",
		() => new Answer(),
		() => [{ name: "Program", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		Answer,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int64") }, { name: "Steps", key: "Steps", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Fault {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Reason(): string {
		return this._fields.Reason
	}

	public set Reason(value: string) {
		this._fields.Reason = value
	}

	public _fields: {
		Name: string
		Reason: string
	}

	constructor(init?: Partial<{Name?: string, Reason?: string}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Reason: init?.Reason ?? ("" as string)
		}
	}

	public clone(): Fault {
		return $.markAsStructValue(new Fault(this))
	}

	public __goscriptAssign(source: Fault): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Reason = values.Reason
	}

	public Program(): string {
		const f: Fault | $.VarRef<Fault> | null = this;
		return $.pointerValue<Fault>(f).Name
	}

	static __typeInfo = $.registerStructType(
		"main.Fault",
		() => new Fault(),
		() => [{ name: "Program", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		Fault,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Reason", key: "Reason", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export const Push: Op = 0

export const Dup: Op = 1

export const Over: Op = 2

export const Swap: Op = 3

export const Drop: Op = 4

export const Dec: Op = 5

export const Add: Op = 6

export const Mul: Op = 7

export const Jnz: Op = 8

export const Halt: Op = 9

export let opNames: globalThis.Map<Op, string> | null = $.makeMap<Op, string>([[0, "push"], [1, "dup"], [2, "over"], [3, "swap"], [4, "drop"], [5, "dec"], [6, "add"], [7, "mul"], [8, "jnz"], [9, "halt"]])

export function __goscript_set_opNames(__goscriptValue: globalThis.Map<Op, string> | null): void {
	opNames = __goscriptValue
}

export function Op_String(o: Op): string {
	return $.mapGet<Op, string, string>(opNames, o, "")[0]
}

export async function run(p: Program, answers: $.Channel<Answer> | null, faults: $.Channel<Fault | $.VarRef<Fault> | null> | null): globalThis.Promise<void> {
	const __defer = new $.AsyncDisposableStack()
	try {
		__defer.defer(async () => { await (async (): globalThis.Promise<void> => {
			{
				let r = $.recover()
				if (r != null) {
					await $.chanSend(faults, new Fault({Name: p.Name, Reason: $.mustTypeAssert<string>(r, /* @__PURE__ */ $.basicType("string"))}))
				}
			}
		})() })
		let vm: VM | $.VarRef<VM> | null = new VM()
		while (!VM.prototype.Step.call(vm, p.Code)) {
		}
		await $.chanSend(answers, (() => { const __goscriptLiteralField0 = $.pointerValue<VM>(vm).stack.Pop(__goscriptStatic0()); return $.markAsStructValue(new Answer({Name: p.Name, Value: __goscriptLiteralField0, Steps: $.pointerValue<VM>(vm).steps})) })())
		await __defer.dispose()
	} catch (e) {
		await __defer.disposePanic(e)
		if (!$.recovered(e)) {
			throw e
		}
	}
}

export function factorial(name: string, n: bigint): Program {
	return $.markAsStructValue(new Program({Name: name, Code: $.arrayToSlice<Instr>([$.markAsStructValue(new Instr({Op: 0, Arg: 1n})), $.markAsStructValue(new Instr({Op: 0, Arg: n})), $.markAsStructValue(new Instr({Op: 3, Arg: 0n})), $.markAsStructValue(new Instr({Op: 2, Arg: 0n})), $.markAsStructValue(new Instr({Op: 7, Arg: 0n})), $.markAsStructValue(new Instr({Op: 3, Arg: 0n})), $.markAsStructValue(new Instr({Op: 5, Arg: 0n})), $.markAsStructValue(new Instr({Op: 1, Arg: 0n})), $.markAsStructValue(new Instr({Op: 8, Arg: 2n})), $.markAsStructValue(new Instr({Op: 4, Arg: 0n})), $.markAsStructValue(new Instr({Op: 9, Arg: 0n}))])}))
}

export async function main(): globalThis.Promise<void> {
	let programs: $.Slice<Program> = $.arrayToSlice<Program>([$.markAsStructValue($.cloneStructValue(factorial("20!", 20n))), $.markAsStructValue($.cloneStructValue(factorial("21!", 21n))), $.markAsStructValue(new Program({Name: "broken", Code: $.arrayToSlice<Instr>([$.markAsStructValue(new Instr({Op: 0, Arg: 1n})), $.markAsStructValue(new Instr({Op: 6, Arg: 0n})), $.markAsStructValue(new Instr({Op: 9, Arg: 0n}))])}))])

	await $.println("listing of", $.arrayIndex(programs!, 0).Name)
	let __goscriptRangeReturn0 = false
	;await (async () => {
		await $.arrayIndex(programs!, 0).Listing()!(async (pc, _in) => {
			if ((_in.Op == 0) || (_in.Op == 8)) {
				await $.println(" ", pc, Op_String(_in.Op), _in.Arg)
				return true
			}
			await $.println(" ", pc, Op_String(_in.Op))
			return true
		})
	})()
	if (__goscriptRangeReturn0) {
		return
	}

	let answers: $.Channel<Answer> | null = $.makeChannel<Answer>(0, $.markAsStructValue(new Answer()), "both")
	let faults: $.Channel<Fault | $.VarRef<Fault> | null> | null = $.makeChannel<Fault | $.VarRef<Fault> | null>(0, null! as Fault | $.VarRef<Fault> | null, "both")
	for (let __goscriptRangeTarget1 = programs, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let p = $.markAsStructValue($.cloneStructValue((__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as Program)))
		queueMicrotask(async () => { await run($.markAsStructValue($.cloneStructValue(p)), answers, faults) })
	}

	let reports: globalThis.Map<string, Report | null> | null = $.makeMap<string, Report | null>()
	while ($.len(reports) < $.sliceLen(programs)) {
		const [__goscriptSelect0HasReturn, __goscriptSelect0Value] = await $.selectStatement<any, void>([
			{
				id: 0,
				isSend: false,
				channel: answers,
				onSelected: async (__goscriptSelect0Result) => {
					let a = __goscriptSelect0Result.value
					$.mapSet(reports, a.Name, $.interfaceValue<Report | null>($.markAsStructValue($.cloneStructValue(a)), "main.Answer", "main.Answer"))
				}
			},
			{
				id: 1,
				isSend: false,
				channel: faults,
				onSelected: async (__goscriptSelect0Result) => {
					let f = __goscriptSelect0Result.value
					$.mapSet(reports, $.pointerValue<Fault>(f).Name, $.interfaceValue<Report | null>(f, "*main.Fault", /* @__PURE__ */ $.pointerType("main.Fault")))
				}
			}
		], false)
		if (__goscriptSelect0HasReturn) {
			return __goscriptSelect0Value
		}
	}

	let totalSteps = 0
	for (let __goscriptRangeTarget2 = programs, __goscriptRangeWindow2 = $.sliceRange(__goscriptRangeTarget2), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow2.length; __rangeIndex++) {
		let p = $.markAsStructValue($.cloneStructValue((__goscriptRangeWindow2.backing[__goscriptRangeWindow2.offset + __rangeIndex] as Program)))
		{
			const __goscriptTypeSwitchValue = $.mapGet<string, Report | null, Report | null>(reports, p.Name, null)[0]
			switch (true) {
				case $.typeAssert<Answer>(__goscriptTypeSwitchValue, "main.Answer").ok:
					{
						let r: Answer = $.markAsStructValue($.cloneStructValue($.typeAssert<Answer>(__goscriptTypeSwitchValue, "main.Answer").value))
						totalSteps = totalSteps + (r.Steps)
						await $.println(r.Program(), "=", r.Value, "in", r.Steps, "steps")
					}
					break
				case $.typeAssert<Fault | $.VarRef<Fault> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("main.Fault")).ok:
					{
						let r: Fault | $.VarRef<Fault> | null = $.typeAssert<Fault | $.VarRef<Fault> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("main.Fault")).value
						await $.println(Fault.prototype.Program.call(r), "crashed:", $.pointerValue<Fault>(r).Reason)
					}
					break
			}
		}
	}
	await $.println("total steps:", totalSteps)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int64"), zero: () => 0n }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
