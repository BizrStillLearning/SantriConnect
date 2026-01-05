package usecase

import (
	"context"
	"santri-connect-api/internal/delivery/http/dto/request"
	"santri-connect-api/internal/delivery/http/dto/response"
	"santri-connect-api/internal/repository"
	"time"
)

type ClassJournalImpl struct {
	classJournalRepo repository.ClassJournalRepository
	teacherRepo      repository.TeacherRepository
}

func NewClassJournalUseCase(classJournalRepo repository.ClassJournalRepository, teacherRepo repository.TeacherRepository) ClassJournalUsecase {
	return &ClassJournalImpl{
		classJournalRepo: classJournalRepo,
		teacherRepo:      teacherRepo,
	}
}

func (u *ClassJournalImpl) FindByID(ctx context.Context, id int) (
	response.ClassJournalResponse,
	error,
) {
	return u.classJournalRepo.FindByID(ctx, id)
}

func (u *ClassJournalImpl) FindAll(ctx context.Context) (
	[]response.ClassJournalResponse,
	error,
) {
	return u.classJournalRepo.FindAll(ctx)
}

func (u *ClassJournalImpl) FindByClassID(ctx context.Context, classID int) (
	[]response.ClassJournalResponse,
	error,
) {
	return u.classJournalRepo.FindByClassID(ctx, classID)
}

func (u *ClassJournalImpl) FindByTeacherID(ctx context.Context, teacherID int) (
	[]response.ClassJournalResponse,
	error,
) {
	return u.classJournalRepo.FindByTeacherID(ctx, teacherID)
}

func (u *ClassJournalImpl) FindBySubjectID(ctx context.Context, subjectID int) (
	[]response.ClassJournalResponse,
	error,
) {
	return u.classJournalRepo.FindBySubjectID(ctx, subjectID)
}

func (u *ClassJournalImpl) Save(ctx context.Context, req request.CreateClassJournalRequest) (
	response.ClassJournalResponse,
	error,
) {
	teacherID, err := u.teacherRepo.FindIDByUserID(ctx, req.TeacherID)
	if err != nil {
		return response.ClassJournalResponse{}, err
	}

	req.TeacherID = teacherID

	parseDate, err := time.Parse("2006-01-02", req.Date)
	if err != nil {
		return response.ClassJournalResponse{}, err
	}

	return u.classJournalRepo.Save(ctx, req, parseDate)
}
