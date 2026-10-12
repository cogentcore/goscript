package main

import (
	"bytes"
	"encoding/json"
	"io"
	"strings"
)

type Decoder interface {
	Decode(v any) error
}

type DecoderFunc func(r io.Reader) Decoder

func NewDecoderFunc[T Decoder](f func(r io.Reader) T) DecoderFunc {
	return func(r io.Reader) Decoder { return f(r) }
}

type Encoder interface {
	Encode(v any) error
}

type EncoderFunc func(w io.Writer) Encoder

func NewEncoderFunc[T Encoder](f func(w io.Writer) T) EncoderFunc {
	return func(w io.Writer) Encoder { return f(w) }
}

func decode(f DecoderFunc, s string) {
	var v map[string]int
	if err := f(strings.NewReader(s)).Decode(&v); err != nil {
		println("error:", err.Error())
		return
	}
	println(v["a"])
}

func writeBytes(v any, f EncoderFunc) string {
	var b bytes.Buffer
	if err := f(&b).Encode(v); err != nil {
		return "error: " + err.Error()
	}
	return b.String()
}

func main() {
	decode(NewDecoderFunc(json.NewDecoder), `{"a": 1}`)

	var newDecoder func(r io.Reader) *json.Decoder = json.NewDecoder
	var v map[string]int
	_ = newDecoder(strings.NewReader(`{"a": 2}`)).Decode(&v)
	println(v["a"])

	// The writer is a pointer to a local variable.
	print(writeBytes(map[string]int{"b": 3}, NewEncoderFunc(json.NewEncoder)))
	newEncoder := json.NewEncoder
	var buf bytes.Buffer
	_ = newEncoder(&buf).Encode([]int{4, 5})
	print(buf.String())
}
