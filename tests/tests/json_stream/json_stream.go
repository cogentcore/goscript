package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
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

// printTokens prints the tokens of dec until its input ends.
func printTokens(dec *json.Decoder) {
	for {
		tok, err := dec.Token()
		if err != nil {
			fmt.Println("token end:", err == io.EOF)
			return
		}
		switch t := tok.(type) {
		case json.Delim:
			fmt.Println("delim", t.String(), dec.More())
		case string:
			fmt.Println("string", t)
		case float64:
			fmt.Println("number", t)
		case json.Number:
			f, _ := t.Float64()
			fmt.Println("json.Number", t.String(), f)
		case bool:
			fmt.Println("bool", t)
		}
	}
}

func main() {
	// Compact preserves number literal spelling.
	var c bytes.Buffer
	json.Compact(&c, []byte(`{"n": 1e+00, "big": 9007199254740993}`))
	fmt.Println(c.String())

	// Indent lays out the compact form with Go spacing.
	var ind bytes.Buffer
	json.Indent(&ind, []byte(`{"a":1,"b":[2,3]}`), "", "  ")
	fmt.Println(ind.String())

	// Decoder reads one value per call and buffers the rest of the stream.
	dec := json.NewDecoder(strings.NewReader("1 2 3"))
	var n int
	for dec.Decode(&n) == nil {
		fmt.Println("decoded", n)
	}

	// UseNumber keeps the exact source literal beyond float64 precision.
	und := json.NewDecoder(strings.NewReader(`{"big":9007199254740993}`))
	und.UseNumber()
	var m map[string]any
	und.Decode(&m)
	fmt.Println("big", m["big"])

	// A malformed document yields a *json.SyntaxError with the Go byte offset.
	var v any
	err := json.Unmarshal([]byte("[1,]"), &v)
	if se, ok := err.(*json.SyntaxError); ok {
		fmt.Println("offset", se.Offset)
	}

	// Token advances the stream; More reports remaining container elements.
	mdec := json.NewDecoder(strings.NewReader("[10,20]"))
	mdec.Token()
	fmt.Println("more", mdec.More())
	mdec.Token()
	mdec.Token()
	fmt.Println("more", mdec.More())

	// A blocking reader delivers values, a number, and a multibyte character
	// split across its chunks.
	bdec := json.NewDecoder(bufio.NewReader(newChanReader(`{"A": "h`, "\xc3", "\xa9llo\", \"B\": 1", `2.5}`, "\n{\"A\": \"x\", \"B\": 3}")))
	for {
		var it item
		if err := bdec.Decode(&it); err != nil {
			fmt.Println("decode end:", err == io.EOF)
			break
		}
		fmt.Println(it.A, it.B)
	}

	// Token and More work on a blocking reader, and UseNumber tokens are
	// json.Number values.
	printTokens(json.NewDecoder(newChanReader(`[1, "two", `, `{"k": true}]`)))
	ndec := json.NewDecoder(newChanReader(`[1.5, "s"]`))
	ndec.UseNumber()
	printTokens(ndec)

	// A syntax error is reported without waiting for the rest of the input.
	var it item
	err = json.NewDecoder(newChanReader(`{"A": ]`, ` more`)).Decode(&it)
	fmt.Println("syntax error:", err != nil)
}
