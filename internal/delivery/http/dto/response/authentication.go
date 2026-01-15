package response

type LoginResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type LogoutResponse struct {
	Message string `json:"message"`
}

type RefreshTokenResponse struct {
	AccessToken string `json:"access_token"`
}

type RegisterResponse struct {
	User    UserResponse `json:"user"`
	Message string       `json:"message"`
}
