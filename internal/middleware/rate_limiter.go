package middleware

import (
	"santri-connect-api/internal/config"
	"santri-connect-api/internal/delivery/http"
	"santri-connect-api/internal/domain"
	"santri-connect-api/internal/pkg/utils"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/storage/redis/v3"
)

func RateLimiter(cfg *config.Config) fiber.Handler {
	redisPort := utils.ConvertToInt(cfg.RedisCfg.Port)

	storage := redis.New(
		redis.Config{
			Host:     cfg.RedisCfg.Host,
			Port:     redisPort,
			Password: cfg.RedisCfg.Password,
			Database: cfg.RedisCfg.DB,
		},
	)
	return limiter.New(
		limiter.Config{
			Max:        10,
			Expiration: 1 * time.Minute,
			KeyGenerator: func(c *fiber.Ctx) string {
				return c.IP()
			},
			LimitReached: func(c *fiber.Ctx) error {
				return http.ErrorResponse(
					c, fiber.StatusTooManyRequests, "rate limit reached", domain.ErrRateLimitExceeded,
				)
			},
			SkipFailedRequests:     false,
			SkipSuccessfulRequests: false,
			Storage:                storage,
		},
	)
}
