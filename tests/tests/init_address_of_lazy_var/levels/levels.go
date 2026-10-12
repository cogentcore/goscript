package levels

// UserLevel is address-taken here and initialized from another variable.
var UserLevel = defaultLevel

var defaultLevel = compute()

func compute() int { return 4 }

// Ptr returns the address of UserLevel.
func Ptr() *int { return &UserLevel }
