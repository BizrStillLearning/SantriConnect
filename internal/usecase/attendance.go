package usecase

import (
	"context"
	"santri-connect-api/internal/delivery/http/dto/request"
	"santri-connect-api/internal/delivery/http/dto/response"
	"santri-connect-api/internal/repository"

	"golang.org/x/sync/errgroup"
)

type AttendanceUsecaseImpl struct {
	attendanceRepo   repository.AttendanceRepository
	classJournalRepo repository.ClassJournalRepository
}

func NewAttendanceUsecase(attendanceRepo repository.AttendanceRepository, classJournalRepo repository.ClassJournalRepository) AttendanceUsecase {
	return &AttendanceUsecaseImpl{
		attendanceRepo:   attendanceRepo,
		classJournalRepo: classJournalRepo,
	}
}

func (u *AttendanceUsecaseImpl) Save(ctx context.Context, journalID int, attendanceDetail []request.AttendanceDetail) (
	response.CreateBulkAttendanceResponse,
	error,
) {
	var present, permission, sick, absent int

	for _, item := range attendanceDetail {
		switch item.StatusID {
		case 1:
			present++
		case 2:
			permission++
		case 3:
			sick++
		case 4:
			absent++
		}
	}

	req := request.CreateBulkAttendanceRequest{
		JournalID: journalID,
		Students:  attendanceDetail,
	}
	//
	//if err := u.attendanceRepo.Save(ctx, req); err != nil {
	//	return response.CreateBulkAttendanceResponse{}, err
	//}
	//
	//classJournal, err := u.classJournalRepo.FindByID(ctx, journalID)
	//if err != nil {
	//	return response.CreateBulkAttendanceResponse{}, err
	//}
	g, ctx := errgroup.WithContext(ctx)
	var classJournal response.ClassJournalResponse

	g.Go(
		func() error {
			return u.attendanceRepo.Save(ctx, req)
		},
	)

	g.Go(
		func() error {
			var err error
			classJournal, err = u.classJournalRepo.FindByID(ctx, journalID)
			return err
		},
	)

	if err := g.Wait(); err != nil {
		return response.CreateBulkAttendanceResponse{}, err
	}

	return response.CreateBulkAttendanceResponse{
		Absent:     absent,
		Journal:    classJournal,
		Permission: permission,
		Present:    present,
		Sick:       sick,
	}, nil
}

func (u *AttendanceUsecaseImpl) FindByStudentID(ctx context.Context, studentID int) ([]response.AttendanceResponse, error) {
	return u.attendanceRepo.FindByStudentID(ctx, studentID)
}

func (u *AttendanceUsecaseImpl) FindByJournalID(ctx context.Context, journalID int) ([]response.AttendanceResponse, error) {
	return u.attendanceRepo.FindByJournalID(ctx, journalID)
}

func (u *AttendanceUsecaseImpl) FindByClassID(ctx context.Context, classID int) ([]response.AttendanceResponse, error) {
	return u.attendanceRepo.FindByClassID(ctx, classID)
}

func (u *AttendanceUsecaseImpl) FindAll(ctx context.Context) ([]response.AttendanceResponse, error) {
	return u.attendanceRepo.FindAll(ctx)
}
