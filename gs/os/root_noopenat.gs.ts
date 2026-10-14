import * as $ from "@goscript/builtin/index.js";
import { Mkdir, OpenFile } from "./file_js.gs.js";
import { Remove } from "./file_unix_js.gs.js";
import { Root, OpenRoot } from "./root_js.gs.js";
import { Lstat, Stat } from "./stat_js.gs.js";
import { File } from "./types_js.gs.js";

import * as fs from "@goscript/io/fs/index.js"

export async function openRootNolog(name: string): Promise<[Root | null, $.GoError]> {
	return OpenRoot(name)
}

export async function openRootInRoot(r: Root | null, name: string): Promise<[Root | null, $.GoError]> {
	return r !== null ? r.OpenRoot(name) : [null, null]
}

export async function newRoot(name: string): Promise<[Root | null, $.GoError]> {
	return OpenRoot(name)
}

export async function rootOpenFileNolog(r: Root | null, name: string, flag: number, perm: number): Promise<[File | null, $.GoError]> {
	return r !== null ? r.OpenFile(name, flag, perm) : OpenFile(name, flag, perm)
}

export async function rootStat(r: Root | null, name: string, lstat: boolean): Promise<[fs.FileInfo | null, $.GoError]> {
	if (r !== null) {
		return lstat ? r.Lstat(name) : r.Stat(name)
	}
	return lstat ? Lstat(name) : Stat(name)
}

export async function rootMkdir(r: Root | null, name: string, perm: number): Promise<$.GoError> {
	return r !== null ? r.Mkdir(name, perm) : Mkdir(name, perm)
}

export async function rootRemove(r: Root | null, name: string): Promise<$.GoError> {
	return r !== null ? r.Remove(name) : Remove(name)
}
