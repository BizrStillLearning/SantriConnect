package repository

import (
	"context"
	"santri-connect-api/internal/delivery/http/dto/request"
	"santri-connect-api/internal/delivery/http/dto/response"
	"time"
)

type AuthenticationRepository interface {
	Login(ctx context.Context, req request.LoginRequest) (
		response.UserResponse,
		error,
	)
	CheckBlackList(ctx context.Context, token string) error
	AddToBlackList(ctx context.Context, token string, expiration time.Duration) error
}

type UserRepository interface {
	FindByID(ctx context.Context, id int) (
		response.UserResponse,
		error,
	)
}

type ClassJournalRepository interface {
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

type StudentRepository interface {
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

type AttendanceRepository interface {
	Save(ctx context.Context, req request.CreateBulkAttendanceRequest) error
}
