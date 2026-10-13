import * as $ from "@goscript/builtin/index.js";
import { ErrUnimplemented } from "./error.gs.js";
import { readDirectoryInfos } from "./types_js.gs.js";
import { FileInfoToDirEntry } from "@goscript/io/fs/readdir.js";

import * as fs from "@goscript/io/fs/index.js"

type DirEntry = fs.DirEntry;

// ReadDir reads the directory name and returns its entries sorted by name.
// Each entry's Info carries the lstat mode, as Go's ReadDir does.
export function ReadDir(name: string): [$.Slice<DirEntry>, $.GoError] {
	const [infos, err] = readDirectoryInfos(name)
	if (err !== null) {
		return [null, err]
	}
	const entries = infos!
		.map((info) => FileInfoToDirEntry(info))
		.filter((entry): entry is DirEntry => entry !== null)
	entries.sort((a, b) => (a?.Name() ?? "").localeCompare(b?.Name() ?? ""))
	return [$.arrayToSlice(entries), null]
}

export function CopyFS(dir: string, fsys: fs.FS): $.GoError {
	return ErrUnimplemented
}
