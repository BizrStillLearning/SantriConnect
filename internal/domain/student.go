package domain

import "time"

type Student struct {
	ID            int
	UserID        int
	StudentNumber *string
	FullName      string
	ParentName    string
	ParentPhone   string
	ClassID       *int
	Address       string
	CreatedAt     time.Time
}
