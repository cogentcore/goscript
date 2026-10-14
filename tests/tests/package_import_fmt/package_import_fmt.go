package main

import (
	"bytes"
	"errors"
	"fmt"
)

type byteFormatter struct {
	prefix []byte
}

func (b byteFormatter) Format(state fmt.State, verb rune) {
	buf := append([]byte{}, b.prefix...)
	buf = append(buf, byte(verb))
	_, _ = state.Write(buf)
}

func main() {
	// Test basic Print functions
	fmt.Print("Hello")
	fmt.Print(" ")
	fmt.Print("World")
	fmt.Println()

	// Test Printf with basic formatting
	name := "Go"
	version := 1.21
	fmt.Printf("Welcome to %s %.2f\n", name, version)

	// Test Println
	fmt.Println("This is println")

	// Test Sprint functions
	result := fmt.Sprint("Sprint", " ", "result")
	fmt.Println("Sprint result:", result)
	parts := []any{"Spread", " ", "result"}
	spreadResult := fmt.Sprint(parts...)
	fmt.Println("Sprint spread result:", spreadResult)

	// Test Sprintf
	formatted := fmt.Sprintf("Number: %d, String: %s", 42, "test")
	fmt.Println("Sprintf result:", formatted)
	formatArgs := []any{7, "spread"}
	formattedSpread := fmt.Sprintf("Spread Number: %d, String: %s", formatArgs...)
	fmt.Println("Sprintf spread result:", formattedSpread)

	// Test Sprintln
	sprintln_result := fmt.Sprintln("Sprintln", "result")
	fmt.Print("Sprintln result:", sprintln_result)

	// Test Errorf
	err := fmt.Errorf("error code: %d", 404)
	fmt.Println("Error:", err)

	// Test various format verbs
	fmt.Printf("Boolean: %t\n", true)
	fmt.Printf("Integer: %d\n", 123)
	fmt.Printf("Float: %f\n", 3.14159)
	fmt.Printf("String: %s\n", "hello")
	fmt.Printf("Type: %T\n", 42)
	fmt.Printf("Value: %v\n", []int{1, 2, 3})

	// Test width and precision
	fmt.Printf("Width: '%5s'\n", "hi")
	fmt.Printf("Precision: '%.2f'\n", 3.14159)
	fmt.Printf("Both: '%5.2f'\n", 3.14159)
	fmt.Printf("Formatter: %v\n", byteFormatter{prefix: []byte("byte-")})
	bs := []byte("ab\"c")
	fmt.Printf("Bytes: %s %q %x %X %v\n", bs, bs, bs, bs, bs)
	fmt.Printf("String hex: %x %X\n", "hi", "hi")
	fmt.Printf("Hex flags: % x %#x %# x %#v\n", bs, bs, bs, bs)
	sub := bs[1:3]
	fmt.Printf("Sliced bytes: %s %q %x %X %v\n", sub, sub, sub, sub, sub)
	grown := append(make([]byte, 0, 2), 0xde, 0xad, 0xbe, 0xef)
	fmt.Printf("Grown bytes: %x %X % x %v\n", grown, grown, grown, grown)
	arr := [4]byte{0xca, 0xfe, 0x22, 0x41}
	view := arr[:]
	fmt.Printf("Array bytes: %s %q %x %X %x %v\n", view, view, view, view, arr, arr)
	var none []byte
	fmt.Printf("Nil bytes: [%s] %q [%x] %v\n", none, none, none, none)
	fmt.Printf("Quoted: %q %+q %#q %q %+q\n", "tab\there", "é", "raw", 'x', 'é')
	var seq uint64 = 255
	fmt.Printf("Uint64: %d %x %v\n", seq, seq, seq)
	appended := fmt.Append([]byte("base-"), "tail")
	fmt.Println("Append bytes:", string(appended))
	var buf bytes.Buffer
	fmt.Fprintln(&buf, "Buffered writer")
	fmt.Print(buf.String())

	starWidthPrecision()
	sliceVerbs()
	scanVerbs()

	println("test finished")
}

