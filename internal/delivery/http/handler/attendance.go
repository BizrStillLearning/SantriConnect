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

type AttendanceHandler struct {
	usecase usecase.AttendanceUsecase
}

func NewAttendanceHandler(usecase usecase.AttendanceUsecase) *AttendanceHandler {
	return &AttendanceHandler{
		usecase: usecase,
	}
}

func (h *AttendanceHandler) Save(c *fiber.Ctx) error {
	var req request.CreateBulkAttendanceRequest
	if err := c.BodyParser(&req); err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "data request tidak valid", domain.ErrBodyParse)
	}

	if req.JournalID == 0 {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "Journal ID tidak boleh kosong", domain.ErrBodyParse)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.Save(ctx, req.JournalID, req.Students)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "gagal menyimpan data kehadiran", err)
	}

	return http.SuccessResponse(c, fiber.StatusCreated, resp)
}

func (h *AttendanceHandler) FindByStudentID(c *fiber.Ctx) error {
	studentID, err := c.ParamsInt("studentID")
	if err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "Invalid student ID", domain.ErrInvalidID)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindByStudentID(ctx, studentID)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "Failed to get attendance data", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *AttendanceHandler) FindByJournalID(c *fiber.Ctx) error {
	journalID, err := c.ParamsInt("journalID")
	if err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "Invalid journal ID", domain.ErrInvalidID)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindByJournalID(ctx, journalID)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "Failed to get attendance data", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *AttendanceHandler) FindByClassID(c *fiber.Ctx) error {
	classID, err := c.ParamsInt("classID")
	if err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "Invalid class ID", domain.ErrInvalidID)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindByClassID(ctx, classID)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "Failed to get attendance data", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *AttendanceHandler) FindAll(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindAll(ctx)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "Failed to get attendance data", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *AttendanceHandler) mapperStatusToResponse(err error) int {
	switch {
	case errors.Is(err, domain.ErrExecution):
		return fiber.StatusInternalServerError
	default:
		return fiber.StatusInternalServerError
	}
}
