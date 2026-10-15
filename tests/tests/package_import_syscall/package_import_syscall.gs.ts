// Generated file based on package_import_syscall.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as netip from "@goscript/net/netip/index.js"
import * as syscall from "@goscript/syscall/index.js"
import type * as sync from "@goscript/sync/index.js"

export async function main(): globalThis.Promise<void> {
	syscall.CloseOnExec(1)
	{
		let err = syscall.SetNonblock(1, true)
		if (err != null) {
			fmt.Println("set true:", (err as any))
			return
		}
	}
	{
		let err = syscall.SetNonblock(1, false)
		if (err != null) {
			fmt.Println("set false:", (err as any))
			return
		}
	}
	if ((1 as number) != 0) {
		fmt.Println("cloexec supported")
	}
	fmt.Println("signals:", $.basicInterfaceValue(syscall.SIGINT, "int"), $.basicInterfaceValue(syscall.SIGKILL, "int"), $.basicInterfaceValue(syscall.SIGTERM, "int"))
	{
		let err = syscall.Kill(1, 3)
		if (err == null) {
			fmt.Println("kill unexpectedly succeeded")
		} else {
			fmt.Println("kill:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}
	if (false) {
		let st = $.varRef($.markAsStructValue(new syscall.Stat_t()))
		let buf: $.Slice<number> = null! as $.Slice<number>
		let iovecs: $.Slice<syscall.Iovec> = null! as $.Slice<syscall.Iovec>
		syscall.Accept(-1)
		syscall.Close(-1)
		syscall.Dup(-1)
		syscall.Fchdir(-1)
		syscall.Fchmod(-1, 0)
		syscall.Fchown(-1, 0, 0)
		syscall.Fstat(-1, st)
		syscall.Fsync(-1)
		syscall.Ftruncate(-1, 0n)
		syscall.Pread(-1, buf, 0n)
		syscall.Pwrite(-1, buf, 0n)
		syscall.Read(-1, buf)
		syscall.ReadDirent(-1, buf)
		syscall.Recvfrom(-1, buf, 0)
		syscall.Recvmsg(-1, buf, buf, 0)
		syscall.Seek(-1, 0n, 0)
		syscall.SendmsgN(-1, buf, buf, null, 0)
		syscall.Sendto(-1, buf, 0, null)
		syscall.Shutdown(-1, 0)
		syscall.Write(-1, buf)
		syscall.F_DUPFD_CLOEXEC
		$.pointerValue<sync.RWMutex>(syscall.ForkLock)
		iovecs
		let attr = new syscall.SysProcAttr()
		attr
	}
	let sa4 = $.markAsStructValue(new syscall.SockaddrInet4())
	let addr4 = netip.AddrFrom4($.cloneArrayValue(sa4.Addr, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4)))
	sa4.Addr = addr4.As4()

	let sa6 = $.markAsStructValue(new syscall.SockaddrInet6())
	let addr6 = netip.AddrFrom16($.cloneArrayValue(sa6.Addr, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 16)))
	sa6.Addr = addr6.As16()

	fmt.Println("set nonblock ok")
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
