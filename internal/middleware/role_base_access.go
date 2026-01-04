package middleware

import (
	"context"
	"santri-connect-api/internal/delivery/http"
	"santri-connect-api/internal/domain"
	"santri-connect-api/internal/infrastructure/jwt"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AuthMiddleware(jwtSvc jwt.TokenUseCases, roles ...string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(c.Context(), 1*time.Second)
		defer cancel()

		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return http.ErrorResponse(
				c, fiber.StatusUnauthorized, "missing authorization header", domain.ErrAuthHeaderNil,
			)
		}

		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			return http.ErrorResponse(
				c, fiber.StatusUnauthorized, "Invalid authorization format", domain.ErrFormatHeaders,
			)
		}

		token := tokenParts[1]
		claims, err := jwtSvc.ValidateToken(ctx, token)
		if err != nil {
			return http.ErrorResponse(c, fiber.StatusUnauthorized, "invalid or expired token", err)
		}

		for _, role := range roles {
			if role == claims.Role {
				break
			}

			return http.ErrorResponse(
				c, fiber.StatusForbidden, "failed to authenticate user, insufficient permission",
				domain.ErrPermissions,
			)
		}

		c.Locals("users", claims)
		c.Locals("token", token)

		return c.Next()
	}
}
