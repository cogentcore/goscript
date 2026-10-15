package visit

// Visitor is implemented only in the main package, and every implementation
// is sync, so Walk stays sync.
type Visitor interface {
	Visit(n int) int
}

func Walk(v Visitor, values []int) int {
	sum := 0
	for _, n := range values {
		sum += v.Visit(n)
	}
	return sum
}

// Fetcher has an async implementation in the main package, so Fetch is async.
type Fetcher interface {
	Fetch() int
}

func Fetch(f Fetcher) int {
	return f.Fetch() * 2
}
