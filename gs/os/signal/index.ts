import * as $ from '@goscript/builtin/index.js'
import * as context from '@goscript/context/index.js'
import * as os from '@goscript/os/index.js'

// A JavaScript host delivers no signals to a program, as on js/wasm in Go, so
// a channel that Notify registers never receives one, and the package keeps no
// state. The Go package instead runs a loop that waits for the next signal
// from the runtime, which returned at once here, so the loop never yielded.

// Ignore causes the given signals to be ignored, which they already are.
export function Ignore(..._sig: os.Signal[]): void {}

// Ignored reports whether sig is ignored, which no signal is, as none arrive.
export function Ignored(_sig: os.Signal): boolean {
  return false
}

// Notify relays the given signals to c, which never receives one.
export function Notify(
  _c: $.Channel<os.Signal> | $.ChannelRef<os.Signal> | null,
  ..._sig: os.Signal[]
): void {}

// NotifyContext returns a copy of parent that is done when stop is called,
// as no signal arrives to make it done.
export function NotifyContext(
  parent: context.Context,
  ..._signals: os.Signal[]
): [context.Context, context.CancelFunc] {
  return context.WithCancel(parent)
}

// Reset undoes the effect of prior calls to Notify for the given signals.
export function Reset(..._sig: os.Signal[]): void {}

// Stop causes package signal to stop relaying signals to c.
export function Stop(
  _c: $.Channel<os.Signal> | $.ChannelRef<os.Signal> | null,
): void {}
