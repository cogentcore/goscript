import * as $ from "@goscript/builtin/index.js";
import { ErrUnimplemented } from "./error.gs.js";

import * as errors from "@goscript/errors/index.js"
import * as syscall from "@goscript/syscall/index.js"

export let ErrProcessDone: $.GoError = errors.New("os: process already finished")
export let ErrNoHandle: $.GoError = errors.New("os: process handle unavailable")

// Process Simplified Process class for JavaScript environment.
export class Process {
	public declare Pid: number

	constructor(init?: Partial<{Pid?: number}>) {
		this.Pid = init?.Pid ?? -1
	}

	public clone(): Process {
		const cloned = new Process()
		cloned.Pid = this.Pid
		return cloned
	}

	// All process operations return ErrUnimplemented in JavaScript
	public Release(): $.GoError {
		return ErrUnimplemented
	}

	public Kill(): $.GoError {
		return ErrUnimplemented
	}

	public Wait(): [ProcessState | null, $.GoError] {
		return [null, ErrUnimplemented]
	}

	public Signal(sig: Signal): $.GoError {
		return ErrUnimplemented
	}

	// Register this type with the runtime type system
	static __typeInfo = $.registerStructType(
		'os.Process',
		new Process(),
		[
			{ name: "Release", args: [], returns: [{ type: { kind: $.TypeKind.Interface, name: 'GoError', methods: [{ name: 'Error', args: [], returns: [{ type: { kind: $.TypeKind.Basic, name: 'string' } }] }] } }] },
			{ name: "Kill", args: [], returns: [{ type: { kind: $.TypeKind.Interface, name: 'GoError', methods: [{ name: 'Error', args: [], returns: [{ type: { kind: $.TypeKind.Basic, name: 'string' } }] }] } }] },
			{ name: "Wait", args: [], returns: [{ type: { kind: $.TypeKind.Pointer, elemType: "os.ProcessState" } }, { type: { kind: $.TypeKind.Interface, name: 'GoError', methods: [{ name: 'Error', args: [], returns: [{ type: { kind: $.TypeKind.Basic, name: 'string' } }] }] } }] },
			{ name: "Signal", args: [{ name: "sig", type: "Signal" }], returns: [{ type: { kind: $.TypeKind.Interface, name: 'GoError', methods: [{ name: 'Error', args: [], returns: [{ type: { kind: $.TypeKind.Basic, name: 'string' } }] }] } }] }
		],
		Process,
		[{ name: "Pid", key: "Pid", type: { kind: $.TypeKind.Basic, name: "number" } }]
	);
}

// ProcAttr Simplified ProcAttr class for JavaScript environment.
export class ProcAttr {
	public declare Dir: string

	public declare Env: $.Slice<string>

	public declare Files: $.Slice<any>

	public declare Sys: any

	constructor(init?: Partial<{Dir?: string, Env?: $.Slice<string>, Files?: $.Slice<any>, Sys?: any}>) {
		this.Dir = init?.Dir ?? ""
		this.Env = init?.Env ?? null
		this.Files = init?.Files ?? null
		this.Sys = init?.Sys ?? null
	}

	public clone(): ProcAttr {
		const cloned = new ProcAttr()
		cloned.Dir = this.Dir
		cloned.Env = this.Env
		cloned.Files = this.Files
		cloned.Sys = this.Sys
		return cloned
	}

	// Register this type with the runtime type system
	static __typeInfo = $.registerStructType(
		'os.ProcAttr',
		new ProcAttr(),
		[],
		ProcAttr,
		[{ name: "Dir", key: "Dir", type: { kind: $.TypeKind.Basic, name: "string" } }, { name: "Env", key: "Env", type: { kind: $.TypeKind.Slice, elemType: { kind: $.TypeKind.Basic, name: "string" } } }, { name: "Files", key: "Files", type: { kind: $.TypeKind.Slice, elemType: { kind: $.TypeKind.Basic, name: "any" } } }, { name: "Sys", key: "Sys", type: { kind: $.TypeKind.Basic, name: "any" } }]
	);
}

// ProcessState mirrors the minimal JavaScript process surface.
export class ProcessState {

	constructor() {

	}

	public clone(): ProcessState {
		return new ProcessState()
	}

	// Register this type with the runtime type system
	static __typeInfo = $.registerStructType(
		'os.ProcessState',
		new ProcessState(),
		[],
		ProcessState,
		[]
	);
}

// Signal matches the Go signal interface shape when available.
export type Signal = null | {
	Signal(): void
	String(): string
}
export const Signal = null as any;

export function Getpid(): number {
	return -1 // Not available in JavaScript
}

export function Getppid(): number {
	return -1 // Not available in JavaScript
}

export function FindProcess(pid: number): [Process | null, $.GoError] {
	return [null, ErrUnimplemented]
}

export function StartProcess(name: string, argv: $.Slice<string>, attr: ProcAttr | null): [Process | null, $.GoError] {
	return [null, ErrUnimplemented]
}

// newDoneProcess Internal functions used by exec_unix.gs.ts.
export function newDoneProcess(pid: number): Process {
	return new Process({Pid: pid})
}

export function newHandleProcess(pid: number, handle: number): Process {
	return new Process({Pid: pid})
}

export function newPIDProcess(pid: number): Process {
	return new Process({Pid: pid})
}
