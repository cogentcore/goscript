package goscript

import (
	_ "embed"
	"encoding/json"
)

//go:generate go test -run TestGsEmbedCurrent -update .

// packageJSON is the goscript npm package manifest. Its dependencies are the
// npm packages that the gs/ runtime packages import.
//
//go:embed package.json
var packageJSON []byte

// RuntimeDependencies returns the npm packages that the gs/ runtime packages
// may import, mapping each package name to its version. Programs whose output
// imports one of these packages need it installed to typecheck, bundle, or run.
func RuntimeDependencies() (map[string]string, error) {
	var manifest struct {
		Dependencies map[string]string `json:"dependencies"`
	}
	if err := json.Unmarshal(packageJSON, &manifest); err != nil {
		return nil, err
	}
	return manifest.Dependencies, nil
}
