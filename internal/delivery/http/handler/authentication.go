package handler

import (
	"context"
	"errors"
	"santri-connect-api/internal/delivery/http"
	"santri-connect-api/internal/delivery/http/dto/request"
	"santri-connect-api/internal/domain"
	"santri-connect-api/internal/usecase"
	"time"

	"github.com/gofiber/fiber/v2"
)

type AuthenticationHandler struct {
	usecase usecase.AuthenticationUsecase
}

func NewAuthenticationHandler(usecase usecase.AuthenticationUsecase) *AuthenticationHandler {
	return &AuthenticationHandler{
		usecase: usecase,
	}
}

func (h *AuthenticationHandler) Login(c *fiber.Ctx) error {
	var req request.LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "data request tidak valid", domain.ErrBodyParse)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.Login(ctx, req.Username, req.Password)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "user gagal login", err)
	}

	c.Cookie(
		&fiber.Cookie{
			Name:     "refresh_token",
			Value:    resp.RefreshToken,
			Expires:  time.Now().Add(time.Hour * 24 * 7),
			HTTPOnly: true,
			Secure:   false,
			SameSite: "Lax",
			Path:     "/",
		},
	)

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *AuthenticationHandler) Logout(c *fiber.Ctx) error {
	token := c.Locals("token").(string)

	resp, err := h.usecase.Logout(c.Context(), token)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "user gagal logout", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *AuthenticationHandler) mapperStatusToResponse(err error) int {
	switch {
	case errors.Is(err, domain.ErrInvalidPassword), errors.Is(err, domain.ErrPasswordMismatch):
		return fiber.StatusUnauthorized
	case errors.Is(err, domain.ErrUserNotFound):
		return fiber.StatusNotFound
	case errors.Is(err, domain.ErrSessionNotFound), errors.Is(err, domain.ErrInvalidRefreshToken):
		return fiber.StatusUnauthorized
	case errors.Is(err, domain.ErrSessionRevoked):
		return fiber.StatusUnauthorized
	case errors.Is(err, domain.ErrSessionExpired):
		return fiber.StatusUnauthorized
	case errors.Is(err, domain.ErrTokenReuseDetected):
		return fiber.StatusUnauthorized
	default:
		return fiber.StatusInternalServerError
	}
}
