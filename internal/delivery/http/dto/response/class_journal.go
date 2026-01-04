package response

import "time"

type ClassJournalResponse struct {
	ID        int             `json:"id"`
	Date      time.Time       `json:"date"`
	Subject   string          `json:"subject"`
	Class     string          `json:"class"`
	Topic     string          `json:"topic"`
	Notes     *string         `json:"notes"`
	Teacher   TeacherResponse `json:"teacher"`
	CreatedAt time.Time       `json:"created_at"`
}
