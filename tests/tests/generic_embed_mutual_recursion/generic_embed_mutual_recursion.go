package main

type Window interface {
	Name() string
}

type App interface {
	Window() Window
	FirstName() string
}

type AppBase[W Window] struct {
	Windows []W
}

func (a *AppBase[W]) Window() Window {
	if len(a.Windows) == 0 {
		return nil
	}
	return a.Windows[0]
}

type WindowBase[A App] struct {
	App  A
	name string
}

func (w *WindowBase[A]) Name() string { return w.name }

// AppWindowName calls a method of the type argument A, whose own
// type arguments refer back to the window type.
func (w *WindowBase[A]) AppWindowName() string {
	return w.App.Window().Name() + " via " + w.App.FirstName()
}

// FirstName calls a method of the type argument W.
func (a *AppBase[W]) FirstName() string {
	if len(a.Windows) == 0 {
		return ""
	}
	return a.Windows[0].Name()
}

type MyApp struct {
	AppBase[*MyWindow]
}

type MyWindow struct {
	WindowBase[*MyApp]
}

func main() {
	a := &MyApp{}
	w := &MyWindow{}
	w.name = "main"
	w.App = a
	a.Windows = append(a.Windows, w)
	var app App = a
	println(app.Window().Name())
	println(w.App.Window().Name())
	println(w.AppWindowName())
	println(a.FirstName())
}
