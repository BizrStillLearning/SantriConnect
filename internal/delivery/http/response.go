package http

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

type Response struct {
	Message string `json:"message"`
	Error   string `json:"error"`
}

func SuccessResponse(c *fiber.Ctx, statusCode int, data interface{}) error {
	return c.Status(statusCode).JSON(data)
}

func ErrorResponse(c *fiber.Ctx, statusCode int, message string, err error) error {
	return c.Status(statusCode).JSON(
		Response{
			Message: message,
			Error:   err.Error(),
		},
	)
}

func ErrorUsecaseResponse(msg string, err error) error {
	return fmt.Errorf("%s: %s", msg, err)
}
