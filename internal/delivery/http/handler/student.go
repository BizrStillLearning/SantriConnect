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

type StudentHandler struct {
	usecase usecase.StudentUsecase
}

func NewStudentHandler(usecase usecase.StudentUsecase) *StudentHandler {
	return &StudentHandler{
		usecase: usecase,
	}
}

func (h *StudentHandler) FindByID(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "ID harus berupa angka", domain.ErrBodyParse)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindByID(ctx, id)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "gagal mendapatkan data siswa", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *StudentHandler) FindAll(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindAll(ctx)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "gagal mendapatkan semua data siswa", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *StudentHandler) FindByClassID(c *fiber.Ctx) error {
	classID, err := strconv.Atoi(c.Params("classID"))
	if err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "Class ID harus berupa angka", domain.ErrBodyParse)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindByClassID(ctx, classID)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "gagal mendapatkan data siswa berdasarkan kelas", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *StudentHandler) mapperStatusToResponse(err error) int {
	switch {
	case errors.Is(err, domain.ErrStudentNotFound):
		return fiber.StatusNotFound
	case errors.Is(err, domain.ErrExecution):
		return fiber.StatusInternalServerError
	default:
		return fiber.StatusInternalServerError
	}
}
