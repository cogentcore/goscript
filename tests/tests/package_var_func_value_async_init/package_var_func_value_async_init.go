package main

import "github.com/s4wave/goscript/tests/tests/package_var_func_value_async_init/types"

var (
	TypeWasm = newType("wasm", "application/wasm")
	TypeDex  = newType("dex", "application/vnd.android.dex")
)

var Application = map[types.Type]string{
	TypeWasm: "wasm",
	TypeDex:  "dex",
}

func main() {
	println("wasm:", TypeWasm.Ext, TypeWasm.MIME)
	println("dex:", types.Get("dex").MIME)
	println("application:", len(Application), Application[TypeWasm])
}
