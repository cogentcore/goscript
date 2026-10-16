package main

import (
	"embed"
	"fmt"
	"io/fs"
	"reflect"
	"time"
)

func main() {
	// The fs.FS parameter of fs.ReadFile, registered by hand, takes an
	// embed.FS.
	var readFS embed.FS
	fmt.Println("readfile param", reflect.TypeOf(readFS).Implements(reflect.TypeOf(fs.ReadFile).In(0)))

	// Struct types of override packages have the methods of their Go types.
	format, ok := reflect.TypeOf(time.Time{}).MethodByName("Format")
	fmt.Println("time Format", ok, format.Type.NumIn(), format.Type.Out(0).Kind())
	fmt.Println("time pointer methods", reflect.TypeOf(&time.Time{}).NumMethod())
	var efs embed.FS
	fsType := reflect.TypeOf((*fs.FS)(nil)).Elem()
	fmt.Println("embed FS", reflect.TypeOf(efs).Implements(fsType), reflect.TypeOf(&efs).Implements(fsType))
}
