package request

import "time"

type CreateClassJournalRequest struct {
	Date      time.Time `json:"date"`
	SubjectID int       `json:"subject_id"`
	ClassID   int       `json:"class_id"`
	Topic     string    `json:"topic"`
	Notes     *string   `json:"notes,omitempty"`
	TeacherID int       `json:"-"`
}
