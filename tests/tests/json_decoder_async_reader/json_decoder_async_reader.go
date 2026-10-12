package main

import (
	"bufio"
	"encoding/json"
	"io"
	"strings"
)

// chanReader returns chunks received from a channel, so its Read blocks.
type chanReader struct {
	ch  chan string
	cur string
}

func (r *chanReader) Read(p []byte) (int, error) {
	if r.cur == "" {
		s, ok := <-r.ch
		if !ok {
			return 0, io.EOF
		}
		r.cur = s
	}
	n := copy(p, r.cur)
	r.cur = r.cur[n:]
	return n, nil
}

func newChanReader(chunks ...string) *chanReader {
	r := &chanReader{ch: make(chan string)}
	go func() {
		for _, c := range chunks {
			r.ch <- c
		}
		close(r.ch)
	}()
	return r
}

type item struct {
	A string
	B float64
}

func main() {
	// values, a number and a multibyte character are split across chunks
	r := newChanReader(`{"A": "h`, "\xc3", "\xa9llo\", \"B\": 1", `2.5}`, "\n{\"A\": \"x\", \"B\": 3}")
	dec := json.NewDecoder(bufio.NewReader(r))
	for {
		var it item
		err := dec.Decode(&it)
		if err == io.EOF {
			println("eof")
			break
		}
		if err != nil {
			println("error:", err.Error())
			break
		}
		println(it.A, it.B)
	}

	// tokens and More from a blocking reader
	dec = json.NewDecoder(newChanReader(`[1, "two", `, `{"k": true}]`))
	for {
		tok, err := dec.Token()
		if err != nil {
			println("token end:", err == io.EOF)
			break
		}
		switch t := tok.(type) {
		case json.Delim:
			println("delim", string(t), dec.More())
		case string:
			println("string", t)
		case float64:
			println("number", t)
		case bool:
			println("bool", t)
		}
	}

	// UseNumber tokens are json.Number values, and Delim has a String method
	dec = json.NewDecoder(newChanReader(`[1.5, "s"]`))
	dec.UseNumber()
	for {
		tok, err := dec.Token()
		if err != nil {
			break
		}
		switch t := tok.(type) {
		case json.Delim:
			println("delim", t.String())
		case string:
			println("string", t)
		case json.Number:
			f, _ := t.Float64()
			println("number", t.String(), f)
		}
	}

	// a syntax error is reported without waiting for the rest of the input
	dec = json.NewDecoder(newChanReader(`{"A": ]`, ` more`))
	var it item
	err := dec.Decode(&it)
	println("syntax error:", err != nil)

	// a synchronous reader still works
	dec = json.NewDecoder(strings.NewReader(`{"A": "s", "B": 7} {"A": "t"}`))
	for dec.More() {
		var it item
		if err := dec.Decode(&it); err != nil {
			println("error:", err.Error())
			break
		}
		println(it.A, it.B)
	}
}
