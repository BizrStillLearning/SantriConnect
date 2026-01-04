package domain

import "time"

type StudentRegistration struct {
	ID                   int
	UserID               *int
	FullName             string
	Address              string
	ParentName           string
	ParentPhone          string
	VerificationStatusID int
	RegisteredAt         time.Time
}
