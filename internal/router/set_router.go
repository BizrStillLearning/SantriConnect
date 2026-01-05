package router

import (
	"santri-connect-api/internal/config"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type AppContext struct {
	DB     *pgxpool.Pool
	Client *redis.Client
	Config *config.Config
}

func NewRegisterRouter(db *pgxpool.Pool, client *redis.Client, cfg *config.Config) *AppContext {
	return &AppContext{
		DB:     db,
		Client: client,
		Config: cfg,
	}
}

func RegisterRouter(router fiber.Router, appCtx *AppContext, cfg *config.Config) {
	RegisterAuthenticationRouter(router, appCtx, cfg)
	RegisterClassJournalRouter(router, appCtx, cfg)
	RegisterStudentRouter(router, appCtx, cfg)
	RegisterAttendanceRouter(router, appCtx, cfg)
	RegisterTeacherRouter(router, appCtx, cfg)
	RegisterUserRouter(router, appCtx, cfg)
}
