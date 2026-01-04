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
	service := usecase.NewClassJournalUseCase(classJournalRepo)
	handling := handler.NewClassJournalHandler(service)

	classJournal := router.Group("/class-journals").Use(middleware.RateLimiter(cfg))
	{
		classJournal.Get("/:id", handling.FindByID)
		classJournal.Get("/", handling.FindAll)
		classJournal.Get("/class/:classID", handling.FindByClassID)
		classJournal.Get("/teacher/:teacherID", handling.FindByTeacherID)
		classJournal.Get("/subject/:subjectID", handling.FindBySubjectID)

		// Protected routes
		accessSvc := jwt.NewJWTService(cfg.JwtCfg.AccessTokenSecret, "santriconnect.com", repository.NewAuthenticationRepository(appCtx.DB, appCtx.Client))
		protected := classJournal.Use(middleware.AuthMiddleware(accessSvc, "admin", "teacher"))
		{
			protected.Post("/", handling.Save)
		}
	}
}
