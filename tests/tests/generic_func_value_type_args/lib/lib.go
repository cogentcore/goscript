package lib

// Config is implemented by pointers to configs that embed BaseConfig.
type Config interface {
	AsBaseConfig() *BaseConfig
	Defaults()
}

// BaseConfig is embedded in configs.
type BaseConfig struct {
	Name string
}

func (bc *BaseConfig) AsBaseConfig() *BaseConfig { return bc }

// NewConfig makes a new config of type C, which needs its type argument.
func NewConfig[C any]() (*C, Config) {
	cfgC := new(C)
	cfg := any(cfgC).(Config)
	cfg.Defaults()
	return cfgC, cfg
}
