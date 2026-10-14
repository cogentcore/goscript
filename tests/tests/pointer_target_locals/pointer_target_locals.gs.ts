// Generated file based on pointer_target_locals.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Node {
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

	public get Next(): Node | $.VarRef<Node> | null {
		return this._fields.Next
	}

	public set Next(value: Node | $.VarRef<Node> | null) {
		this._fields.Next = value
	}

	public _fields: {
		Name: string
		Count: number
		Next: Node | $.VarRef<Node> | null
	}

	constructor(init?: Partial<{Name?: string, Count?: number, Next?: Node | $.VarRef<Node> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Count: init?.Count ?? (0 as number),
			Next: init?.Next ?? (null! as Node | $.VarRef<Node> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Node {
		return new Node(this, true)
	}

	public __goscriptAssign(source: Node): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Count = values.Count
		target.Next = values.Next
	}

	public Fill(name: string): void {
		let n: Node | $.VarRef<Node> | null = this;
		const n$: Node = n == null ? $.pointerTarget<Node>(n) : (n as any).__isVarRef === true ? (n as any).value : (n as any).__goValue === undefined ? (n as any) : $.pointerTarget<Node>(n);
		;(n$ as Node).Name = name;
		;(n$ as Node).Count = $.stringLen(name)
	}

	public Len(): number {
		let n: Node | $.VarRef<Node> | null = this;
		const n$: Node = n == null ? $.pointerTarget<Node>(n) : (n as any).__isVarRef === true ? (n as any).value : (n as any).__goValue === undefined ? (n as any) : $.pointerTarget<Node>(n)
		if (n == null) {
			return 0
		}
		;(n$ as Node).Count++
		return ((1 + Node.prototype.Len.call((n$ as Node).Next)) + (n$ as Node).Count) - (n$ as Node).Count
	}

	static __typeInfo = $.registerStructType(
		"main.Node",
		() => new Node(),
		() => [{ name: "Fill", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }, { name: "Len", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		Node,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Count", key: "Count", type: /* @__PURE__ */ $.basicType("int") }, { name: "Next", key: "Next", type: /* @__PURE__ */ $.pointerType("main.Node") }]
	)
}

export class Holder {
	public get items(): $.Slice<Node> {
		return this._fields.items
	}

	public set items(value: $.Slice<Node>) {
		this._fields.items = value
	}

	public _fields: {
		items: $.Slice<Node>
	}

	constructor(init?: Partial<{items?: $.Slice<Node>}>, __goscriptValue?: boolean) {
		this._fields = {
			items: init?.items ?? (null! as $.Slice<Node>)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Holder {
		return new Holder(this, true)
	}

	public __goscriptAssign(source: Holder): void {
		const target = this._fields
		const values = source._fields
		target.items = values.items
	}

	public touch(i: number): void {
		const h: Holder | $.VarRef<Holder> | null = this;
		let p: Node | $.VarRef<Node> | null = $.indexRef($.pointerValue<Holder>(h).items!, i)
		let p$: Node = p == null ? $.pointerTarget<Node>(p) : (p as any).__isVarRef === true ? (p as any).value : (p as any).__goValue === undefined ? (p as any) : $.pointerTarget<Node>(p);
		;(p$ as Node).Count = (p$ as Node).Count + (10);
		;(p$ as Node).Name = $.concatString((p$ as Node).Name, "!")
	}

	static __typeInfo = $.registerStructType(
		"main.Holder",
		() => new Holder(),
		() => [{ name: "touch", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		Holder,
		() => [{ name: "items", key: "items", type: /* @__PURE__ */ $.sliceType("main.Node") }]
	)
}

export function Describe(n: Node | $.VarRef<Node> | null, prefix: string): string {
	const n$: Node = n == null ? $.pointerTarget<Node>(n) : (n as any).__isVarRef === true ? (n as any).value : (n as any).__goValue === undefined ? (n as any) : $.pointerTarget<Node>(n)
	if (n == null) {
		return $.concatString(prefix, "nil")
	}
	return $.concatString(($.concatString(($.concatString(prefix, (n$ as Node).Name)), ":")), $.runeToString($.int(48 + (n$ as Node).Count, 32)))
}

export async function deref(n: Node | $.VarRef<Node> | null): globalThis.Promise<string> {
	let msg: string = ""
	const __defer = new $.AsyncDisposableStack()
	try {
		__defer.defer(async () => { await (async (): globalThis.Promise<void> => {
			{
				let r = $.recover()
				if (r != null) {
					msg = $.concatString("recovered: ", (__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>($.mustTypeAssert<$.GoError>(r, "error")).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
				}
			}
		})() })
		void (n !== null && (n as any).__isVarRef !== true && (n as any).__goValue === undefined ? (n as unknown as Node).Fill("x") : Node.prototype.Fill.call(n, "x"))
		const __goscriptReturn0: string = $.pointerValue<Node>(n).Name
		msg = __goscriptReturn0
		await __defer.dispose()
		return msg
		await __defer.dispose()
	} catch (e) {
		await __defer.disposePanic(e)
		if (!$.recovered(e)) {
			throw e
		}
	}
	return msg
}

export async function main(): globalThis.Promise<void> {
	let a: Node | $.VarRef<Node> | null = new Node({Name: "a", Next: new Node({Name: "b"})})
	let a$: Node = a == null ? $.pointerTarget<Node>(a) : (a as any).__isVarRef === true ? (a as any).value : (a as any).__goValue === undefined ? (a as any) : $.pointerTarget<Node>(a)
	await $.println((a !== null && (a as any).__isVarRef !== true && (a as any).__goValue === undefined ? (a as unknown as Node).Len() : Node.prototype.Len.call(a)), (a$ as Node).Count, $.pointerValue<Node>((a$ as Node).Next).Count)
	await $.println(Describe(a, "> "), Describe(null, "> "))
	let b: Node | $.VarRef<Node> | null = new Node()
	let b$: Node = b == null ? $.pointerTarget<Node>(b) : (b as any).__isVarRef === true ? (b as any).value : (b as any).__goValue === undefined ? (b as any) : $.pointerTarget<Node>(b)
	void (b !== null && (b as any).__isVarRef !== true && (b as any).__goValue === undefined ? (b as unknown as Node).Fill("hello") : Node.prototype.Fill.call(b, "hello"))
	await $.println((b$ as Node).Name, (b$ as Node).Count)
	await $.println(await deref(null))
	let nn: Node | $.VarRef<Node> | null = null! as Node | $.VarRef<Node> | null
	await $.println((nn !== null && (nn as any).__isVarRef !== true && (nn as any).__goValue === undefined ? (nn as unknown as Node).Len() : Node.prototype.Len.call(nn)))

	let h: Holder | $.VarRef<Holder> | null = new Holder({items: $.arrayToSlice<Node>([new Node({Name: "p"}, true), new Node({Name: "q"}, true)])})
	let h$: Holder = h == null ? $.pointerTarget<Holder>(h) : (h as any).__isVarRef === true ? (h as any).value : (h as any).__goValue === undefined ? (h as any) : $.pointerTarget<Holder>(h)
	void (h !== null && (h as any).__isVarRef !== true && (h as any).__goValue === undefined ? (h as unknown as Holder).touch(1) : Holder.prototype.touch.call(h, 1))
	await $.println($.arrayIndex((h$ as Holder).items!, 1).Name, $.arrayIndex((h$ as Holder).items!, 1).Count)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
