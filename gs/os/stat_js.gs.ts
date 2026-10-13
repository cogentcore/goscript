import * as $ from "@goscript/builtin/index.js";
import { callbackFSResult, createFileInfo, getDeno, getNodeFS, newHostError } from "./types_js.gs.js";
import { getCallbackFS, type CallbackStat } from "./callbackfs.js";

import * as fs from "@goscript/io/fs/index.js"

// Stat returns a [FileInfo] describing the named file.
// If there is an error, it will be of type [*PathError].
export async function Stat(name: string): Promise<[fs.FileInfo, $.GoError]> {
	const denoObj = getDeno()
	if (denoObj?.statSync) {
		try {
			return [createFileInfo(name, denoObj.statSync(name)), null]
		} catch (err) {
			return [null, newHostError(err)]
		}
	}
	const nodeFS = getNodeFS()
	if (nodeFS?.statSync) {
		try {
			return [createFileInfo(name, nodeFS.statSync(name)), null]
		} catch (err) {
			return [null, newHostError(err)]
		}
	}
	return callbackStat("stat", name)
}

// callbackStat stats the named file with the given function of the
// callback filesystem, if there is one.
async function callbackStat(op: "stat" | "lstat", name: string): Promise<[fs.FileInfo, $.GoError]> {
	const [stat, err] = await callbackFSResult(op, name)
	return err !== null ? [null, err] : [createFileInfo(name, stat as CallbackStat), null]
}

// Lstat returns a [FileInfo] describing the named file.
// If the file is a symbolic link, the returned FileInfo
// describes the symbolic link. Lstat makes no attempt to follow the link.
// If there is an error, it will be of type [*PathError].
export async function Lstat(name: string): Promise<[fs.FileInfo, $.GoError]> {
	const denoObj = getDeno()
	if (denoObj?.lstatSync) {
		try {
			return [createFileInfo(name, denoObj.lstatSync(name)), null]
		} catch (err) {
			return [null, newHostError(err)]
		}
	}
	const nodeFS = getNodeFS()
	if (nodeFS?.lstatSync) {
		try {
			return [createFileInfo(name, nodeFS.lstatSync(name)), null]
		} catch (err) {
			return [null, newHostError(err)]
		}
	}
	if (getCallbackFS() !== null) {
		return callbackStat("lstat", name)
	}
	return Stat(name)
}

// statNolog is the same as Stat, for use in DirFS.
export function statNolog(name: string): Promise<[fs.FileInfo, $.GoError]> {
	return Stat(name)
}

// lstatNolog is the same as Lstat, for use in DirFS.
export function lstatNolog(name: string): Promise<[fs.FileInfo, $.GoError]> {
	return Lstat(name)
}
