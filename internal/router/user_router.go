package router

import (
	"santri-connect-api/internal/config"
	"santri-connect-api/internal/delivery/http/handler"
	"santri-connect-api/internal/infrastructure/jwt"
	"santri-connect-api/internal/middleware"
	"santri-connect-api/internal/repository"
	"santri-connect-api/internal/usecase"

	"github.com/gofiber/fiber/v2"
)

func RegisterUserRouter(router fiber.Router, appCtx *AppContext, cfg *config.Config) {
	userr := repository.NewUserRepository(appCtx.DB, appCtx.Client)
	authr := repository.NewAuthenticationRepository(appCtx.DB, appCtx.Client)
	service := usecase.NewUserUsecase(userr)
	handling := handler.NewUserHandler(service)
	accessSvc := jwt.NewJWTService(cfg.JwtCfg.AccessTokenSecret, "santriconnect.com", authr)

	user := router.Group("/users").Use(
		middleware.RateLimiter(cfg),
	)
	{
		public := user.Use(middleware.AuthMiddleware(accessSvc, "admin", "teacher", "student"))
		{
			public.Get("/:id", handling.FindByID)
		}
	}
}
