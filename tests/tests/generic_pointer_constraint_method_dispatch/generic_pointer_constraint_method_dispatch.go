package main

// localPairingMessage mirrors the spacewave sdk/session pairing constraint: a
// pointer type-set element plus VT codec methods.
type localPairingMessage[T any] interface {
	*T
	MarshalVT() ([]byte, error)
	UnmarshalVT(data []byte) error
}

type pairingOffer struct {
	Note string
}

func (o *pairingOffer) MarshalVT() ([]byte, error) {
	return []byte(o.Note), nil
}

func (o *pairingOffer) UnmarshalVT(data []byte) error {
	o.Note = "decoded:" + string(data)
	return nil
}

func decodeLocalPairing[M localPairingMessage[T], T any](data []byte) (T, error) {
	var msg T
	err := M(&msg).UnmarshalVT(data)
	return msg, err
}

func encodeLocalPairing[M localPairingMessage[T], T any](msg M) ([]byte, error) {
	return msg.MarshalVT()
}

type setter interface {
	Has(v int64) bool
	Set(v int64)
}

type flag int64

func (f *flag) Has(v int64) bool { return int64(*f)&v != 0 }
func (f *flag) Set(v int64)      { *f = flag(int64(*f) | v) }

type flagConstraint interface {
	~int64
}

// countFlags converts a pointer to a type parameter value to an interface
// that needs the pointer method set of the type argument.
func countFlags[T flagConstraint](i T, values []int64) int64 {
	p := any(&i).(setter)
	var n int64
	for _, v := range values {
		if p.Has(v) {
			n++
		}
	}
	p.Set(8)
	return n + int64(i)
}

func main() {
	msg, err := decodeLocalPairing[*pairingOffer]([]byte("hi"))
	if err != nil {
		println("decode error")
		return
	}
	println(msg.Note)

	encoded, err := encodeLocalPairing[*pairingOffer](&pairingOffer{Note: "note"})
	if err != nil {
		println("encode error")
		return
	}
	println("encoded:", string(encoded))

	println("count:", countFlags(flag(3), []int64{1, 2, 4}))
	var fl flag = 1
	if s, ok := any(&fl).(setter); ok {
		s.Set(2)
	}
	println("flag:", int64(fl))
}
