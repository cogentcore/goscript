// Generated file based on method_receiver_reassign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class item {
	public declare n: number

	constructor(__goscriptValue?: boolean, n$?: number) {
		this.n = n$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): item {
		return new item(true, this.n)
	}

	public __goscriptAssign(source: item): this {
		this.n = source.n
		return this
	}

	public addrDec(): number {
		const s = $.varRef<item>(this);
		s.value = s.value.__goscriptAssign(new item(true, s.value.n + 10))
		let ps = s
		let ps$: item = ps == null ? $.pointerTarget<item>(ps) : (ps as any).__isVarRef === true ? (ps as any).value : (ps as any).__goValue === undefined ? (ps as any) : $.pointerTarget<item>(ps);
		;(ps$ as item).n--
		return s.value.n
	}

	public dec(): item {
		let s: item = this;
		if (s.n > 0) {
			s = s.__goscriptAssign(new item(true, s.n - 1))
		}
		return (s).clone()
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [{ name: "addrDec", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "dec", args: [], returns: [{ type: "main.item" }] }],
		item,
		() => [{ name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class list {
	public declare n: number

	public declare next: list | $.VarRef<list> | null

	constructor(__goscriptValue?: boolean, n$?: number, next$?: list | $.VarRef<list> | null) {
		this.n = n$ ?? 0
		this.next = next$ ?? (null! as list | $.VarRef<list> | null)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): list {
		return new list(true, this.n, this.next)
	}

	public __goscriptAssign(source: list): this {
		this.n = source.n
		this.next = source.next
		return this
	}

	public add(n: number): list | $.VarRef<list> | null {
		let p: list | $.VarRef<list> | null = this;
		if (p == null) {
			p = new list()
		}
		$.pointerValue<list>(p).n += n
		return p
	}

	public addr(): $.VarRef<list | $.VarRef<list> | null> | null {
		const p = $.varRef<list | $.VarRef<list> | null>(this);
		p.value = $.pointerValue<list>(p.value).next
		let pp = p
		return pp
	}

	public last(): list | $.VarRef<list> | null {
		let p: list | $.VarRef<list> | null = this;
		while ($.pointerValue<list>(p).next != null) {
			p = $.pointerValue<list>(p).next
		}
		return p
	}

	public lastFunc(): list | $.VarRef<list> | null {
		let p: list | $.VarRef<list> | null = this;
		let step = $.functionValue((): boolean => {
			if ($.pointerValue<list>(p).next == null) {
				return false
			}
			p = $.pointerValue<list>(p).next
			return true
		}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo))
		while (step()) {
		}
		return p
	}

	public sum(): number {
		const p: list | $.VarRef<list> | null = this;
		const p$: list = p == null ? $.pointerTarget<list>(p) : (p as any).__isVarRef === true ? (p as any).value : (p as any).__goValue === undefined ? (p as any) : $.pointerTarget<list>(p)
		return (p$ as list).n + $.pointerValue<list>((p$ as list).next).n
	}

	static __typeInfo = $.registerStructType(
		"main.list",
		() => new list(),
		() => [{ name: "add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("main.list") }], pointerReceiver: true }, { name: "addr", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.pointerType("main.list")) }], pointerReceiver: true }, { name: "last", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("main.list") }], pointerReceiver: true }, { name: "lastFunc", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("main.list") }], pointerReceiver: true }, { name: "sum", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		list,
		() => [{ name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }, { name: "next", key: "next", type: /* @__PURE__ */ $.pointerType("main.list") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let original = new item(true, 2)
	let out = $.markAsStructValue($.cloneStructValue(original)).dec()
	await $.println("original:", original.n)
	await $.println("out:", out.n)
	await $.println("addrDec:", $.markAsStructValue($.cloneStructValue(original)).addrDec(), original.n)

	let l: list | $.VarRef<list> | null = null! as list | $.VarRef<list> | null
	l = (l !== null && (l as any).__isVarRef !== true && (l as any).__goValue === undefined ? ((l as any) as list).add(3) : list.prototype.add.call(l, 3))
	await $.println("add nil:", $.pointerValue<list>(l).n)
	await $.println("add again:", $.pointerEqual((l !== null && (l as any).__isVarRef !== true && (l as any).__goValue === undefined ? ((l as any) as list).add(4) : list.prototype.add.call(l, 4)), l), $.pointerValue<list>(l).n)

	$.pointerValue<list>(l).next = new list(false, 5, new list(false, 6))
	await $.println("last:", $.pointerValue<list>((l !== null && (l as any).__isVarRef !== true && (l as any).__goValue === undefined ? ((l as any) as list).last() : list.prototype.last.call(l))).n, $.pointerValue<list>(l).n)
	await $.println("lastFunc:", $.pointerValue<list>((l !== null && (l as any).__isVarRef !== true && (l as any).__goValue === undefined ? ((l as any) as list).lastFunc() : list.prototype.lastFunc.call(l))).n, $.pointerValue<list>(l).n)
	let pp = (l !== null && (l as any).__isVarRef !== true && (l as any).__goValue === undefined ? ((l as any) as list).addr() : list.prototype.addr.call(l))
	await $.println("addr:", $.pointerValue<list>(($.pointerValue<list | $.VarRef<list> | null>(pp))).n)
	pp!.value = l
	await $.println("addr set:", $.pointerValue<list>(($.pointerValue<list | $.VarRef<list> | null>(pp))).n, $.pointerValue<list>($.pointerValue<list>(l).next).n)
	await $.println("sum:", (l !== null && (l as any).__isVarRef !== true && (l as any).__goValue === undefined ? ((l as any) as list).sum() : list.prototype.sum.call(l)))
}

if ($.isMainScript(import.meta)) {
	await main()
}
