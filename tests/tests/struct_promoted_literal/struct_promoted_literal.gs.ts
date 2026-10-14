// Generated file based on struct_promoted_literal.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Person {
	// Name is the person's name.
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	// Age is the person's age.
	public get Age(): number {
		return this._fields.Age
	}

	public set Age(value: number) {
		this._fields.Age = value
	}

	public _fields: {
		Name: string
		Age: number
	}

	constructor(init?: Partial<{Name?: string, Age?: number}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Age: init?.Age ?? (0 as number)
		}
	}

	public clone(): Person {
		return $.markAsStructValue(new Person(this))
	}

	static __typeInfo = $.registerStructType(
		"main.Person",
		() => new Person(),
		() => [],
		Person,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Age", key: "Age", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Employee {
	public get Person(): Person {
		return this._fields.Person
	}

	public set Person(value: Person) {
		this._fields.Person = value
	}

	// ID is the employee identifier.
	public get ID(): number {
		return this._fields.ID
	}

	public set ID(value: number) {
		this._fields.ID = value
	}

	public _fields: {
		Person: Person
		ID: number
	}

	constructor(init?: Partial<{Person?: Person, ID?: number}>) {
		this._fields = {
			Person: init?.Person ? $.markAsStructValue($.cloneStructValue(init.Person)) : $.markAsStructValue(new Person()),
			ID: init?.ID ?? (0 as number)
		}
	}

	public clone(): Employee {
		return $.markAsStructValue(new Employee(this))
	}

	static __typeInfo = $.registerStructType(
		"main.Employee",
		() => new Employee(),
		() => [],
		Employee,
		() => [{ name: "Person", key: "Person", type: "main.Person", anonymous: true }, { name: "ID", key: "ID", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Address {
	// Street is the street address.
	public get Street(): string {
		return this._fields.Street
	}

	public set Street(value: string) {
		this._fields.Street = value
	}

	// City is the city name.
	public get City(): string {
		return this._fields.City
	}

	public set City(value: string) {
		this._fields.City = value
	}

	public _fields: {
		Street: string
		City: string
	}

	constructor(init?: Partial<{Street?: string, City?: string}>) {
		this._fields = {
			Street: init?.Street ?? ("" as string),
			City: init?.City ?? ("" as string)
		}
	}

	public clone(): Address {
		return $.markAsStructValue(new Address(this))
	}

	static __typeInfo = $.registerStructType(
		"main.Address",
		() => new Address(),
		() => [],
		Address,
		() => [{ name: "Street", key: "Street", type: /* @__PURE__ */ $.basicType("string") }, { name: "City", key: "City", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Manager {
	public get Person(): Person {
		return this._fields.Person
	}

	public set Person(value: Person) {
		this._fields.Person = value
	}

	public get Address(): Address {
		return this._fields.Address
	}

	public set Address(value: Address) {
		this._fields.Address = value
	}

	// Phone is the contact number.
	public get Phone(): string {
		return this._fields.Phone
	}

	public set Phone(value: string) {
		this._fields.Phone = value
	}

	// Level is the management level.
	public get Level(): number {
		return this._fields.Level
	}

	public set Level(value: number) {
		this._fields.Level = value
	}

	public _fields: {
		Person: Person
		Address: Address
		Phone: string
		Level: number
	}

	constructor(init?: Partial<{Person?: Person, Address?: Address, Phone?: string, Level?: number}>) {
		this._fields = {
			Person: init?.Person ? $.markAsStructValue($.cloneStructValue(init.Person)) : $.markAsStructValue(new Person()),
			Address: init?.Address ? $.markAsStructValue($.cloneStructValue(init.Address)) : $.markAsStructValue(new Address()),
			Phone: init?.Phone ?? ("" as string),
			Level: init?.Level ?? (0 as number)
		}
	}

	public clone(): Manager {
		return $.markAsStructValue(new Manager(this))
	}

	static __typeInfo = $.registerStructType(
		"main.Manager",
		() => new Manager(),
		() => [],
		Manager,
		() => [{ name: "Person", key: "Person", type: "main.Person", anonymous: true }, { name: "Address", key: "Address", type: "main.Address", anonymous: true }, { name: "Phone", key: "Phone", type: /* @__PURE__ */ $.basicType("string") }, { name: "Level", key: "Level", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Team {
	public get Employee(): Employee {
		return this._fields.Employee
	}

	public set Employee(value: Employee) {
		this._fields.Employee = value
	}

	// Active records whether the team is enabled.
	public get Active(): boolean {
		return this._fields.Active
	}

	public set Active(value: boolean) {
		this._fields.Active = value
	}

	public _fields: {
		Employee: Employee
		Active: boolean
	}

	constructor(init?: Partial<{Employee?: Employee, Active?: boolean}>) {
		this._fields = {
			Employee: init?.Employee ? $.markAsStructValue($.cloneStructValue(init.Employee)) : $.markAsStructValue(new Employee()),
			Active: init?.Active ?? (false as boolean)
		}
	}

	public clone(): Team {
		return $.markAsStructValue(new Team(this))
	}

	static __typeInfo = $.registerStructType(
		"main.Team",
		() => new Team(),
		() => [],
		Team,
		() => [{ name: "Employee", key: "Employee", type: "main.Employee", anonymous: true }, { name: "Active", key: "Active", type: /* @__PURE__ */ $.basicType("bool") }]
	)
}

export class LiteralValue {
	// Value is the initialized value.
	public get Value(): any {
		return this._fields.Value
	}

	public set Value(value: any) {
		this._fields.Value = value
	}

	// Zero remains uninitialized.
	public get Zero(): any {
		return this._fields.Zero
	}

	public set Zero(value: any) {
		this._fields.Zero = value
	}

	public _fields: {
		Value: any
		Zero: any
	}

	constructor(init?: Partial<{Value?: any, Zero?: any}>) {
		this._fields = {
			Value: init?.Value ?? (null! as any),
			Zero: init?.Zero ?? (null! as any)
		}
	}

	public clone(): LiteralValue {
		return $.markAsStructValue(new LiteralValue(this))
	}

	static __typeInfo = $.registerStructType(
		"main.LiteralValue",
		() => new LiteralValue(),
		() => [],
		LiteralValue,
		() => [{ name: "Value", key: "Value", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Zero", key: "Zero", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export class LiteralContainer {
	public get LiteralValue(): LiteralValue {
		return this._fields.LiteralValue
	}

	public set LiteralValue(value: LiteralValue) {
		this._fields.LiteralValue = value
	}

	public _fields: {
		LiteralValue: LiteralValue
	}

	constructor(init?: Partial<{LiteralValue?: LiteralValue}>) {
		this._fields = {
			LiteralValue: init?.LiteralValue ? $.markAsStructValue($.cloneStructValue(init.LiteralValue)) : $.markAsStructValue(new LiteralValue({Value: null, Zero: null}))
		}
	}

	public clone(): LiteralContainer {
		return $.markAsStructValue(new LiteralContainer(this))
	}

	static __typeInfo = $.registerStructType(
		"main.LiteralContainer",
		() => new LiteralContainer(),
		() => [],
		LiteralContainer,
		() => [{ name: "LiteralValue", key: "LiteralValue", type: "main.LiteralValue", anonymous: true }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Calls interleaved across embeddings must keep their source order.
	let name: ((value: string) => string | globalThis.Promise<string>) | null = $.functionValue(async (value: string): globalThis.Promise<string> => {
		await $.println("evaluate", value)
		return value
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	let m = (await (async () => { const __goscriptStructLiteral0: Manager = new Manager(); __goscriptStructLiteral0.Person = $.markAsStructValue(new Person()); __goscriptStructLiteral0.Person.Name = await name!("promoted"); __goscriptStructLiteral0.Address = $.markAsStructValue(new Address()); __goscriptStructLiteral0.Address.City = await name!("city"); __goscriptStructLiteral0.Person.Age = 42; __goscriptStructLiteral0.Phone = await name!("phone"); __goscriptStructLiteral0.Address.Street = await name!("street"); return $.markAsStructValue(__goscriptStructLiteral0) })())
	await $.println(m.Person.Name, m.Person.Age, m.Address.Street, m.Address.City, m.Phone, m.Level)

	// Nested embeddings retain independent value copies and zero fields.
	let team: Team | $.VarRef<Team> | null = (() => { const __goscriptStructLiteral1: Team = new Team(); __goscriptStructLiteral1.Employee = $.markAsStructValue(new Employee()); __goscriptStructLiteral1.Employee.Person = $.markAsStructValue(new Person()); __goscriptStructLiteral1.Employee.Person.Name = "nested"; __goscriptStructLiteral1.Employee.ID = 7; __goscriptStructLiteral1.Active = true; return __goscriptStructLiteral1 })()
	let copy = $.markAsStructValue($.cloneStructValue($.pointerValue<Team>(team)))
	copy.Employee.Person.Name = "copy"
	await $.println($.pointerValue<Team>(team).Employee.Person.Name, copy.Employee.Person.Name, $.pointerValue<Team>(team).Employee.Person.Age, $.pointerValue<Team>(team).Employee.ID, $.pointerValue<Team>(team).Active)
	let items: $.Slice<Team | $.VarRef<Team> | null> = $.arrayToSlice<Team | $.VarRef<Team> | null>([(() => { const __goscriptStructLiteral2: Team = new Team(); __goscriptStructLiteral2.Employee = $.markAsStructValue(new Employee()); __goscriptStructLiteral2.Employee.Person = $.markAsStructValue(new Person()); __goscriptStructLiteral2.Employee.Person.Name = "inferred"; return __goscriptStructLiteral2 })()])
	await $.println($.pointerValue<Team>($.arrayIndex(items!, 0)).Employee.Person.Name, $.pointerValue<Team>($.arrayIndex(items!, 0)).Employee.ID)

	// Anonymous and generic structs use the same promoted field paths.
	let anonymous = (() => { const __goscriptStructLiteral3: {"Person": Person, "Enabled": boolean} = $.anonymousStructValue({"Person": $.markAsStructValue(new Person()), "Enabled": false}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Person", "main.Person", [0], 0, true, { anonymous: true }), /* @__PURE__ */ $.structField("Enabled", /* @__PURE__ */ $.basicType("bool"), [1], 24, true)] }); __goscriptStructLiteral3.Person = $.markAsStructValue(new Person()); __goscriptStructLiteral3.Person.Name = "anonymous"; __goscriptStructLiteral3.Enabled = true; return __goscriptStructLiteral3 })()
	await $.println(anonymous.Person.Name, anonymous.Person.Age, anonymous.Enabled)
	let text = (() => { const __goscriptStructLiteral4: LiteralContainer = new LiteralContainer(); __goscriptStructLiteral4.LiteralValue = $.markAsStructValue(new LiteralValue({Value: "", Zero: ""})); __goscriptStructLiteral4.LiteralValue.Value = "generic"; return $.markAsStructValue(__goscriptStructLiteral4) })()
	let wide = (() => { const __goscriptStructLiteral5: LiteralContainer = new LiteralContainer(); __goscriptStructLiteral5.LiteralValue = $.markAsStructValue(new LiteralValue({Value: 0n, Zero: 0n})); __goscriptStructLiteral5.LiteralValue.Value = 17n; return $.markAsStructValue(__goscriptStructLiteral5) })()
	await $.println(text.LiteralValue.Value, text.LiteralValue.Zero, wide.LiteralValue.Value, wide.LiteralValue.Zero)
}

if ($.isMainScript(import.meta)) {
	await main()
}
