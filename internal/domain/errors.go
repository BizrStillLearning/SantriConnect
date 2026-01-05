package domain

import "errors"

var (
	ErrInvalidPassword  = errors.New("kata sandi harus memiliki minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka")
	ErrUserNotFound     = errors.New("akun tidak ditemukan. silakan periksa kembali username atau email Anda")
	ErrPasswordMismatch = errors.New("kata sandi yang Anda masukkan salah")

	ErrBodyParse         = errors.New("format data yang dikirim tidak valid. pastikan format JSON sudah benar")
	ErrEmailAlreadyExist = errors.New("email sudah terdaftar, silakan gunakan email lain")

	ErrUnauthorized   = errors.New("akses ditolak. silakan login terlebih dahulu")
	ErrForbidden      = errors.New("Anda tidak memiliki izin untuk mengakses halaman ini")
	ErrTokenBlackList = errors.New("token telah diblokir. silakan login kembali")

	ErrExecution = errors.New("terjadi kesalahan saat menjalankan query")

	ErrExecutionRedis = errors.New("terjadi kesalahan saat menjalankan query redis")

	ErrPermissions       = errors.New("anda tidak memiliki izin untuk mengakses halaman ini")
	ErrFormatHeaders     = errors.New("format header yang dikirim tidak valid")
	ErrAuthHeaderNil     = errors.New("header Authorization tidak ditemukan")
	ErrRateLimitExceeded = errors.New("anda telah melampaui batas permintaan. Silakan coba lagi nanti")
	ErrRefreshToken      = errors.New("refresh token tidak valid atau expired")

	ErrRefreshTokenNil = errors.New("refresh token tidak ditemukan")

	ErrConversionJSON = errors.New("terjadi kesalahan saat mengonversi data ke JSON")

	ErrSessionNotFound      = errors.New("session not found")
	ErrSessionRevoked       = errors.New("session has been revoked")
	ErrSessionExpired       = errors.New("session has expired")
	ErrTokenReuseDetected   = errors.New("refresh token reuse detected - possible theft")
	ErrInvalidRefreshToken  = errors.New("invalid refresh token")
	ErrSessionAlreadyExists = errors.New("session already exists")

	ErrClassJournalNotFound      = errors.New("class journal not found")
	ErrStudentNotFound           = errors.New("student not found")
	ErrClassJournalAlreadyExists = errors.New("class journal already exists")

	ErrTeacherNotFound          = errors.New("teacher not found, please check your teacher ID")
	ErrNIPTeacherAlready        = errors.New("NIP teacher already exists")
	ErrDataTeacherAlreadyExists = errors.New("data teacher already exists")
	ErrInvalidID                = errors.New("invalid id")
)
