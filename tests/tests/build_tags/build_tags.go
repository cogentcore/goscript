package main

func main() {
	println("=== Build Tags Test ===")

	// Test that platform-specific files are handled correctly
	// This should only compile files with js/wasm build tags
	// and exclude files with other platform tags

	testJSWasm()
	testGeneric()

	// goscript cannot run assembly, so it builds with the purego and noasm
	// tags, which select pure Go code in packages that also ship assembly.
	testNoAsm()
	testPureGo()

	println("=== End Build Tags Test ===")
}
