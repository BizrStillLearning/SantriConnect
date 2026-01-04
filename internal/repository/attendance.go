package repository

import (
	"context"
	"santri-connect-api/internal/delivery/http/dto/request"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type AttendanceRepositoryImpl struct {
	db     *pgxpool.Pool
	client *redis.Client
}

func NewAttendanceRepository(db *pgxpool.Pool, client *redis.Client) AttendanceRepository {
	return &AttendanceRepositoryImpl{
		db:     db,
		client: client,
	}
}

func (r *AttendanceRepositoryImpl) Save(ctx context.Context, req request.CreateBulkAttendanceRequest) error {
	// Start a transaction
	tx, err := r.db.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	// Delete existing attendance records for this journal
	_, err = tx.Exec(ctx, "DELETE FROM attendance WHERE journal_id = $1", req.JournalID)
	if err != nil {
		return err
	}

	for _, student := range req.Students {
		_, err := tx.Exec(
			ctx,
			"INSERT INTO attendance (journal_id, student_id, status_id, notes) VALUES ($1, $2, $3, $4)",
			req.JournalID,
			student.StudentID,
			student.StatusID,
			student.Notes,
		)
		if err != nil {
			return err
		}
	}

	return tx.Commit(ctx)
}
