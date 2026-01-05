package request

type CreateClassJournalRequest struct {
	Date      string  `json:"date"`
	SubjectID int     `json:"subject_id"`
	ClassID   int     `json:"class_id"`
	Topic     string  `json:"topic"`
	Notes     *string `json:"notes,omitempty"`
	TeacherID int     `json:"-,omitempty"`
}
