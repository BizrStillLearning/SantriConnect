package router

import (
	"santri-connect-api/internal/config"
	"santri-connect-api/internal/delivery/http/handler"
	"santri-connect-api/internal/middleware"
	"santri-connect-api/internal/repository"
	"santri-connect-api/internal/usecase"

	"github.com/gofiber/fiber/v2"
)

func RegisterStudentRouter(router fiber.Router, appCtx *AppContext, cfg *config.Config) {
	studentRepo := repository.NewStudentRepository(appCtx.DB, appCtx.Client)
	service := usecase.NewStudentUsecase(studentRepo)
	handling := handler.NewStudentHandler(service)

	student := router.Group("/students").Use(middleware.RateLimiter(cfg))
	{
		student.Get("/:id", handling.FindByID)
		student.Get("/", handling.FindAll)
		student.Get("/class/:classID", handling.FindByClassID)

		// Protected routes - could be expanded based on specific business logic
		//accessSvc := jwt.NewJWTService(cfg.JwtCfg.AccessTokenSecret, "santriconnect.com", repository.NewAuthenticationRepository(appCtx.DB, appCtx.Client))
		////protected := student.Use(middleware.AuthMiddleware(accessSvc, "admin", "teacher"))
		////{
		////	// Add protected routes here when needed
		////}
	}
}
