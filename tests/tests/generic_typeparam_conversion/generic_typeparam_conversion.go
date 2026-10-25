package main

type Signed interface {
	~int | ~int8 | ~int16 | ~int32 | ~int64
}

type Unsigned interface {
	~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 | ~uintptr
}

type Integer interface {
	Signed | Unsigned
}

type Enum interface {
	String() string
}

type EnumConstraint interface {
	Enum
	Integer
}

type Base int32

func (b Base) String() string { return "base" }

type Extended int32

func (e Extended) String() string { return "extended" }

// valuesExtended converts between two type parameters.
func valuesExtended[T, E EnumConstraint](values []T, extended []E) []T {
	res := make([]T, len(extended))
	for i, e := range extended {
		res[i] = T(e)
	}
	res = append(res, values...)
	return res
}

type Wide int64

func (w Wide) String() string { return "wide" }

// toWide converts from a number-represented to a bigint-represented type.
func toWide[T, E EnumConstraint](e E) T {
	return T(e)
}

// fromUint64 converts a uint64 to a type parameter, which wraps a value
// beyond the range of the type.
func fromUint64[T Integer](u uint64) T {
	return T(u)
}

// fromConst converts a constant and a basic value to a type parameter.
func fromConst[T Integer](i int) (T, T) {
	return T(7), T(i)
}

func main() {
	res := valuesExtended([]Base{0, 1}, []Extended{2, 3, 4})
	for _, v := range res {
		println(int(v), v.String())
	}
	w := toWide[Wide](Extended(5))
	println(int64(w)*2, w.String())
	a, b := fromConst[Wide](9)
	println(int64(a) + int64(b))
	c, d := fromConst[uint8](300)
	println(c, d)
	u := uint64(1<<64 - 7)
	println(fromUint64[int](u), fromUint64[int64](u), fromUint64[int32](u))
	println(fromUint64[int](u) % 3)
}
