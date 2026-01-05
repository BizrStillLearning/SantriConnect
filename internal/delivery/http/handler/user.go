package handler

import (
	"context"
	"errors"
	"santri-connect-api/internal/delivery/http"
	"santri-connect-api/internal/domain"
	"santri-connect-api/internal/usecase"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

type UserHandler struct {
	usecase usecase.UserUsecase
}

func NewUserHandler(usecase usecase.UserUsecase) *UserHandler {
	return &UserHandler{
		usecase: usecase,
	}
}

func (h *UserHandler) FindByID(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "ID harus berupa angka", domain.ErrBodyParse)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindByID(ctx, id)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "gagal mendapatkan data user", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *UserHandler) mapperStatusToResponse(err error) int {
	switch {
	case errors.Is(err, domain.ErrUserNotFound):
		return fiber.StatusNotFound
	case errors.Is(err, domain.ErrExecution):
		return fiber.StatusInternalServerError
	default:
		return fiber.StatusInternalServerError
	}
}
