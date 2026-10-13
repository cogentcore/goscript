package main

import (
	"encoding/json"
	"errors"
	"sort"
)

// Tokens is an enum that implements encoding.TextMarshaler and
// encoding.TextUnmarshaler, as map keys in JSON.
type Tokens int32

const (
	Background Tokens = iota
	Keyword
	Comment
)

var tokenNames = []string{"Background", "Keyword", "Comment"}

func (t Tokens) String() string { return tokenNames[t] }

func (t Tokens) MarshalText() ([]byte, error) { return []byte(t.String()), nil }

// UnmarshalText is asynchronous in TypeScript, because it prints, as
// enums.UnmarshalText logs with slog in Cogent Core.
func (t *Tokens) UnmarshalText(text []byte) error {
	if len(text) == 0 {
		println("empty token")
	}
	for i, n := range tokenNames {
		if n == string(text) {
			*t = Tokens(i)
			return nil
		}
	}
	return errors.New("unknown token " + string(text))
}

type Style map[Tokens]string

type Doc struct {
	Kind   Tokens
	Kinds  []Tokens
	Styles map[string]Style
	Counts map[int]int
	Big    map[int64]string
}

func main() {
	var s Style
	if err := json.Unmarshal([]byte(`{"Keyword":"bold","Background":"white"}`), &s); err != nil {
		println("error:", err.Error())
	}
	println("len:", len(s))
	println("keyword:", s[Keyword], "background:", s[Background])
	for k := range s {
		println("key is token:", k == Keyword || k == Background)
	}

	var d Doc
	err := json.Unmarshal([]byte(`{"Kind":"Comment","Kinds":["Keyword","Background"],"Styles":{"x":{"Comment":"gray"}},"Counts":{"1":2,"-3":4},"Big":{"9007199254740993":"big"}}`), &d)
	if err != nil {
		println("error:", err.Error())
	}
	println("comment:", d.Styles["x"][Comment])
	println("kind:", d.Kind.String(), "kinds:", len(d.Kinds), d.Kinds[0].String(), d.Kinds[1].String())
	b, _ := json.Marshal(Doc{Kind: Keyword, Kinds: []Tokens{Comment}})
	println("marshal doc:", string(b))
	println("counts:", d.Counts[1], d.Counts[-3])
	println("big:", d.Big[9007199254740993])

	b, err = json.Marshal(Style{Comment: "gray", Keyword: "bold"})
	if err != nil {
		println("error:", err.Error())
	}
	println("marshal:", string(b))
	b, _ = json.Marshal(map[int]bool{3: true, 1: false})
	println("marshal ints:", string(b))

	var bad Style
	err = json.Unmarshal([]byte(`{"Nope":"x"}`), &bad)
	println("bad error:", err != nil)

	keys := []string{}
	for k := range d.Styles {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	println("styles keys:", len(keys), keys[0])
}
