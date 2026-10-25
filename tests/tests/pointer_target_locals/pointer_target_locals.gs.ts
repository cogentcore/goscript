// Generated file based on pointer_target_locals.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Node {
	public declare Name: string

	public declare Count: number

	public declare Next: Node | $.VarRef<Node> | null

	constructor(__goscriptValue?: boolean, Name$?: string, Count$?: number, Next$?: Node | $.VarRef<Node> | null) {
		this.Name = Name$ ?? ""
		this.Count = Count$ ?? 0
		this.Next = Next$ ?? (null! as Node | $.VarRef<Node> | null)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Node {
		return new Node(true, this.Name, this.Count, this.Next)
	}

	public __goscriptAssign(source: Node): this {
		this.Name = source.Name
		this.Count = source.Count
		this.Next = source.Next
		return this
	}

	public Fill(name: string): void {
		const n: Node | $.VarRef<Node> | null = this;
		const n$: Node = n == null ? $.pointerTarget<Node>(n) : (n as any).__isVarRef === true ? (n as any).value : (n as any).__goValue === undefined ? (n as any) : $.pointerTarget<Node>(n);
		;(n$ as Node).Name = name;
		;(n$ as Node).Count = $.stringLen(name)
	}

	public Len(): number {
		const n: Node | $.VarRef<Node> | null = this;
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
	public declare items: $.Slice<Node>

	constructor(__goscriptValue?: boolean, items$?: $.Slice<Node>) {
		this.items = items$ ?? (null! as $.Slice<Node>)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Holder {
		return new Holder(true, this.items)
	}

	public __goscriptAssign(source: Holder): this {
		this.items = source.items
		return this
	}

	public touch(i: number): void {
		const h: Holder | $.VarRef<Holder> | null = this;
		let p = $.indexRef($.pointerValue<Holder>(h).items!, i)
		let p$: Node = p == null ? $.pointerTarget<Node>(p) : (p as any).__isVarRef === true ? (p as any).value : (p as any).__goValue === undefined ? (p as any) : $.pointerTarget<Node>(p);
		;(p$ as Node).Count += 10;
		;(p$ as Node).Name = (p$ as Node).Name + "!"
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
		return prefix + "nil"
	}
	return prefix + (n$ as Node).Name + ":" + $.runeToString($.int(48 + (n$ as Node).Count, 32))
}

export function deref(n: Node | $.VarRef<Node> | null): string {
	let msg = ""
	const __defer = new $.DisposableStack()
	try {
		__defer.defer(() => { (() => {
			{
				let r = $.recover()
				if (r != null) {
					msg = "recovered: " + ($.pointerValue<Exclude<$.GoError, null>>($.mustTypeAssert<$.GoError>(r, "error")).Error() as string)
				}
			}
		})() })
		void (n !== null && (n as any).__isVarRef !== true && (n as any).__goValue === undefined ? ((n as any) as Node).Fill("x") : Node.prototype.Fill.call(n, "x"))
		const __goscriptReturn0: string = $.pointerValue<Node>(n).Name
		msg = __goscriptReturn0
		__defer.dispose()
		return msg
		__defer.dispose()
	} catch (e) {
		__defer.disposePanic(e)
		if (!$.recovered(e)) {
			throw e
		}
	}
	return msg
}

export async function main(): globalThis.Promise<void> {
	let a = new Node(false, "a", undefined, new Node(false, "b"))
	let a$: Node = a == null ? $.pointerTarget<Node>(a) : (a as any).__isVarRef === true ? (a as any).value : (a as any).__goValue === undefined ? (a as any) : $.pointerTarget<Node>(a)
	await $.println((a !== null && (a as any).__isVarRef !== true && (a as any).__goValue === undefined ? ((a as any) as Node).Len() : Node.prototype.Len.call(a)), (a$ as Node).Count, $.pointerValue<Node>((a$ as Node).Next).Count)
	await $.println(Describe(a, "> "), Describe(null, "> "))
	let b = new Node()
	let b$: Node = b == null ? $.pointerTarget<Node>(b) : (b as any).__isVarRef === true ? (b as any).value : (b as any).__goValue === undefined ? (b as any) : $.pointerTarget<Node>(b)
	void (b !== null && (b as any).__isVarRef !== true && (b as any).__goValue === undefined ? ((b as any) as Node).Fill("hello") : Node.prototype.Fill.call(b, "hello"))
	await $.println((b$ as Node).Name, (b$ as Node).Count)
	await $.println(deref(null))
	let nn: Node | $.VarRef<Node> | null = null! as Node | $.VarRef<Node> | null
	await $.println((nn !== null && (nn as any).__isVarRef !== true && (nn as any).__goValue === undefined ? ((nn as any) as Node).Len() : Node.prototype.Len.call(nn)))

	let h = new Holder(false, $.arrayToSlice<Node>([new Node(true, "p"), new Node(true, "q")]))
	let h$: Holder = h == null ? $.pointerTarget<Holder>(h) : (h as any).__isVarRef === true ? (h as any).value : (h as any).__goValue === undefined ? (h as any) : $.pointerTarget<Holder>(h)
	void (h !== null && (h as any).__isVarRef !== true && (h as any).__goValue === undefined ? ((h as any) as Holder).touch(1) : Holder.prototype.touch.call(h, 1))
	await $.println($.arrayIndex((h$ as Holder).items!, 1).Name, $.arrayIndex((h$ as Holder).items!, 1).Count)
}

if ($.isMainScript(import.meta)) {
	await main()
}
