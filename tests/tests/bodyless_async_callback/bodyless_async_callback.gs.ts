// Generated file based on bodyless_async_callback.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as sync from "@goscript/sync/index.js"
import "@goscript/unsafe/index.js"

export class Setting {
	public declare once: sync.Once

	constructor(__goscriptValue?: boolean, once$?: sync.Once) {
		this.once = once$ ?? $.markAsStructValue(new sync.Once())
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Setting {
		return new Setting(true, $.markAsStructValue($.cloneStructValue(this.once)))
	}

	public __goscriptAssign(source: Setting): this {
		$.assignStruct(this.once, source.once)
		return this
	}

	public Value(): string {
		const s: Setting | $.VarRef<Setting> | null = this;
		$.pointerValue<Setting>(s).once.Do($.functionValue(() => {
		}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
		return ""
	}

	static __typeInfo = $.registerStructType(
		"main.Setting",
		() => new Setting(),
		() => [{ name: "Value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		Setting,
		() => [{ name: "once", key: "once", type: "sync.Once" }]
	)
}

export function setCallback(callback: ((_p0: string) => (() => void) | null | globalThis.Promise<(() => void) | null>) | null): void {
}

export function newCallback(name: string): (() => void) | null {
	let s = new Setting()
	void (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as Setting).Value() : Setting.prototype.Value.call(s))
	return $.functionValue(async () => {
		await $.println("callback:", name)
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))
}

function __goscriptInit0(): void {
	setCallback(newCallback)
}

export async function main(): globalThis.Promise<void> {
	await $.println("ok")
}

__goscriptInit0()

if ($.isMainScript(import.meta)) {
	await main()
}
