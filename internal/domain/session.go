package domain

import (
	"time"
)

type Session struct {
	ID               string
	UserID           string
	RefreshTokenHash string
	TokenFamily      string
	ExpiresAt        time.Time
	RevokedAt        *time.Time
	IPAddress        string
	UserAgent        string
	DeviceName       string
	CreatedAt        time.Time
	UpdatedAt        time.Time
}

type TokenPair struct {
	AccessToken  string
	RefreshToken string
}
