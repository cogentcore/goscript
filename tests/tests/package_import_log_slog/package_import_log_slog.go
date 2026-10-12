package main

import (
	"bytes"
	"log/slog"
)

func main() {
	s := slog.StringValue("hello")
	println(s.Kind().String(), s.String())
	println(slog.IntValue(42).Int64(), slog.Int64Value(-7).String())
	println(slog.BoolValue(true).Bool(), slog.Float64Value(1.5).Float64())

	a := slog.String("name", "gopher")
	println(a.Key, a.Value.String(), a.String())
	println(slog.Int("n", 3).String(), slog.Any("x", []int{1, 2}).String())

	g := slog.Group("g", slog.String("a", "x"), slog.Int("b", 2))
	attrs := g.Value.Group()
	println(g.Value.Kind().String(), len(attrs), attrs[0].Key, attrs[1].Value.Int64())
	println(g.String())
	println(slog.StringValue("a").Equal(slog.StringValue("a")), s.Equal(slog.StringValue("other")))

	var buf bytes.Buffer
	logger := slog.New(slog.NewTextHandler(&buf, &slog.HandlerOptions{
		ReplaceAttr: func(groups []string, a slog.Attr) slog.Attr {
			if a.Key == slog.TimeKey && len(groups) == 0 {
				return slog.Attr{}
			}
			return a
		},
	}))
	logger.Info("text message", "count", 3, "name", "go pher", slog.Group("grp", "k", "v"))
	print(buf.String())

	buf.Reset()
	jl := slog.New(slog.NewJSONHandler(&buf, &slog.HandlerOptions{
		Level: slog.LevelDebug,
		ReplaceAttr: func(groups []string, a slog.Attr) slog.Attr {
			if a.Key == slog.TimeKey && len(groups) == 0 {
				return slog.Attr{}
			}
			return a
		},
	}))
	jl.Debug("json message", "ok", true, slog.Group("grp", slog.Int("i", 1)))
	jl.With("w", "x").WithGroup("sub").Warn("with", "y", 2.5)
	print(buf.String())

	old := slog.Default()
	slog.SetDefault(logger)
	buf.Reset()
	slog.Error("default", "err", "boom")
	print(buf.String())
	slog.SetDefault(old)
}
