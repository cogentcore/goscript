import * as $ from "@goscript/builtin/index.js";
import { CompareAndSwapPointer, LoadPointer, StorePointer, SwapPointer } from "./doc.gs.js";

import * as unsafe from "@goscript/unsafe/index.js"

// Pointer type for use in efaceWords
type Pointer = any;

// firstStoreInProgress is a placeholder value used during the first store operation
const firstStoreInProgress = Symbol('firstStoreInProgress');

export class Value {
	public declare v: null | any

	constructor(init?: Partial<{v?: null | any}>) {
		this.v = init?.v ?? null
	}

	public clone(): Value {
		const cloned = new Value()
		cloned.v = this.v
		return cloned
	}

	// Load returns the value set by the most recent Store.
	// It returns nil if there has been no call to Store for this Value.
	public Load(): null | any {
		const v = this
		// For JavaScript, we can simplify this since we're single-threaded
		// Just return the stored value directly
		return v.v
	}

	// Store sets the value of the [Value] v to val.
	// All calls to Store for a given Value must use values of the same concrete type.
	// Store of an inconsistent type panics, as does Store(nil).
	public Store(val: null | any): void {
		const v = this
		if (val == null) {
			$.panic("sync/atomic: store of nil value into Value")
		}
		// For JavaScript, store the value directly
		v.v = val
	}

	// Swap stores new into Value and returns the previous value. It returns nil if
	// the Value is empty.
	//
	// All calls to Swap for a given Value must use values of the same concrete
	// type. Swap of an inconsistent type panics, as does Swap(nil).
	public Swap(_new: null | any): null | any {
		const v = this
		if (_new == null) {
			$.panic("sync/atomic: swap of nil value into Value")
		}
		// For JavaScript, swap the values directly
		const old = v.v
		v.v = _new
		return old
	}

	// CompareAndSwap executes the compare-and-swap operation for the [Value].
	//
	// All calls to CompareAndSwap for a given Value must use values of the same
	// concrete type. CompareAndSwap of an inconsistent type panics, as does
	// CompareAndSwap(old, nil).
	public CompareAndSwap(old: null | any, _new: null | any): boolean {
		const v = this
		if (_new == null) {
			$.panic("sync/atomic: compare and swap of nil value into Value")
		}
		// For JavaScript, compare and swap directly
		if (v.v === old) {
			v.v = _new
			return true
		}
		return false
	}

	// Register this type with the runtime type system
	static __typeInfo = $.registerStructType(
	  'atomic.Value',
	  new Value(),
	  [{ name: "Load", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }, { name: "Store", args: [{ name: "val", type: { kind: $.TypeKind.Interface, methods: [] } }], returns: [] }, { name: "Swap", args: [{ name: "new", type: { kind: $.TypeKind.Interface, methods: [] } }], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }, { name: "CompareAndSwap", args: [{ name: "old", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "new", type: { kind: $.TypeKind.Interface, methods: [] } }], returns: [{ type: { kind: $.TypeKind.Basic, name: "boolean" } }] }],
	  Value,
	  [{ name: "v", key: "v", type: { kind: $.TypeKind.Interface, methods: [] } }]
	);
}

class efaceWords {
	public declare typ: Pointer

	public declare data: Pointer

	constructor(init?: Partial<{data?: Pointer, typ?: Pointer}>) {
		this.typ = init?.typ ?? null
		this.data = init?.data ?? null
	}

	public clone(): efaceWords {
		const cloned = new efaceWords()
		cloned.typ = this.typ
		cloned.data = this.data
		return cloned
	}

	// Register this type with the runtime type system
	static __typeInfo = $.registerStructType(
	  'atomic.efaceWords',
	  new efaceWords(),
	  [],
	  efaceWords,
	  [{ name: "data", key: "data", type: { kind: $.TypeKind.Basic, name: "Pointer" } }, { name: "typ", key: "typ", type: { kind: $.TypeKind.Basic, name: "Pointer" } }]
	);
}

// runtime_procPin Runtime functions for pinning/unpinning (no-ops in JavaScript).
export function runtime_procPin(): number {
	return 0; // No-op in JavaScript
}

export function runtime_procUnpin(): void {
	// No-op in JavaScript
}

