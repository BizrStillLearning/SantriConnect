package response

type TeacherResponse struct {
	ID             int          `json:"id"`
	User           UserResponse `json:"user"`
	NIP            string       `json:"nip"`
	FullName       string       `json:"full_name"`
	Specialization string       `json:"specialization"`
}
