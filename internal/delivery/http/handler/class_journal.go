package handler

import (
	"context"
	"errors"
	"fmt"
	"santri-connect-api/internal/delivery/http"
	"santri-connect-api/internal/delivery/http/dto/request"
	"santri-connect-api/internal/domain"
	"santri-connect-api/internal/infrastructure/jwt"
	"santri-connect-api/internal/usecase"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

type ClassJournalHandler struct {
	usecase usecase.ClassJournalUsecase
}

func NewClassJournalHandler(usecase usecase.ClassJournalUsecase) *ClassJournalHandler {
	return &ClassJournalHandler{
		usecase: usecase,
	}
}

func (h *ClassJournalHandler) FindByID(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "ID harus berupa angka", domain.ErrBodyParse)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindByID(ctx, id)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "gagal mendapatkan data jurnal kelas", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *ClassJournalHandler) FindAll(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindAll(ctx)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "gagal mendapatkan semua data jurnal kelas", err)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *ClassJournalHandler) FindByClassID(c *fiber.Ctx) error {
	classID, err := strconv.Atoi(c.Params("classID"))
	if err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "Class ID harus berupa angka", domain.ErrBodyParse)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindByClassID(ctx, classID)
	if err != nil {
		return http.ErrorResponse(
			c, h.mapperStatusToResponse(err), "gagal mendapatkan data jurnal kelas berdasarkan kelas", err,
		)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *ClassJournalHandler) FindByTeacherID(c *fiber.Ctx) error {
	teacherID, err := strconv.Atoi(c.Params("teacherID"))
	if err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "Teacher ID harus berupa angka", domain.ErrBodyParse)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindByTeacherID(ctx, teacherID)
	if err != nil {
		return http.ErrorResponse(
			c, h.mapperStatusToResponse(err), "gagal mendapatkan data jurnal kelas berdasarkan guru", err,
		)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *ClassJournalHandler) FindBySubjectID(c *fiber.Ctx) error {
	subjectID, err := strconv.Atoi(c.Params("subjectID"))
	if err != nil {
		return http.ErrorResponse(c, fiber.StatusBadRequest, "Subject ID harus berupa angka", domain.ErrBodyParse)
	}

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.FindBySubjectID(ctx, subjectID)
	if err != nil {
		return http.ErrorResponse(
			c, h.mapperStatusToResponse(err), "gagal mendapatkan data jurnal kelas berdasarkan mata pelajaran", err,
		)
	}

	return http.SuccessResponse(c, fiber.StatusOK, resp)
}

func (h *ClassJournalHandler) Save(c *fiber.Ctx) error {
	var req request.CreateClassJournalRequest
	if err := c.BodyParser(&req); err != nil {
		fmt.Println(err)
		return http.ErrorResponse(c, fiber.StatusBadRequest, "data request tidak valid", domain.ErrBodyParse)
	}

	claims := c.Locals("users").(*jwt.Claims)

	req.TeacherID = claims.UserID

	ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
	defer cancel()

	resp, err := h.usecase.Save(ctx, req)
	if err != nil {
		return http.ErrorResponse(c, h.mapperStatusToResponse(err), "gagal menyimpan data jurnal kelas", err)
	}

	return http.SuccessResponse(c, fiber.StatusCreated, resp)
}

func (h *ClassJournalHandler) mapperStatusToResponse(err error) int {
	switch {
	case errors.Is(err, domain.ErrClassJournalNotFound):
		return fiber.StatusNotFound
	case errors.Is(err, domain.ErrClassJournalAlreadyExists):
		return fiber.StatusConflict
	case errors.Is(err, domain.ErrExecution):
		return fiber.StatusInternalServerError
	default:
		return fiber.StatusInternalServerError
	}
}
