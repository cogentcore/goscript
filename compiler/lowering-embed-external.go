package compiler

import (
	"net/url"
	"path"
	"slices"
	"strconv"
	"strings"
)

// ExternalEmbedPolicy selects the files of embed.FS variables that are written
// as separate files beside the package output instead of into its modules.
// The runtime fetches such a file when it is first opened or read, while the
// file names, sizes and directories stay known without it, so a large tree of
// media files does not make the program larger.
type ExternalEmbedPolicy struct {
	// Patterns are path.Match patterns of the base names of the external
	// files, such as *.png. No pattern keeps every file inline.
	Patterns []string
	// MinSize is the size in bytes from which a matching file is external.
	MinSize int64
}

// externalEmbedDir is the directory of the external files of a package, beside
// its modules. The @ is not valid in an import path, so it is never the
// output directory of another package.
const externalEmbedDir = "@embed"

// enabled reports whether the policy makes any file external.
func (p *ExternalEmbedPolicy) enabled() bool {
	return p != nil && len(p.Patterns) != 0
}

// external reports whether the embedded file is written as a separate file.
func (p *ExternalEmbedPolicy) external(file goEmbedFile) bool {
	if !p.enabled() || int64(len(file.data)) < p.MinSize {
		return false
	}
	base := path.Base(file.path)
	return slices.ContainsFunc(p.Patterns, func(pattern string) bool {
		matched, err := path.Match(pattern, base)
		return err == nil && matched
	})
}

// key returns the policy as a cache key field value.
func (p *ExternalEmbedPolicy) key() string {
	if !p.enabled() {
		return ""
	}
	return strconv.FormatInt(p.MinSize, 10) + "|" + strings.Join(p.Patterns, "|")
}

// externalEmbedName returns the name of the external file of an embedded
// file, in [externalEmbedDir]: its base name prefixed by a digest of its
// contents, so that names stay unique when the files of many packages are
// copied into one directory, and a changed file gets a new URL.
func externalEmbedName(file goEmbedFile) string {
	return sha256Hex(file.data)[:16] + "-" + path.Base(file.path)
}

// externalEmbedEntry returns the TypeScript literal of an external file of an
// embed.FS value: its path, its size and the URL of its contents beside the
// module, which also holds where a bundler puts all modules into one file, if
// the external files are copied beside that file. It records the contents of
// the file in assets, by their output path relative to the package output.
func externalEmbedEntry(file goEmbedFile, assets map[string][]byte) string {
	name := externalEmbedDir + "/" + externalEmbedName(file)
	assets[name] = file.data
	ref := "./" + externalEmbedDir + "/" + url.PathEscape(externalEmbedName(file))
	href := "new URL(" + lowerGoStringLiteral(ref) + ", import.meta.url).href"
	return "[" + lowerGoStringLiteral(file.path) + ", " + strconv.Itoa(len(file.data)) + ", " + href + "]"
}
