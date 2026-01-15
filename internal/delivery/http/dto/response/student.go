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

type StudentRegistrationResponse struct {
	ID                 int          `json:"id"`
	User               UserResponse `json:"user"`
	FullName           string       `json:"full_name"`
	Address            string       `json:"address"`
	ParentName         string       `json:"parent_name"`
	ParentPhone        string       `json:"parent_phone"`
	VerificationStatus string       `json:"verification_status"`
	RegisteredAt       time.Time    `json:"registered_at"`
}
