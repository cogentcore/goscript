package main

func main() {
	println(create(&descriptor{Label: "shader"}).(string))
	println(create(nil) == nil)
}
