// Generated file based on method_async_call.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as sync from "@goscript/sync/index.js"

export class FileTracker {
	public declare mutex: sync.Mutex

	public declare lines: $.Slice<number>

	constructor(init?: Partial<{mutex?: sync.Mutex, lines?: $.Slice<number>}>, __goscriptValue?: boolean) {
		this.mutex = init?.mutex ? $.markAsStructValue($.cloneStructValue(init.mutex)) : $.markAsStructValue(new sync.Mutex())
		this.lines = init?.lines ?? (null! as $.Slice<number>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): FileTracker {
		return new FileTracker(this, true)
	}

	public __goscriptAssign(source: FileTracker): this {
		$.assignStruct(this.mutex, source.mutex)
		this.lines = source.lines
		return this
	}

	public AddLine(offset: number): void {
		let f: FileTracker | $.VarRef<FileTracker> | null = this;
		const f$: FileTracker = f == null ? $.pointerTarget<FileTracker>(f) : (f as any).__isVarRef === true ? (f as any).value : (f as any).__goValue === undefined ? (f as any) : $.pointerTarget<FileTracker>(f)
		void (f$ as FileTracker).mutex.Lock();
		;(f$ as FileTracker).lines = $.appendOne((f$ as FileTracker).lines, offset)
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
	public declare file: FileTracker | $.VarRef<FileTracker> | null

	constructor(init?: Partial<{file?: FileTracker | $.VarRef<FileTracker> | null}>, __goscriptValue?: boolean) {
		this.file = init?.file ?? (null! as FileTracker | $.VarRef<FileTracker> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Scanner {
		return new Scanner(this, true)
	}

	public __goscriptAssign(source: Scanner): this {
		this.file = source.file
		return this
	}

	public next(): void {
		const s: Scanner | $.VarRef<Scanner> | null = this;
		FileTracker.prototype.AddLine.call($.pointerValue<Scanner>(s).file, 10)
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
	let tracker = new FileTracker({lines: $.arrayToSlice<number>([])})
	let scanner = new Scanner({file: tracker})
	void (scanner !== null && (scanner as any).__isVarRef !== true && (scanner as any).__goValue === undefined ? ((scanner as any) as Scanner).next() : Scanner.prototype.next.call(scanner))
	await $.println($.sliceLen($.pointerValue<FileTracker>(tracker).lines))
}

if ($.isMainScript(import.meta)) {
	await main()
}
