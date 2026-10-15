// Generated file based on nullable_function_param_call.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as os from "@goscript/os/index.js"
import "@goscript/os/index.js"

export type FileInfo = {
	IsDir(): boolean
	Name(): string
	Size(): bigint
}

$.registerInterfaceType(
	"main.FileInfo",
	null,
	[{ name: "IsDir", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "Size", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int64") }] }]
);

export type WalkFunc = ((path: string, info: FileInfo | null, err: $.GoError) => $.GoError | globalThis.Promise<$.GoError>) | null

export type Filesystem = {
	ReadDir(path: string): [$.Slice<FileInfo | null>, $.GoError]
}

$.registerInterfaceType(
	"main.Filesystem",
	null,
	[{ name: "ReadDir", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType("main.FileInfo") }, { type: "error" }] }]
);

export type ProcessFunc = ((data: string) => [string, $.GoError] | globalThis.Promise<[string, $.GoError]>) | null

export type OptionalProcessFunc = ((data: string) => [string, $.GoError] | globalThis.Promise<[string, $.GoError]>) | null

export class MockFileInfo {
	public declare name: string

	public declare size: bigint

	public declare isDir: boolean

	constructor(init?: Partial<{name?: string, size?: bigint, isDir?: boolean}>, __goscriptValue?: boolean) {
		this.name = init?.name ?? ("" as string)
		this.size = init?.size ?? (0n as bigint)
		this.isDir = init?.isDir ?? (false as boolean)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MockFileInfo {
		return new MockFileInfo(this, true)
	}

	public __goscriptAssign(source: MockFileInfo): this {
		this.name = source.name
		this.size = source.size
		this.isDir = source.isDir
		return this
	}

	public IsDir(): boolean {
		const m: MockFileInfo | $.VarRef<MockFileInfo> | null = this;
		return $.pointerValue<MockFileInfo>(m).isDir
	}

	public Name(): string {
		const m: MockFileInfo | $.VarRef<MockFileInfo> | null = this;
		return $.pointerValue<MockFileInfo>(m).name
	}

	public Size(): bigint {
		const m: MockFileInfo | $.VarRef<MockFileInfo> | null = this;
		return $.pointerValue<MockFileInfo>(m).size
	}

	static __typeInfo = $.registerStructType(
		"main.MockFileInfo",
		() => new MockFileInfo(),
		() => [{ name: "IsDir", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Size", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int64") }], pointerReceiver: true }],
		MockFileInfo,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }, { name: "size", key: "size", type: /* @__PURE__ */ $.basicType("int64") }, { name: "isDir", key: "isDir", type: /* @__PURE__ */ $.basicType("bool") }]
	)
}

export class MockFilesystem {
	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MockFilesystem {
		return new MockFilesystem(this, true)
	}

	public __goscriptAssign(source: MockFilesystem): this {
		return this
	}

	public ReadDir(path: string): [$.Slice<FileInfo | null>, $.GoError] {
		const m: MockFilesystem | $.VarRef<MockFilesystem> | null = this;
		return [$.arrayToSlice<FileInfo | null>([$.interfaceValue<FileInfo | null>(new MockFileInfo({name: "file1.txt", size: 100n, isDir: false}), "*main.MockFileInfo", /* @__PURE__ */ $.pointerType("main.MockFileInfo")), $.interfaceValue<FileInfo | null>(new MockFileInfo({name: "subdir", size: 0n, isDir: true}), "*main.MockFileInfo", /* @__PURE__ */ $.pointerType("main.MockFileInfo"))]), null]
	}

	static __typeInfo = $.registerStructType(
		"main.MockFilesystem",
		() => new MockFilesystem(),
		() => [{ name: "ReadDir", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType("main.FileInfo") }, { type: "error" }], pointerReceiver: true }],
		MockFilesystem,
		() => []
	)
}

export let SkipDir: $.GoError = os.ErrNotExist

export function __goscript_set_SkipDir(__goscriptValue: $.GoError): void {
	SkipDir = __goscriptValue
}

