// Generated file based on issue_119_interface_nil_value.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Animal = {
	Name(): string
}

$.registerInterfaceType(
	"main.Animal",
	null,
	[{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class Dog {
	public declare name: string

	constructor(__goscriptValue?: boolean, name$?: string) {
		this.name = name$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Dog {
		return new Dog(true, this.name)
	}

	public __goscriptAssign(source: Dog): this {
		this.name = source.name
		return this
	}

	public Name(): string {
		const d: Dog | $.VarRef<Dog> | null = this;
		if (d == null) {
			return "unknown dog"
		}
		return $.pointerValue<Dog>(d).name
	}

	static __typeInfo = $.registerStructType(
		"main.Dog",
		() => new Dog(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		Dog,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Cat {
	public declare name: string

	constructor(__goscriptValue?: boolean, name$?: string) {
		this.name = name$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Cat {
		return new Cat(true, this.name)
	}

	public __goscriptAssign(source: Cat): this {
		this.name = source.name
		return this
	}

	public Name(): string {
		const c: Cat | $.VarRef<Cat> | null = this;
		if (c == null) {
			return "unknown cat"
		}
		return $.pointerValue<Cat>(c).name
	}

	static __typeInfo = $.registerStructType(
		"main.Cat",
		() => new Cat(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		Cat,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export function FindDog(): Dog | $.VarRef<Dog> | null {
	return null
}

export function FindCat(): Cat | $.VarRef<Cat> | null {
	return new Cat(false, "Whiskers")
}

export function FindAnimal(): Animal | null {
	// This is a common bug pattern in Go:
	// dog is a *Dog with value nil
	// When assigned to Animal interface, the interface is NOT nil
	// because it has type *Dog (even though value is nil)
	{
		let dog = $.interfaceValue<Animal | null>(FindDog(), "*main.Dog", /* @__PURE__ */ $.pointerType("main.Dog"))
		if (dog != null) {
			// In Go, this branch IS taken because dog != nil
			// The interface has type=*Dog, value=nil
			return dog
		}
	}
	return $.interfaceValue<Animal | null>(FindCat(), "*main.Cat", /* @__PURE__ */ $.pointerType("main.Cat"))
}

export async function main(): globalThis.Promise<void> {
	let animal = FindAnimal()

	// Test 1: The interface should NOT be nil
	if (animal == null) {
		await $.println("animal is nil")
	} else {
		await $.println("animal is not nil")
	}

	// Test 2: Calling method on nil receiver should work
	// The method dispatch uses the type (*Dog) to find Name()
	// Then passes nil as the receiver
	await $.println((__goscriptAwait = (animal !== null && (animal as any).__isVarRef !== true && (animal as any).__goValue === undefined ? (animal as Exclude<Animal, null>) : $.pointerValue<Exclude<Animal, null>>(animal)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	let directNilDog: Dog | $.VarRef<Dog> | null = null! as Dog | $.VarRef<Dog> | null
	await $.println((directNilDog !== null && (directNilDog as any).__isVarRef !== true && (directNilDog as any).__goValue === undefined ? ((directNilDog as any) as Dog).Name() : Dog.prototype.Name.call(directNilDog)))

	// Test 3: Type assertions preserve the typed nil pointer
	{
		let __goscriptTuple0: any = $.typeAssertTuple<Dog | $.VarRef<Dog> | null>(animal, /* @__PURE__ */ $.pointerType("main.Dog"))
		let d: Dog | $.VarRef<Dog> | null = __goscriptTuple0[0]
		let ok = __goscriptTuple0[1]
		if (ok && (d == null)) {
			await $.println("typed nil dog assertion ok")
		} else {
			await $.println("typed nil dog assertion failed")
		}
	}
	{
		let __goscriptTuple1: any = $.typeAssertTuple<Cat | $.VarRef<Cat> | null>(animal, /* @__PURE__ */ $.pointerType("main.Cat"))
		let c: Cat | $.VarRef<Cat> | null = __goscriptTuple1[0]
		let ok = __goscriptTuple1[1]
		if (ok || (c != null)) {
			await $.println("typed nil cat assertion accepted")
		} else {
			await $.println("typed nil cat assertion rejected")
		}
	}

	// Test 4: Direct nil pointer to interface assignment
	let dog: Dog | $.VarRef<Dog> | null = null
	let a: Animal | null = $.interfaceValue<Animal | null>(dog, "*main.Dog", /* @__PURE__ */ $.pointerType("main.Dog"))

	if (a == null) {
		await $.println("a is nil")
	} else {
		await $.println("a is not nil")
	}

	// Test 5: Truly nil interface
	let b: Animal | null = null
	if (b == null) {
		await $.println("b is nil")
	} else {
		await $.println("b is not nil")
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
