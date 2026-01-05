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

func RegisterAttendanceRouter(router fiber.Router, appCtx *AppContext, cfg *config.Config) {
	attendanceRepo := repository.NewAttendanceRepository(appCtx.DB, appCtx.Client)
	classJournalRepo := repository.NewClassJournalRepository(appCtx.DB, appCtx.Client)
	service := usecase.NewAttendanceUsecase(attendanceRepo, classJournalRepo)
	handling := handler.NewAttendanceHandler(service)

	attendance := router.Group("/attendance").Use(middleware.RateLimiter(cfg))
	{
		accessSvc := jwt.NewJWTService(
			cfg.JwtCfg.AccessTokenSecret, "santriconnect.com",
			repository.NewAuthenticationRepository(appCtx.DB, appCtx.Client),
		)

		public := attendance.Use(middleware.AuthMiddleware(accessSvc, "admin", "teacher", "student"))
		{
			public.Get("/student/:studentID", handling.FindByStudentID)
			public.Get("/journal/:journalID", handling.FindByJournalID)
			public.Get("/class/:classID", handling.FindByClassID)
			public.Get("/", handling.FindAll)
		}

		protected := attendance.Use(middleware.AuthMiddleware(accessSvc, "admin", "teacher"))
		{
			protected.Post("/bulk", handling.Save)
		}
	}
}
