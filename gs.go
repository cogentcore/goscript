package goscript

import (
	_ "embed"
	"encoding/json"
	"errors"
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

// browserTestPackages are the npm packages that run package tests in a
// browser with Vitest and Playwright.
var browserTestPackages = []string{"vitest", "@vitest/browser", "@vitest/browser-playwright", "playwright"}

// BrowserTestDependencies returns the npm packages needed to run package
// tests in a browser, mapping each package name to the version in the
// goscript development dependencies.
func BrowserTestDependencies() (map[string]string, error) {
	// The versions come from the embedded goscript package.json.
	var manifest struct {
		DevDependencies map[string]string `json:"devDependencies"`
	}
	if err := json.Unmarshal(packageJSON, &manifest); err != nil {
		return nil, err
	}

	// Every browser test package must have a pinned version.
	deps := make(map[string]string, len(browserTestPackages))
	for _, name := range browserTestPackages {
		version, ok := manifest.DevDependencies[name]
		if !ok {
			return nil, errors.New("goscript package.json has no devDependency " + name)
		}
		deps[name] = version
	}
	return deps, nil
}
