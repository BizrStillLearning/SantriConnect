package request

import "time"

type LoginRequest struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type CreateSessionRequest struct {
	UserID     string
	IPAddress  string
	UserAgent  string
	DeviceName string
	ExpiresAt  time.Time
}
