package usecase

import (
	"context"
	"santri-connect-api/internal/delivery/http/dto/request"
	"santri-connect-api/internal/delivery/http/dto/response"
)

type AuthenticationUsecase interface {
	Login(ctx context.Context, username, password string) (
		response.LoginResponse,
		error,
	)
	Logout(ctx context.Context, accessToken string) (
		response.LogoutResponse,
		error,
	)
	RefreshToken(ctx context.Context, accessToken string) (
		response.RefreshTokenResponse,
		error,
	)
}

type ClassJournalUsecase interface {
	FindByID(ctx context.Context, id int) (
		response.ClassJournalResponse,
		error,
	)
	FindAll(ctx context.Context) (
		[]response.ClassJournalResponse,
		error,
	)
	FindByClassID(ctx context.Context, classID int) (
		[]response.ClassJournalResponse,
		error,
	)
	FindByTeacherID(ctx context.Context, teacherID int) (
		[]response.ClassJournalResponse,
		error,
	)
	FindBySubjectID(ctx context.Context, subjectID int) (
		[]response.ClassJournalResponse,
		error,
	)
	Save(ctx context.Context, req request.CreateClassJournalRequest) (
		response.ClassJournalResponse,
		error,
	)
}

type StudentUsecase interface {
	FindByID(ctx context.Context, id int) (
		response.StudentResponse,
		error,
	)
	FindAll(ctx context.Context) (
		[]response.StudentResponse,
		error,
	)
	FindByClassID(ctx context.Context, classID int) (
		[]response.StudentResponse,
		error,
	)
}

type AttendanceUsecase interface {
	Save(ctx context.Context, journalID int, attendanceDetail []request.AttendanceDetail) (
		response.CreateBulkAttendanceResponse,
		error,
	)
}
