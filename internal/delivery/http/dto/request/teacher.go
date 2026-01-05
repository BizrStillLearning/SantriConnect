package request

type CreateTeacherRequest struct {
	UserID         int    `json:"user_id"`
	NIP            string `json:"nip"`
	FullName       string `json:"full_name"`
	Specialization string `json:"specialization"`
}
