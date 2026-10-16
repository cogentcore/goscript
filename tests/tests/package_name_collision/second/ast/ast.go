package ast

type Node interface{ Pos() int }

type Type struct{ Kind int }

type List struct{ N int }

func (l *List) Pos() int { return l.N }
