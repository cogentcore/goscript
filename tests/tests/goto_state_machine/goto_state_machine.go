package main

// scanner follows the structure of the script data tokenizer in
// golang.org/x/net/html, whose first state precedes the gotos to the others.
type scanner struct {
	data string
	pos  int
	done bool
}

func (s *scanner) readByte() byte {
	if s.pos >= len(s.data) {
		s.done = true
		return 0
	}
	c := s.data[s.pos]
	s.pos++
	return c
}

// readScript returns the position of the end of the script data before
// the closing tag, skipping a closing tag inside an escaped comment.
func (s *scanner) readScript() int {
	var c byte

scriptData:
	c = s.readByte()
	if s.done {
		return s.pos
	}
	if c == '<' {
		goto scriptDataLessThanSign
	}
	goto scriptData

scriptDataLessThanSign:
	c = s.readByte()
	if s.done {
		return s.pos
	}
	switch c {
	case '/':
		goto scriptDataEndTagOpen
	case '!':
		goto scriptDataEscapeStart
	}
	goto scriptData

scriptDataEndTagOpen:
	return s.pos - 2

scriptDataEscapeStart:
	for i := 0; i < 2; i++ {
		c = s.readByte()
		if s.done {
			return s.pos
		}
		if c != '-' {
			goto scriptData
		}
	}
	goto scriptDataEscaped

scriptDataEscaped:
	c = s.readByte()
	if s.done {
		return s.pos
	}
	switch c {
	case '-':
		goto scriptDataEscapedDash
	}
	goto scriptDataEscaped

scriptDataEscapedDash:
	c = s.readByte()
	if s.done {
		return s.pos
	}
	if c == '-' {
		c = s.readByte()
		if c == '>' {
			goto scriptData
		}
	}
	goto scriptDataEscaped
}

func main() {
	for _, src := range []string{
		"a < b</script>",
		"x<!-- </script> -->y</script>",
		"<!x</script>",
		"no end",
	} {
		s := &scanner{data: src}
		end := s.readScript()
		println(src[:end])
	}
	println(encode([]rune{'a', 0xa5, 0x85, 0x300, 'b'}))
}

// encode follows the structure of the HZ-GB2312 encoder in golang.org/x/text,
// where statements after a backward goto use variables declared after the
// last label.
func encode(rs []rune) string {
	out := ""
	for _, r := range rs {
		if r < 0x80 {
			out += string(r)
			continue
		}
		if r < 0x100 {
			goto writeGB
		}

	terminate:
		out += "?"
		continue

	writeGB:
		c0 := uint8(r) - 0x80
		if c0 < 0x21 {
			goto terminate
		}
		out += "[" + string(rune('A'+c0%26)) + "]"
	}
	return out
}
