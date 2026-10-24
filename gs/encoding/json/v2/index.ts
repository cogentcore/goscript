// encoding/json/v2 is not supported: its implementation uses the internals of
// encoding/json/jsontext, which the jsontext override does not implement, so
// compiling it from Go source fails when the package initializes. parity.json
// blocks every export, so a program that uses one fails to compile instead.
export {}
