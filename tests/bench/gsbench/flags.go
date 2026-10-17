package gsbench

import "sync/atomic"

// bitFlag is the interface that the bit flag methods take, like the BitFlag
// interface of the cogentcore.org/core/enums package. BitIndexString keeps
// other types with an Int64 method, such as *math/rand/v2.Rand, from
// implementing it.
type bitFlag interface {
	// Int64 returns the bit index of the flag.
	Int64() int64

	// BitIndexString returns the name of the bit index of the flag.
	BitIndexString() string
}

// ladFlags are bit flags with the methods that the Cogent Core enumgen tool
// generates for a bit flag type, like those of text/rich.Decorations, for
// the LadderBitFlag benchmarks.
type ladFlags int64

const (
	ladFlagA ladFlags = iota
	ladFlagB
	ladFlagC
	ladFlagD
)

// ladFlagNames has the names of the ladFlags bit indexes.
var ladFlagNames = map[ladFlags]string{0: `ladFlagA`, 1: `ladFlagB`, 2: `ladFlagC`, 3: `ladFlagD`}

// ladFlagged is a struct with a bit flag field, like rich.Style.
type ladFlagged struct {
	Flags ladFlags
	Size  int
}

// Int64 returns the ladFlags value as an int64.
func (i ladFlags) Int64() int64 { return int64(i) }

// BitIndexString returns the name of the ladFlags bit index.
func (i ladFlags) BitIndexString() string { return ladFlagNames[i] }

// HasFlag returns whether these bit flags have the given bit flag set.
func (i *ladFlags) HasFlag(f bitFlag) bool { return hasFlag((*int64)(i), f) }

// SetFlag sets the value of the given flags in these flags to the given value.
func (i *ladFlags) SetFlag(on bool, f ...bitFlag) { setFlag((*int64)(i), on, f...) }

// hasFlag returns whether the bit flag value has the given bit flag set,
// like enums.HasFlag.
func hasFlag(i *int64, f bitFlag) bool {
	return atomic.LoadInt64(i)&(1<<uint32(f.Int64())) != 0
}

// setFlag sets the value of the given flags in the bit flag value to the
// given value, like enums.SetFlag.
func setFlag(i *int64, on bool, f ...bitFlag) {
	// Combine the flags into one mask.
	var mask int64
	for _, v := range f {
		mask |= 1 << v.Int64()
	}

	// Set or clear the mask bits.
	in := atomic.LoadInt64(i)
	if on {
		in |= mask
	} else {
		in &^= mask
	}
	atomic.StoreInt64(i, in)
}