type num float32

func (f num) String() string {
	return fmt.Sprintf("%.*g", 7, float32(f))
}

// sliceVerbs checks that a verb, with its width and precision, applies to
// each element of a slice or array, while a byte slice formats as a whole.
func sliceVerbs() {
	fmt.Printf("%q\n", []string{"a", "b c"})
	fmt.Printf("%d %4d\n", []int{1, 2, 3}, []int{4, 5})
	fmt.Printf("%x\n", []int{10, 255})
	fmt.Printf("%.2f %6.1f\n", []float64{1.5, 2.25}, []float64{3.25})
	fmt.Printf("%t\n", []bool{true, false})
	fmt.Printf("%q\n", [2]string{"x", "y"})
	fmt.Printf("%q %x\n", []byte("hi"), []byte("hi"))
	fmt.Printf("%s %q\n", []string{"a", "b"}, []string{})
}

// starWidthPrecision checks that * takes a width or precision from the next
// operand, and that %w still binds to the right operand after one.
func starWidthPrecision() {
	fmt.Println(fmt.Sprintf("[%.*f]", 3, 3.14159))
	fmt.Println(fmt.Sprintf("[%*d]", 5, 42))
	fmt.Println(fmt.Sprintf("[%*d]", -5, 42))
	fmt.Println(fmt.Sprintf("[%*.*f]", 8, 2, 3.14159))
	fmt.Println(fmt.Sprintf("[%.*g]", 7, float32(13.333333)))
	fmt.Println(fmt.Sprintf("[%.*d] [%s]", -1, 5, "after"))
	fmt.Println(fmt.Sprintf("[%v]", num(6.6666665)))
	fmt.Println(fmt.Sprintf("[%.*d]", "x", 5))
	err := fmt.Errorf("%*s: %w", 6, "ctx", errors.New("base"))
	fmt.Println(err, errors.Unwrap(err) != nil)
}

type pos struct {
	Line, Char int
}

// scanVerbs checks Sscanf verbs, widths and errors, and Sscan.
func scanVerbs() {
	var f32 float32
	n, err := fmt.Sscanf("1.0", "%g", &f32)
	fmt.Println("g float32:", n, err == nil, f32)

	var f64 float64
	n, err = fmt.Sscanf(" 2.5e1 rest", "%f", &f64)
	fmt.Println("f float64:", n, err == nil, f64)

	var i64 int64
	var u8 uint8
	n, err = fmt.Sscanf("-42,200", "%d,%d", &i64, &u8)
	fmt.Println("d int64 uint8:", n, err == nil, i64, u8)

	var r, g, b uint8
	n, err = fmt.Sscanf("ff8000", "%02x%02x%02x", &r, &g, &b)
	fmt.Println("02x:", n, err == nil, r, g, b)
	n, err = fmt.Sscanf("f80", "%1x%1x%1x", &r, &g, &b)
	fmt.Println("1x:", n, err == nil, r, g, b)

	var p pos
	n, err = fmt.Sscanf("L12C3", "L%dC%d", &p.Line, &p.Char)
	fmt.Println("struct fields:", n, err == nil, p.Line, p.Char)

	var s string
	var v int
	n, err = fmt.Sscanf("name 7", "%s %v", &s, &v)
	fmt.Println("s v:", n, err == nil, s, v)

	var bl bool
	n, err = fmt.Sscanf("true", "%t", &bl)
	fmt.Println("t:", n, err == nil, bl)

	n, err = fmt.Sscanf("abc", "%d", &v)
	fmt.Println("bad int:", n, err != nil)

	n, err = fmt.Sscanf("12", "%d %d", &v, &i64)
	fmt.Println("short:", n, err != nil, v)

	var a, c int
	var word string
	n, err = fmt.Sscan("3  4\n hello", &a, &c, &word)
	fmt.Println("Sscan:", n, err == nil, a, c, word)
	var fl float64
	n, err = fmt.Sscan("1.25", &fl)
	fmt.Println("Sscan float:", n, err == nil, fl)
}
