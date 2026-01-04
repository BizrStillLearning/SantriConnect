package domain

import "time"

type Attendance struct {
	ID        int
	JournalID int
	StudentID int
	StatusID  int
	Notes     *string
	CreatedAt time.Time
}
