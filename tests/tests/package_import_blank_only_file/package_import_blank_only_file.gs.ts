// Generated file based on package_import_blank_only_file.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import "@goscript/github.com/s4wave/goscript/tests/tests/package_import_blank_only_file/all/index.js"

import * as registry from "@goscript/github.com/s4wave/goscript/tests/tests/package_import_blank_only_file/registry/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/package_import_blank_only_file/registry/index.js"

export async function main(): globalThis.Promise<void> {
	if (!registry.Registered("blank")) {
		$.panic("blank import in a file without declarations did not run")
	}
	await $.println("registered:", registry.Registered("blank"))
}

if ($.isMainScript(import.meta)) {
	await main()
}
