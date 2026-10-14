// Generated file based on method_async_call.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as sync from "@goscript/sync/index.js"
import "@goscript/sync/index.js"

export class FileTracker {
	public get mutex(): sync.Mutex {
		return this._fields.mutex
	}

	public set mutex(value: sync.Mutex) {
		this._fields.mutex = value
	}

	public get lines(): $.Slice<number> {
		return this._fields.lines
	}

	public set lines(value: $.Slice<number>) {
		this._fields.lines = value
	}

	public _fields: {
		mutex: sync.Mutex
		lines: $.Slice<number>
	}

	constructor(init?: Partial<{mutex?: sync.Mutex, lines?: $.Slice<number>}>, __goscriptValue?: boolean) {
		this._fields = {
			mutex: init?.mutex ? $.markAsStructValue($.cloneStructValue(init.mutex)) : $.markAsStructValue(new sync.Mutex()),
			lines: init?.lines ?? (null! as $.Slice<number>)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): FileTracker {
		return new FileTracker(this, true)
	}

	public __goscriptAssign(source: FileTracker): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.mutex, values.mutex)
		target.lines = values.lines
	}

	public async AddLine(offset: number): globalThis.Promise<void> {
		let f: FileTracker | $.VarRef<FileTracker> | null = this;
		const f$ = $.pointerTarget<FileTracker>(f)
		await (f$ as FileTracker).mutex.Lock();
		;(f$ as FileTracker).lines = $.append((f$ as FileTracker).lines, offset)
		void (f$ as FileTracker).mutex.Unlock()
	}

	static __typeInfo = $.registerStructType(
		"main.FileTracker",
		() => new FileTracker(),
		() => [{ name: "AddLine", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		FileTracker,
		() => [{ name: "mutex", key: "mutex", type: "sync.Mutex" }, { name: "lines", key: "lines", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")) }]
	)
}

export class Scanner {
	public get file(): FileTracker | $.VarRef<FileTracker> | null {
		return this._fields.file
	}

	public set file(value: FileTracker | $.VarRef<FileTracker> | null) {
		this._fields.file = value
	}

	public _fields: {
		file: FileTracker | $.VarRef<FileTracker> | null
	}

	constructor(init?: Partial<{file?: FileTracker | $.VarRef<FileTracker> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			file: init?.file ?? (null! as FileTracker | $.VarRef<FileTracker> | null)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Scanner {
		return new Scanner(this, true)
	}

	public __goscriptAssign(source: Scanner): void {
		const target = this._fields
		const values = source._fields
		target.file = values.file
	}

	public async next(): globalThis.Promise<void> {
		const s: Scanner | $.VarRef<Scanner> | null = this;
		await FileTracker.prototype.AddLine.call($.pointerValue<Scanner>(s).file, 10)
	}

	static __typeInfo = $.registerStructType(
		"main.Scanner",
		() => new Scanner(),
		() => [{ name: "next", args: [], returns: [], pointerReceiver: true }],
		Scanner,
		() => [{ name: "file", key: "file", type: /* @__PURE__ */ $.pointerType("main.FileTracker") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let tracker: FileTracker | $.VarRef<FileTracker> | null = new FileTracker({lines: $.arrayToSlice<number>([])})
	let scanner: Scanner | $.VarRef<Scanner> | null = new Scanner({file: tracker})
	await Scanner.prototype.next.call(scanner)
	await $.println($.sliceLen($.pointerValue<FileTracker>(tracker).lines))
}

if ($.isMainScript(import.meta)) {
	await main()
}
