import * as $ from "@goscript/builtin/index.js";
import { ErrUnimplemented } from "./error.gs.js";
import { getEnv, getPlatform } from "./types_js.gs.js";

function pickFirstEnv(keys: string[]): string {
	for (const key of keys) {
		const value = getEnv(key)
		if (value !== "") {
			return value
		}
	}
	return ""
}

// O_RDONLY File open flags - using values compatible with typical Unix systems.
export const O_RDONLY = 0
export const O_WRONLY = 1
export const O_RDWR = 2
export const O_APPEND = 1024
export const O_CREATE = 64
export const O_EXCL = 128
export const O_SYNC = 1052672
export const O_TRUNC = 512

// SEEK_SET Seek constants.
export const SEEK_SET = 0
export const SEEK_CUR = 1
export const SEEK_END = 2

// LinkError carries details for link-related path errors.
export class LinkError {
	public declare Op: string

	public declare Old: string

	public declare New: string

	public declare Err: $.GoError

	constructor(init?: Partial<{Op?: string, Old?: string, New?: string, Err?: $.GoError}>) {
		this.Op = init?.Op ?? ""
		this.Old = init?.Old ?? ""
		this.New = init?.New ?? ""
		this.Err = init?.Err ?? null
	}

	public Error(): string | PromiseLike<string> {
		const e = this;
		// Err.Error() may be async, so resolve it lazily instead of
		// interpolating a possible Promise into the text.
		const inner = e.Err?.Error();
		if (inner == null || typeof inner === "string") {
			return e.Op + " " + e.Old + " " + e.New + ": " + (inner ?? "");
		}
		return Promise.resolve(inner).then((text) => e.Op + " " + e.Old + " " + e.New + ": " + text);
	}

	public Unwrap(): $.GoError {
		const e = this
		return e.Err
	}
}

export function TempDir(): string {
	const value = pickFirstEnv(["TMPDIR", "TEMP", "TMP"])
	if (value !== "") {
		return value
	}
	return getPlatform() === "win32" ? "." : "/tmp"
}

export function UserCacheDir(): [string, $.GoError] {
	if (getPlatform() === "win32") {
		const value = pickFirstEnv(["LOCALAPPDATA", "APPDATA", "USERPROFILE"])
		if (value !== "") {
			return [value, null]
		}
		return ["", ErrUnimplemented]
	}
	const value = pickFirstEnv(["XDG_CACHE_HOME"])
	if (value !== "") {
		return [value, null]
	}
	const [home, err] = UserHomeDir()
	if (err !== null || home === "") {
		return ["", err ?? ErrUnimplemented]
	}
	return [home.replace(/\/+$/, "") + "/.cache", null]
}

export function UserConfigDir(): [string, $.GoError] {
	if (getPlatform() === "win32") {
		const value = pickFirstEnv(["APPDATA", "USERPROFILE"])
		if (value !== "") {
			return [value, null]
		}
		return ["", ErrUnimplemented]
	}
	const value = pickFirstEnv(["XDG_CONFIG_HOME"])
	if (value !== "") {
		return [value, null]
	}
	const [home, err] = UserHomeDir()
	if (err !== null || home === "") {
		return ["", err ?? ErrUnimplemented]
	}
	return [home.replace(/\/+$/, "") + "/.config", null]
}

export function UserHomeDir(): [string, $.GoError] {
	const keys = getPlatform() === "win32" ? ["USERPROFILE", "HOMEDRIVE", "HOME"] : ["HOME"]
	const value = pickFirstEnv(keys)
	if (value !== "") {
		return [value, null]
	}
	return ["", ErrUnimplemented]
}
