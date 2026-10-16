package main

// Level is a named non-struct type with a value method.
type Level int

func (l Level) Rank(prefix string) string {
	if l > 2 {
		return prefix + "senior"
	}
	return prefix + "junior"
}

type Ranker interface {
	Rank(prefix string) string
}

// Engineer promotes Rank from its embedded Level.
type Engineer struct {
	Level
	Name string
}

// Lead promotes Rank from the Level within its embedded Engineer.
type Lead struct {
	Engineer
}

// Tags is a named slice type with a pointer method.
type Tags []string

func (t *Tags) Add(tag string) int {
	*t = append(*t, tag)
	return len(*t)
}

type Adder interface {
	Add(tag string) int
}

// Post promotes the pointer method Add of its embedded Tags.
type Post struct {
	Tags
}

func main() {
	eng := Engineer{Level: 3, Name: "Grace"}
	println("direct:", eng.Rank("rank: "))

	var r Ranker = eng
	println("interface:", r.Rank("value: "))

	r = &Engineer{Level: 1, Name: "Ada"}
	println("pointer:", r.Rank("pointer: "))

	lead := &Lead{Engineer{Level: 4, Name: "Linus"}}
	println("nested direct:", lead.Rank("lead: "))
	r = lead
	println("nested interface:", r.Rank("lead: "))

	post := &Post{}
	post.Add("go")
	var a Adder = post
	println("pointer method:", a.Add("js"), len(post.Tags), post.Tags[1])
}
