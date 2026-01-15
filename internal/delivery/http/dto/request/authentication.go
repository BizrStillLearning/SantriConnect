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

type RegisterRequest struct {
	Username string `json:"username" validate:"required"`
	Email    string `json:"email" validate:"mail,required"`
	Password string `json:"password" validate:"required"`

	FullName    string `json:"full_name" validate:"required"`
	Address     string `json:"address" validate:"required"`
	ParentName  string `json:"parent_name" validate:"required"`
	ParentPhone string `json:"parent_phone" validate:"required"`
}
