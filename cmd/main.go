package main

import (
	"context"
	"fmt"
	"log"
	"santri-connect-api/internal/config"
	"santri-connect-api/internal/infrastructure/database"
	"santri-connect-api/internal/router"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env file")
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cfg := config.Configuration()

	app := fiber.New(
		fiber.Config{
			AppName: "API Santri Connect",
		},
	)

	app.Use(
		cors.New(
			cors.Config{
				AllowOrigins:     "http://127.0.0.1:5500, http://localhost:5500, http://localhost:3030, http://127.0.0.1:3030",
				AllowMethods:     "GET, POST, PUT, DELETE, OPTIONS",
				AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
				AllowCredentials: true,
			},
		),
	)

	db, err := database.ConnectDB(ctx, cfg.DBURL)
	if err != nil {
		log.Fatal(err)
		return
	}
	defer db.Close()

	client, err := database.ConnectRedis(ctx, cfg.RedisCfg)
	if err != nil {
		log.Fatal(err)
		return
	}
	defer client.Close()

	endpoint := app.Group("/api/v1")

	appContext := router.NewRegisterRouter(db, client, cfg)
	router.RegisterRouter(endpoint, appContext, cfg)

	if err := app.Listen(":8080"); err != nil {
		log.Fatal(err)
		return
	}

	fmt.Println("Server running on port 8080...")
}
