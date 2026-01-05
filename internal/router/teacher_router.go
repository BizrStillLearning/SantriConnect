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

func RegisterTeacherRouter(router fiber.Router, appCtx *AppContext, cfg *config.Config) {
	teacherRepo := repository.NewTeacherRepository(appCtx.DB, appCtx.Client)
	authr := repository.NewAuthenticationRepository(appCtx.DB, appCtx.Client)
	service := usecase.NewTeacherUsecase(teacherRepo)
	handling := handler.NewTeacherHandler(service)
	accessSvc := jwt.NewJWTService(
		cfg.JwtCfg.AccessTokenSecret, "santriconnect.com",
		authr,
	)

	teacher := router.Group("/teachers").Use(middleware.RateLimiter(cfg))
	{
		public := teacher.Use(middleware.AuthMiddleware(accessSvc, "admin", "teacher", "student"))
		{
			public.Get("/:id", handling.FindByID)
			public.Get("/user/:userID", handling.FindByUserID)
			public.Get("/", handling.FindAll)
			public.Get("/specialization/:specialization", handling.FindBySpecialization)
			public.Get("/id/user/:userID", handling.FindIDByUserID)
		}

		admin := teacher.Use(middleware.AuthMiddleware(accessSvc, "admin"))
		{
			admin.Post("/", handling.AddTeacher)
		}
	}
}
