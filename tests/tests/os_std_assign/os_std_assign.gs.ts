// Generated file based on os_std_assign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as os from "@goscript/os/index.js"
import "@goscript/os/index.js"

export async function main(): globalThis.Promise<void> {
	let stdin = os.Stdin
	let stdout = os.Stdout
	let stderr = os.Stderr

	os.__goscript_set_Stdout(stderr)
	os.__goscript_set_Stderr(stdout)
	os.__goscript_set_Stdin(null)
	await $.println((os.Stdout === stderr || $.pointerAliasesMade && $.pointerEqual(os.Stdout, stderr)), (os.Stderr === stdout || $.pointerAliasesMade && $.pointerEqual(os.Stderr, stdout)), os.Stdin == null)

	let __goscriptAssign0_0: os.File | $.VarRef<os.File> | null = stdin
	let __goscriptAssign0_1: os.File | $.VarRef<os.File> | null = stdout
	let __goscriptAssign0_2: os.File | $.VarRef<os.File> | null = stderr
	os.__goscript_set_Stdin(__goscriptAssign0_0)
	os.__goscript_set_Stdout(__goscriptAssign0_1)
	os.__goscript_set_Stderr(__goscriptAssign0_2)
	await $.println((os.Stdin === stdin || $.pointerAliasesMade && $.pointerEqual(os.Stdin, stdin)), (os.Stdout === stdout || $.pointerAliasesMade && $.pointerEqual(os.Stdout, stdout)), (os.Stderr === stderr || $.pointerAliasesMade && $.pointerEqual(os.Stderr, stderr)))

	let __goscriptTuple0: any = swap(os.Stdout, os.Stderr)
	os.__goscript_set_Stdout(__goscriptTuple0[0])
	os.__goscript_set_Stderr(__goscriptTuple0[1])
	await $.println((os.Stdout === stderr || $.pointerAliasesMade && $.pointerEqual(os.Stdout, stderr)), (os.Stderr === stdout || $.pointerAliasesMade && $.pointerEqual(os.Stderr, stdout)))
	let __goscriptAssign1_0: os.File | $.VarRef<os.File> | null = stdout
	let __goscriptAssign1_1: os.File | $.VarRef<os.File> | null = stderr
	os.__goscript_set_Stdout(__goscriptAssign1_0)
	os.__goscript_set_Stderr(__goscriptAssign1_1)
}

export function swap(a: os.File | $.VarRef<os.File> | null, b: os.File | $.VarRef<os.File> | null): [os.File | $.VarRef<os.File> | null, os.File | $.VarRef<os.File> | null] {
	return [b, a]
}

if ($.isMainScript(import.meta)) {
	await main()
}
