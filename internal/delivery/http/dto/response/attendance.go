package response

type CreateBulkAttendanceResponse struct {
	Journal    ClassJournalResponse `json:"journal"`
	Present    int                  `json:"present"`
	Permission int                  `json:"permission"`
	Sick       int                  `json:"sick"`
	Absent     int                  `json:"absent"`
}

type AttendanceResponse struct {
	ID           int    `json:"id"`
	JournalID    int    `json:"journal_id"`
	StudentID    int    `json:"student_id"`
	StatusID     int    `json:"status_id"`
	Notes        string `json:"notes,omitempty"`
	Date         string `json:"date"`
	Topic        string `json:"topic"`
	JournalNotes string `json:"journal_notes,omitempty"`
	SubjectName  string `json:"subject_name"`
	ClassName    string `json:"class_name"`
	TeacherName  string `json:"teacher_name"`
	StatusName   string `json:"status_name"`
	CreatedAt    string `json:"created_at"`
}
