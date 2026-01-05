package handler

import (
	"context"
	"errors"
	"santri-connect-api/internal/delivery/http"
	"santri-connect-api/internal/delivery/http/dto/request"
	"santri-connect-api/internal/domain"
	"santri-connect-api/internal/usecase"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

type TeacherHandler struct {
	usecase usecase.TeacherUsecase
}

func NewTeacherHandler(usecase usecase.TeacherUsecase) *TeacherHandler {
	return &TeacherHandler{
		usecase: usecase,
	}
}

func (h *TeacherHandler) FindByID(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "ID harus berupa angka", domain.ErrBodyParse)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindByID(ctx, id)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "gagal mendapatkan data guru", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *TeacherHandler) FindByUserID(c *fiber.Ctx) error {
	userID, err := strconv.Atoi(c.Params("userID"))
	if err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "User ID harus berupa angka", domain.ErrBodyParse)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindByUserID(ctx, userID)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "gagal mendapatkan data guru berdasarkan user", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *TeacherHandler) FindAll(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindAll(ctx)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "gagal mendapatkan semua data guru", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *TeacherHandler) FindBySpecialization(c *fiber.Ctx) error {
	specialization := c.Params("specialization")

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindBySpecialization(ctx, specialization)
	if err != nil {
		return http.ErrorResponse(
			c, h.mapperStatusToResponse(err), "gagal mendapatkan data guru berdasarkan spesialisasi", err,
		)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *TeacherHandler) FindIDByUserID(c *fiber.Ctx) error {
	userID, err := strconv.Atoi(c.Params("userID"))
	if err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "User ID harus berupa angka", domain.ErrBodyParse)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	id, err := h.usecase.FindIDByUserID(ctx, userID)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "gagal mendapatkan ID guru berdasarkan user", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, map[string]interface{}{"id": id})
}

func (h *TeacherHandler) AddTeacher(c *fiber.Ctx) error {
	var req request.CreateTeacherRequest
	if err := c.BodyParser(&req); err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "gagal memparsing body", domain.ErrBodyParse)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.AddTeacher(ctx, req)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "gagal menambahkan data guru", err)
	}

	return http.SuccessResponse(c, fiber.StatusCreated, resp)
}

func (h *TeacherHandler) mapperStatusToResponse(err error) int {
	switch {
	case errors.Is(err, domain.ErrTeacherNotFound):
		return fiber.StatusNotFound
	case errors.Is(err, domain.ErrExecution):
		return fiber.StatusInternalServerError
	case errors.Is(err, domain.ErrNIPTeacherAlready):
		return fiber.StatusConflict
	default:
		return fiber.StatusInternalServerError
	}
}
