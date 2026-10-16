package compiler

import (
	"encoding/json"
	"strings"
	"testing"
)

func TestIntegerBitHelpersHandleNilTypes(t *testing.T) {
	if bits, ok := unsignedIntegerBits(nil); ok || bits != 0 {
		t.Fatalf("unsignedIntegerBits(nil) = %d, %v; want 0, false", bits, ok)
	}
	if bits, ok := signedIntegerBits(nil); ok || bits != 0 {
		t.Fatalf("signedIntegerBits(nil) = %d, %v; want 0, false", bits, ok)
	}
	if bits, ok := integerBits(nil); ok || bits != 0 {
		t.Fatalf("integerBits(nil) = %d, %v; want 0, false", bits, ok)
	}
	if isRuntimeWideIntegerType(nil) {
		t.Fatalf("isRuntimeWideIntegerType(nil) = true; want false")
	}
}

func TestPointerToArrayTypeHandlesNilTypes(t *testing.T) {
	if array := pointerToArrayType(nil); array != nil {
		t.Fatalf("pointerToArrayType(nil) = %v; want nil", array)
	}
}

// TestEmbeddedTextLiteral checks that embedded UTF-8 text is written as a
// string literal of the same bytes, and that other data is not.
func TestEmbeddedTextLiteral(t *testing.T) {
	// Text of any characters reads back as itself (the escapes are JSON escapes).
	for _, text := range []string{"plain", "a\"b\\c\nd\re\tf", "é漢😀", "\x00\x01\x1f\x7f", "\u2028\u2029"} {
		lit, ok := embeddedTextLiteral([]byte(text), 1000)
		if !ok {
			t.Fatalf("%q: not written as text", text)
		}
		var got string
		if err := json.Unmarshal([]byte(lit), &got); err != nil || got != text {
			t.Fatalf("%q: literal %s reads back as %q (%v)", text, lit, got, err)
		}
		if strings.ContainsAny(lit, "\n\r\u2028\u2029") {
			t.Fatalf("%q: literal %s has a raw line terminator", text, lit)
		}
	}

	// Invalid UTF-8 and literals longer than the limit are not written as text.
	if _, ok := embeddedTextLiteral([]byte{0xff, 'a'}, 1000); ok {
		t.Fatal("invalid UTF-8 written as text")
	}
	if _, ok := embeddedTextLiteral([]byte(strings.Repeat("\x01", 30)), 42); ok {
		t.Fatal("escaped text longer than the limit written as text")
	}
}
