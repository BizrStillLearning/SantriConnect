package domain

import "time"

type Teacher struct {
	ID             int
	UserID         int
	NIP            string
	FullName       string
	Specialization string
	CreatedAt      time.Time
}
