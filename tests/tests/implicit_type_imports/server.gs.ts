// Generated file based on server.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as io from "@goscript/io/index.js"
import "@goscript/io/index.js"

export class Server {
	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Server {
		return new Server(this, true)
	}

	public __goscriptAssign(source: Server): this {
		return this
	}

	public async Handle(rwc: io.ReadWriteCloser | null): globalThis.Promise<void> {
		await (rwc !== null && (rwc as any).__isVarRef !== true && (rwc as any).__goValue === undefined ? (rwc as Exclude<io.ReadWriteCloser, null>) : $.pointerValue<Exclude<io.ReadWriteCloser, null>>(rwc)).Close()
	}

	static __typeInfo = $.registerStructType(
		"main.Server",
		() => new Server(),
		() => [{ name: "Handle", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		Server,
		() => []
	)
}
