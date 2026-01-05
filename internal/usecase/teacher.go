package usecase

import (
	"context"
	"santri-connect-api/internal/delivery/http/dto/request"
	"santri-connect-api/internal/delivery/http/dto/response"
	"santri-connect-api/internal/repository"
)

type TeacherUsecaseImpl struct {
	teacherRepo repository.TeacherRepository
}

func NewTeacherUsecase(teacherRepo repository.TeacherRepository) TeacherUsecase {
	return &TeacherUsecaseImpl{
		teacherRepo: teacherRepo,
	}
}

func (u *TeacherUsecaseImpl) FindByID(ctx context.Context, id int) (
	response.TeacherResponse,
	error,
) {
	return u.teacherRepo.FindByID(ctx, id)
}

func (u *TeacherUsecaseImpl) FindByUserID(ctx context.Context, userID int) (
	response.TeacherResponse,
	error,
) {
	return u.teacherRepo.FindByUserID(ctx, userID)
}

func (u *TeacherUsecaseImpl) FindAll(ctx context.Context) (
	[]response.TeacherResponse,
	error,
) {
	return u.teacherRepo.FindAll(ctx)
}

func (u *TeacherUsecaseImpl) FindBySpecialization(ctx context.Context, specialization string) (
	[]response.TeacherResponse,
	error,
) {
	return u.teacherRepo.FindBySpecialization(ctx, specialization)
}

func (u *TeacherUsecaseImpl) FindIDByUserID(ctx context.Context, userID int) (
	int,
	error,
) {
	return u.teacherRepo.FindIDByUserID(ctx, userID)
}

func (u *TeacherUsecaseImpl) AddTeacher(ctx context.Context, req request.CreateTeacherRequest) (
	response.TeacherResponse,
	error,
) {
	teacherID, err := u.teacherRepo.AddTeacher(ctx, req)
	if err != nil {
		return response.TeacherResponse{}, err
	}

	return u.teacherRepo.FindByID(ctx, teacherID)
}
