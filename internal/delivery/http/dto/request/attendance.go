package request

type AttendanceDetail struct {
	StudentID int     `json:"student_id"`
	StatusID  int     `json:"status_id"`
	Notes     *string `json:"notes,omitempty"`
}

type CreateBulkAttendanceRequest struct {
	JournalID int                `json:"journal_id"`
	Students  []AttendanceDetail `json:"students"`
}
