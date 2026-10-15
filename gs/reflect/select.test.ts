import { describe, expect, it } from 'vitest'
import * as $ from '../builtin/index.js'
import { BothDir, ChanOf, Int, TypeOf, Value, ValueOf } from './type.js'
import { SelectCase, SelectDefault, SelectRecv, SelectSend } from './types.js'
import { MakeChan, Select } from './value.js'

const intChan = ChanOf(BothDir, TypeOf(0))

describe('Select', () => {
  it('blocks until a case is ready', async () => {
    const idle = MakeChan(intChan, 0)
    const ready = MakeChan(intChan, 0)
    let done = false
    const selected = Select([
      new SelectCase({ Dir: SelectRecv, Chan: idle }),
      new SelectCase({ Dir: SelectRecv, Chan: ready }),
    ]).then((result) => {
      done = true
      return result
    })

    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(done).toBe(false)

    await ready.Send(ValueOf(7))
    const [chosen, recv, ok] = await selected
    expect(chosen).toBe(1)
    expect(ok).toBe(true)
    expect(recv.Int()).toBe(7n)
  })

  it('receives the zero value from a closed channel', async () => {
    const closed = MakeChan(intChan, 0)
    closed.Close()
    const [chosen, recv, ok] = await Select([
      new SelectCase({ Dir: SelectRecv, Chan: closed }),
    ])
    expect(chosen).toBe(0)
    expect(ok).toBe(false)
    expect(recv.Kind()).toBe(Int)
    expect(recv.Int()).toBe(0n)
  })

  it('never selects a nil channel and takes the default', async () => {
    const nilChan = new Value(null, intChan)
    const typedNil = ValueOf(
      $.interfaceValue(null, '<-chan int', $.channelType('int', 'receive')),
    )
    const [chosen, , ok] = await Select([
      new SelectCase({ Dir: SelectRecv, Chan: nilChan }),
      new SelectCase({ Dir: SelectRecv, Chan: typedNil }),
      new SelectCase({ Dir: SelectDefault }),
    ])
    expect(chosen).toBe(2)
    expect(ok).toBe(false)
  })

  it('sends on a buffered channel', async () => {
    const buffered = MakeChan(intChan, 1)
    const [chosen] = await Select([
      new SelectCase({ Dir: SelectSend, Chan: buffered, Send: ValueOf(3) }),
    ])
    expect(chosen).toBe(0)
    const [recv, ok] = await buffered.Recv()
    expect(ok).toBe(true)
    expect(recv.Int()).toBe(3n)
  })
})
