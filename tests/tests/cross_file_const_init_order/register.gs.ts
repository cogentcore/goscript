// Generated file based on register.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as __goscript_consts from "./consts.gs.ts"
import "./consts.gs.ts"

export class thing {
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): thing {
		return new thing(this, true)
	}

	public __goscriptAssign(source: thing): void {
	}

	static __typeInfo = $.registerStructType(
		"main.thing",
		() => new thing(),
		() => [],
		thing,
		() => []
	)
}

export let Seen = 0

export function __goscript_set_Seen(__goscriptValue: number): void {
	Seen = __goscriptValue
}

export function newThing(): thing {
	return new thing(undefined, true)
}

function __goscriptInit0(): void {
	Seen = 0
}

export { __goscriptInit0 }
