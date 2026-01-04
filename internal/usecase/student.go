package usecase

import (
	"context"
	"santri-connect-api/internal/delivery/http/dto/response"
	"santri-connect-api/internal/repository"
)

type StudentUsecaseImpl struct {
	studentRepo repository.StudentRepository
}

func NewStudentUsecase(studentRepo repository.StudentRepository) StudentUsecase {
	return &StudentUsecaseImpl{
		studentRepo: studentRepo,
	}
}

func (u *StudentUsecaseImpl) FindByID(ctx context.Context, id int) (
	response.StudentResponse,
	error,
) {
	return u.studentRepo.FindByID(ctx, id)
}

func (u *StudentUsecaseImpl) FindAll(ctx context.Context) (
	[]response.StudentResponse,
	error,
) {
	return u.studentRepo.FindAll(ctx)
}

func (u *StudentUsecaseImpl) FindByClassID(ctx context.Context, classID int) (
	[]response.StudentResponse,
	error,
) {
	return u.studentRepo.FindByClassID(ctx, classID)
}
