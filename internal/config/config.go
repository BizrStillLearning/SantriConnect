package config

import (
	"os"
	"santri-connect-api/internal/infrastructure/database"
	"santri-connect-api/internal/infrastructure/jwt"
	"santri-connect-api/internal/pkg/utils"
)

type Config struct {
	DBURL    string
	RedisCfg database.RedisConfig
	JwtCfg   jwt.ConfigJWT
}

func Configuration() *Config {
	config := &Config{}

	config.DBURL = os.Getenv("DATABASE_URL")
	config.RedisCfg = database.RedisConfig{
		Host:     os.Getenv("REDIS_HOST"),
		Port:     os.Getenv("REDIS_PORT"),
		Password: os.Getenv("REDIS_PASSWORD"),
		DB:       utils.ConvertToInt(os.Getenv("REDIS_DB")),
	}

	config.JwtCfg = jwt.ConfigJWT{
		AccessTokenSecret:  os.Getenv("ACCESS_TOKEN_SECRET"),
		RefreshTokenSecret: os.Getenv("REFRESH_TOKEN_SECRET"),
	}

	return config
}
