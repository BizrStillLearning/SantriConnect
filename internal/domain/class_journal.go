package domain

import "time"

type ClassJournal struct {
	ID        int
	Date      time.Time
	SubjectID int
	ClassID   int
	Topic     string
	Notes     *string
	TeacherID int
	CreatedAt time.Time
}
