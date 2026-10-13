package main

import (
	"encoding/json"
	"errors"
	"strings"
	"sync"
)

var mu sync.Mutex

// Image has JSON methods that suspend under GoScript, as an image encoded
// through an io.Writer does.
type Image struct {
	Name string
}

func (im *Image) MarshalJSON() ([]byte, error) {
	mu.Lock()
	defer mu.Unlock()
	if im.Name == "bad" {
		return nil, errors.New("cannot marshal bad image")
	}
	return json.Marshal(map[string]string{"encoded": strings.ToUpper(im.Name)})
}

func (im *Image) UnmarshalJSON(b []byte) error {
	mu.Lock()
	defer mu.Unlock()
	var m map[string]string
	if err := json.Unmarshal(b, &m); err != nil {
		return err
	}
	if m["encoded"] == "" {
		return errors.New("missing encoded image")
	}
	im.Name = strings.ToLower(m["encoded"])
	return nil
}

type Doc struct {
	Title string
	Image *Image
	Note  string
}

func main() {
	b, err := json.Marshal(&Image{Name: "top"})
	println("top:", string(b), err == nil)

	im := &Image{}
	err = json.Unmarshal(b, im)
	println("top back:", im.Name, err == nil)

	doc := &Doc{Title: "t", Image: &Image{Name: "nested"}, Note: "n"}
	b, err = json.Marshal(doc)
	println("doc:", string(b), err == nil)

	b2, err := json.MarshalIndent(doc, "", " ")
	println("indent:", string(b2), err == nil)

	back := &Doc{}
	err = json.Unmarshal(b, back)
	println("doc back:", back.Title, back.Image.Name, back.Note, err == nil)

	_, err = json.Marshal(&Doc{Image: &Image{Name: "bad"}})
	println("marshal error:", strings.HasSuffix(err.Error(), ": cannot marshal bad image"))

	err = json.Unmarshal([]byte(`{"Image":{"other":"x"}}`), &Doc{})
	println("unmarshal error:", err.Error())
}
