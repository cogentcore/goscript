package main

type point struct {
	X, Y int
}

type box struct {
	Min, Max point
	Name     string
}

var boxes []box

func find(name string) box {
	for _, b := range boxes {
		if b.Name == name {
			return b
		}
	}
	return box{}
}

func widen(i int) {
	boxes[i].Max.X += 100
}

func main() {
	boxes = []box{{Min: point{1, 2}, Max: point{3, 4}, Name: "a"}, {Min: point{5, 6}, Max: point{7, 8}, Name: "b"}}

	// A value that the body only reads.
	sum := 0
	for _, b := range boxes {
		sum += b.Max.X - b.Min.X + len(b.Name)
	}
	println("sum:", sum)

	// A returned value is a copy of the element.
	found := find("b")
	found.Max.X = 70
	println("found:", found.Max.X, boxes[1].Max.X)

	// A store into the element leaves the value as it was.
	for i, b := range boxes {
		boxes[i].Min.X = 10 * (i + 1)
		println("store:", b.Min.X, boxes[i].Min.X)
	}

	// A call that changes the element leaves the value as it was.
	for i, b := range boxes {
		widen(i)
		println("call:", b.Max.X, boxes[i].Max.X)
	}

	// A copy made in the body is its own value.
	var last box
	for _, b := range boxes {
		c := b
		c.Name = "copy"
		last = b
		println("copy:", b.Name, c.Name)
	}
	last.Min.Y = -1
	println("last:", last.Name, last.Min.Y, boxes[1].Min.Y)

	// A changed value is its own copy.
	for _, b := range boxes {
		b.Min.Y++
		println("changed:", b.Min.Y, boxes[0].Min.Y)
	}

	// Array elements.
	grid := [][2]int{{1, 2}, {3, 4}}
	total := 0
	for _, row := range grid {
		for _, v := range row {
			total += v
		}
	}
	println("grid:", total)
	for i, row := range grid {
		grid[i][0] = 9
		println("grid store:", row[0], grid[i][0])
	}

	// Interface values hold copies.
	var held []any
	for _, b := range boxes {
		var v any = b
		held = append(held, v)
	}
	boxes[0].Name = "z"
	println("held:", held[0].(box).Name, boxes[0].Name)
}
