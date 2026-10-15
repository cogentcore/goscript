package main

import (
	"io"

	"github.com/aperturerobotics/cli"
	"github.com/pkg/errors"
	"github.com/s4wave/goscript/compiler"
)

// Formats of the async report.
const (
	reportAsyncText = "text"
	reportAsyncJSON = "json"
)

// reportAsyncFlag is the value of -report-async: alone it asks for the text
// report, and -report-async=json for JSON.
type reportAsyncFlag struct {
	format string
}

// Set selects the report format.
func (f *reportAsyncFlag) Set(value string) error {
	switch value {
	case "", "true", reportAsyncText:
		f.format = reportAsyncText
	case reportAsyncJSON:
		f.format = reportAsyncJSON
	case "false":
		f.format = ""
	default:
		return errors.Errorf("invalid -report-async format %q (want text or json)", value)
	}
	return nil
}

// String returns the selected format.
func (f *reportAsyncFlag) String() string {
	return f.format
}

// IsBoolFlag lets the flag stand alone, without a value.
func (f *reportAsyncFlag) IsBoolFlag() bool {
	return true
}

// newReportAsyncFlag returns the -report-async flag with value f.
func newReportAsyncFlag(f *reportAsyncFlag) cli.Flag {
	return &cli.GenericFlag{
		Name:  "report-async",
		Usage: "report each root that makes functions async and how far it spreads, without changing the output (-report-async=json for JSON)",
		Value: f,
	}
}

// writeAsyncReports writes reports to w in the format of f.
func writeAsyncReports(w io.Writer, f *reportAsyncFlag, reports ...*compiler.AsyncReport) error {
	for _, report := range reports {
		var err error
		if f.format == reportAsyncJSON {
			err = report.WriteJSON(w)
		} else {
			err = report.WriteText(w)
		}
		if err != nil {
			return err
		}
	}
	return nil
}