export async function walk(fs: Filesystem | null, path: string, info: FileInfo | null, walkFn: ((path: string, info: FileInfo | null, err: $.GoError) => $.GoError | globalThis.Promise<$.GoError>) | null): globalThis.Promise<$.GoError> {
	// Test case 1: Direct call to nullable function parameter
	// This should generate: walkFn!(path, info, nil)
	// But currently generates: walkFn(path, info, nil) - missing !
	let err = (__goscriptAwait = walkFn!(path, info, null), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	if ((err != null) && (!$.comparableEqual(err, SkipDir))) {
		return err
	}

	// Test case 2: Call with error parameter
	let walkErr: $.GoError = null
	// This should also generate: walkFn!(path, info, walkErr)
	let result = (__goscriptAwait = walkFn!(path, info, walkErr), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	if (result != null) {
		return result
	}

	return null
}

export function processWithCallback(input: string, processor: ProcessFunc | null): [string, $.GoError] {
	// Test case 3: Function parameter with return values
	// This should generate: processor!(input)
	// But currently generates: processor(input) - missing !
	return (processor!(input) as [string, $.GoError])
}

export function maybeProcess(input: string, processor: OptionalProcessFunc | null): [string, $.GoError] {
	if (processor == null) {
		return ["nil processor", null]
	}
	return (processor!(input) as [string, $.GoError])
}

export async function main(): globalThis.Promise<void> {
	let fs = new MockFilesystem()
	let fileInfo = new MockFileInfo({name: "test.txt", size: 50n, isDir: false})

	// Test the walk function with a callback
	let walkFunc = $.functionValue(async (path: string, info: FileInfo | null, err: $.GoError): globalThis.Promise<$.GoError> => {
		await $.println("Walking:", path, "size:", (__goscriptAwait = (info !== null && (info as any).__isVarRef !== true && ((info as any).__goValue === undefined || (info as any).__goType?.charCodeAt(0) !== 42) ? (info as Exclude<FileInfo, null>) : $.pointerValue<Exclude<FileInfo, null>>(info)).Size(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		if (err != null) {
			await $.println("Error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
		return null
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string"), "main.FileInfo", "error"], results: ["error"] } as $.FunctionTypeInfo))

	let err = await walk($.interfaceValue<Filesystem | null>(fs, "*main.MockFilesystem", /* @__PURE__ */ $.pointerType("main.MockFilesystem")), "/test", $.interfaceValue<FileInfo | null>(fileInfo, "*main.MockFileInfo", /* @__PURE__ */ $.pointerType("main.MockFileInfo")), walkFunc)
	if (err != null) {
		await $.println("Walk error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}

	// Test the process function with a callback
	let processFunc = $.functionValue((data: string): [string, $.GoError] => {
		return ["processed: " + data, null]
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string"), "error"] } as $.FunctionTypeInfo))

	let [result, err2] = processWithCallback("hello", processFunc)
	if (err2 != null) {
		await $.println("Process error:", (__goscriptAwait = (err2 !== null && (err2 as any).__isVarRef !== true && ((err2 as any).__goValue === undefined || (err2 as any).__goType?.charCodeAt(0) !== 42) ? (err2 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err2)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	} else {
		await $.println("Process result:", result)
	}

	let [result3, err3] = maybeProcess("ignored", (null as OptionalProcessFunc | null))
	if (err3 != null) {
		await $.println("Optional process error:", (__goscriptAwait = (err3 !== null && (err3 as any).__isVarRef !== true && ((err3 as any).__goValue === undefined || (err3 as any).__goType?.charCodeAt(0) !== 42) ? (err3 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err3)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	} else {
		await $.println("Optional process result:", result3)
	}

	let [result4, err4] = maybeProcess("world", processFunc)
	if (err4 != null) {
		await $.println("Optional process error:", (__goscriptAwait = (err4 !== null && (err4 as any).__isVarRef !== true && ((err4 as any).__goValue === undefined || (err4 as any).__goType?.charCodeAt(0) !== 42) ? (err4 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err4)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	} else {
		await $.println("Optional process result:", result4)
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
