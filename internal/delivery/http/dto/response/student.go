package response

import "time"

type StudentResponse struct {
	ID            int          `json:"id"`
	User          UserResponse `json:"user"`
	StudentNumber *string      `json:"student_number"`
	FullName      string       `json:"full_name"`
	ParentName    string       `json:"parent_name"`
	ParentPhone   string       `json:"parent_phone"`
	Class         string       `json:"class"`
	Address       string       `json:"address"`
	CreatedAt     time.Time    `json:"created_at"`
}
