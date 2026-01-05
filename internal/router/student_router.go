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

func RegisterStudentRouter(router fiber.Router, appCtx *AppContext, cfg *config.Config) {
	studentRepo := repository.NewStudentRepository(appCtx.DB, appCtx.Client)
	authr := repository.NewAuthenticationRepository(appCtx.DB, appCtx.Client)
	service := usecase.NewStudentUsecase(studentRepo)
	handling := handler.NewStudentHandler(service)
	accessSvc := jwt.NewJWTService(cfg.JwtCfg.AccessTokenSecret, "santriconnect.com", authr)

	student := router.Group("/students").Use(middleware.RateLimiter(cfg))
	{
		public := student.Use(middleware.AuthMiddleware(accessSvc, "admin", "teacher", "student"))
		{
			public.Get("/:id", handling.FindByID)
			public.Get("/", handling.FindAll)
			public.Get("/class/:classID", handling.FindByClassID)
		}
	}
}
