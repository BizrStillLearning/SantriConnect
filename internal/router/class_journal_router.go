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

func RegisterClassJournalRouter(router fiber.Router, appCtx *AppContext, cfg *config.Config) {
	classJournalRepo := repository.NewClassJournalRepository(appCtx.DB, appCtx.Client)
	teacherRepo := repository.NewTeacherRepository(appCtx.DB, appCtx.Client)
	service := usecase.NewClassJournalUseCase(classJournalRepo, teacherRepo)
	handling := handler.NewClassJournalHandler(service)

	classJournal := router.Group("/class-journals").Use(middleware.RateLimiter(cfg))
	{
		accessSvc := jwt.NewJWTService(
			cfg.JwtCfg.AccessTokenSecret, "santriconnect.com",
			repository.NewAuthenticationRepository(appCtx.DB, appCtx.Client),
		)

		public := classJournal.Use(middleware.AuthMiddleware(accessSvc, "admin", "teacher", "student"))
		{
			public.Get("/:id", handling.FindByID)
			public.Get("/", handling.FindAll)
			public.Get("/class/:classID", handling.FindByClassID)
			public.Get("/teacher/:teacherID", handling.FindByTeacherID)
			public.Get("/subject/:subjectID", handling.FindBySubjectID)

		}

		protected := classJournal.Use(middleware.AuthMiddleware(accessSvc, "admin", "teacher"))
		{
			protected.Post("/", handling.Save)
		}
	}
}
