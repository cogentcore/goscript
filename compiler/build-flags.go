package compiler

import (
	"slices"
	"strings"
)

// goScriptBuildTags are the build tags added to every goscript build.
// goscript cannot run assembly, so the conventional purego and noasm tags
// select pure Go implementations in packages that provide them; otherwise
// assembly-backed functions would have no Go body to compile. math/big
// selects its pure Go arithmetic with math_big_pure_go.
var goScriptBuildTags = []string{"goscript", "purego", "noasm", "math_big_pure_go"}

// goScriptBuildFlags returns flags with goScriptBuildTags added to its -tags
// value, or a -tags flag carrying them when flags has none.
func goScriptBuildFlags(flags []string) []string {
	normalized := slices.Clone(flags)
	for i, flag := range normalized {
		switch {
		case flag == "-tags" && i+1 < len(normalized):
			normalized[i+1] = appendBuildTags(normalized[i+1], goScriptBuildTags)
			return normalized
		case strings.HasPrefix(flag, "-tags="):
			normalized[i] = "-tags=" + appendBuildTags(strings.TrimPrefix(flag, "-tags="), goScriptBuildTags)
			return normalized
		}
	}
	return append(normalized, "-tags="+strings.Join(goScriptBuildTags, ","))
}

// appendBuildTags returns the tag list value with each tag of add it lacks.
func appendBuildTags(value string, add []string) string {
	tags := strings.FieldsFunc(value, func(r rune) bool {
		return r == ',' || r == ' ' || r == '\t' || r == '\n'
	})
	for _, tag := range add {
		if !slices.Contains(tags, tag) {
			tags = append(tags, tag)
		}
	}
	return strings.Join(tags, ",")
}
