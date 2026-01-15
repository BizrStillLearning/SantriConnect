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
	StudentRegistration(ctx context.Context, username, email, password, fullName, address, parentName, parentPhone string) (
		response.RegisterResponse,
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
	FindByStudentID(ctx context.Context, studentID int) (
		[]response.AttendanceResponse,
		error,
	)
	FindByJournalID(ctx context.Context, journalID int) (
		[]response.AttendanceResponse,
		error,
	)
	FindByClassID(ctx context.Context, classID int) (
		[]response.AttendanceResponse,
		error,
	)
	FindAll(ctx context.Context) (
		[]response.AttendanceResponse,
		error,
	)
}

type TeacherUsecase interface {
	FindByID(ctx context.Context, id int) (
		response.TeacherResponse,
		error,
	)
	FindByUserID(ctx context.Context, userID int) (
		response.TeacherResponse,
		error,
	)
	FindAll(ctx context.Context) (
		[]response.TeacherResponse,
		error,
	)
	FindBySpecialization(ctx context.Context, specialization string) (
		[]response.TeacherResponse,
		error,
	)
	FindIDByUserID(ctx context.Context, userID int) (
		int,
		error,
	)
	AddTeacher(ctx context.Context, req request.CreateTeacherRequest) (
		response.TeacherResponse,
		error,
	)
}

type UserUsecase interface {
	FindByID(ctx context.Context, id int) (
		response.UserResponse,
		error,
	)
}
