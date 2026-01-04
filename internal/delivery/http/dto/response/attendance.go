package response

type CreateBulkAttendanceResponse struct {
	Journal    ClassJournalResponse `json:"journal"`
	Present    int                  `json:"present"`
	Permission int                  `json:"permission"`
	Sick       int                  `json:"sick"`
	Absent     int                  `json:"absent"`
}
