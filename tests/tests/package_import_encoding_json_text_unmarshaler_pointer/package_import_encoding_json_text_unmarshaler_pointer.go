package main

import (
	"encoding/json"
	"errors"
)

type Act int64

func (a *Act) UnmarshalText(b []byte) error {
	switch string(b) {
	case "Name":
		*a = 3
	case "Next":
		*a = 4
	default:
		return errors.New("bad act")
	}
	return nil
}

type Small int32

func (s *Small) UnmarshalText(b []byte) error {
	*s = Small(len(b))
	return nil
}

func main() {
	var a Act
	err := json.Unmarshal([]byte(`"Name"`), &a)
	println(err == nil, int64(a))
	var s Small
	err = json.Unmarshal([]byte(`"abcde"`), &s)
	println(err == nil, int32(s))
	var acts []Act
	err = json.Unmarshal([]byte(`["Next","Name"]`), &acts)
	println(err == nil, len(acts), int64(acts[0]), int64(acts[1]))
	err = json.Unmarshal([]byte(`"Bogus"`), &a)
	println(err != nil)
}
