// Generated file based on storage.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_methods from "./methods.gs.ts"
import "./methods.gs.ts"

export class storage {
	public get bytes(): $.Slice<number> {
		return this._fields.bytes
	}

	public set bytes(value: $.Slice<number>) {
		this._fields.bytes = value
	}

	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	public _fields: {
		bytes: $.Slice<number>
		name: string
	}

	constructor(init?: Partial<{bytes?: $.Slice<number>, name?: string}>) {
		this._fields = {
			bytes: init?.bytes ?? (null! as $.Slice<number>),
			name: init?.name ?? ("" as string)
		}
	}

	public clone(): storage {
		return $.markAsStructValue(new storage(this))
	}

	public __goscriptAssign(source: storage): void {
		const target = this._fields
		const values = source._fields
		target.bytes = values.bytes
		target.name = values.name
	}

	public IsEmpty(): boolean {
		const s: storage | $.VarRef<storage> | null = this;
		return $.sliceLen($.pointerValue<storage>(s).bytes) == 0
	}

	public Len(): number {
		const s: storage | $.VarRef<storage> | null = this;
		return $.sliceLen($.pointerValue<storage>(s).bytes)
	}

	public Name(): string {
		const s: storage | $.VarRef<storage> | null = this;
		return $.pointerValue<storage>(s).name
	}

	public SetName(name: string): void {
		let s: storage | $.VarRef<storage> | null = this;
		$.pointerValue<storage>(s).name = name
	}

	public Truncate(): void {
		let s: storage | $.VarRef<storage> | null = this;
		$.pointerValue<storage>(s).bytes = $.makeSlice<number>(0, undefined, "byte")
	}

	static __typeInfo = $.registerStructType(
		"main.storage",
		() => new storage(),
		() => [{ name: "IsEmpty", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "Len", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }, { name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "SetName", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }, { name: "Truncate", args: [], returns: [], pointerReceiver: true }],
		storage,
		() => [{ name: "bytes", key: "bytes", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let s: storage | $.VarRef<storage> | null = new storage({bytes: $.makeSlice<number>(5, undefined, "byte"), name: "test"})

	await $.println("Name:", storage.prototype.Name.call(s))
	await $.println("Length:", storage.prototype.Len.call(s))
	await $.println("Empty:", storage.prototype.IsEmpty.call(s))

	storage.prototype.Truncate.call(s)
	await $.println("Length after truncate:", storage.prototype.Len.call(s))

	storage.prototype.SetName.call(s, "new_name")
	await $.println("New name:", storage.prototype.Name.call(s))
}

if ($.isMainScript(import.meta)) {
	await main()
}
