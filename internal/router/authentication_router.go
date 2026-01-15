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

func RegisterAuthenticationRouter(router fiber.Router, appCtx *AppContext, cfg *config.Config) {
	authr := repository.NewAuthenticationRepository(appCtx.DB, appCtx.Client)
	userr := repository.NewUserRepository(appCtx.DB, appCtx.Client)
	accessSvc := jwt.NewJWTService(cfg.JwtCfg.AccessTokenSecret, "santriconnect.com", authr)
	refreshSvc := jwt.NewJWTService(cfg.JwtCfg.RefreshTokenSecret, "santriconnect.com", authr)
	service := usecase.NewAuthenticationUsecase(authr, userr, accessSvc, refreshSvc)
	handling := handler.NewAuthenticationHandler(service)

	auth := router.Group("/auth").Use(middleware.RateLimiter(cfg))
	{
		auth.Post("/login", handling.Login)
		auth.Post("/register", handling.StudentRegistration)

		protect := auth.Use(middleware.AuthMiddleware(accessSvc, "admin", "teacher", "student"))
		{
			protect.Post("/logout", handling.Logout)
		}
	}
}
