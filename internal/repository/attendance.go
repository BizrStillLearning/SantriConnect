package repository

import (
	"context"
	"santri-connect-api/internal/delivery/http/dto/request"
	"santri-connect-api/internal/delivery/http/dto/response"
	"time"

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
	tx, err := r.db.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

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

func (r *AttendanceRepositoryImpl) FindByStudentID(ctx context.Context, studentID int) (
	[]response.AttendanceResponse,
	error,
) {
	rows, err := r.db.Query(
		ctx, `SELECT a.id, a.journal_id, a.student_id, a.status_id, a.notes, a.created_at,
		cj.date, cj.topic, cj.notes as journal_notes, s.name as subject_name,
		c.name as class_name, t.full_name as teacher_name,
		ast.name as status_name
		FROM attendance a
		JOIN class_journals cj ON a.journal_id = cj.id
		JOIN subjects s ON cj.subject_id = s.id
		JOIN classes c ON cj.class_id = c.id
		JOIN teachers t ON cj.teacher_id = t.id
		JOIN attendance_statuses ast ON a.status_id = ast.id
		WHERE a.student_id = $1
		ORDER BY a.created_at DESC`, studentID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var attendances []response.AttendanceResponse
	for rows.Next() {
		var attendance response.AttendanceResponse
		var createdAt *time.Time
		if err := rows.Scan(
			&attendance.ID, &attendance.JournalID, &attendance.StudentID, &attendance.StatusID,
			&attendance.Notes, &createdAt, &attendance.Date, &attendance.Topic, &attendance.JournalNotes,
			&attendance.SubjectName, &attendance.ClassName, &attendance.TeacherName, &attendance.StatusName,
		); err != nil {
			return nil, err
		}
		if createdAt != nil {
			attendance.CreatedAt = createdAt.Format("2006-01-02 15:04:05")
		}
		attendances = append(attendances, attendance)
	}

	return attendances, nil
}

func (r *AttendanceRepositoryImpl) FindByJournalID(ctx context.Context, journalID int) (
	[]response.AttendanceResponse,
	error,
) {
	rows, err := r.db.Query(
		ctx, `SELECT a.id, a.journal_id, a.student_id, a.status_id, a.notes, a.created_at,
		cj.date, cj.topic, cj.notes as journal_notes, s.name as subject_name,
		c.name as class_name, t.full_name as teacher_name,
		ast.name as status_name
		FROM attendance a
		JOIN class_journals cj ON a.journal_id = cj.id
		JOIN subjects s ON cj.subject_id = s.id
		JOIN classes c ON cj.class_id = c.id
		JOIN teachers t ON cj.teacher_id = t.id
		JOIN attendance_statuses ast ON a.status_id = ast.id
		WHERE a.journal_id = $1
		ORDER BY a.student_id`, journalID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var attendances []response.AttendanceResponse
	for rows.Next() {
		var attendance response.AttendanceResponse
		var createdAt *time.Time
		if err := rows.Scan(
			&attendance.ID, &attendance.JournalID, &attendance.StudentID, &attendance.StatusID,
			&attendance.Notes, &createdAt, &attendance.Date, &attendance.Topic, &attendance.JournalNotes,
			&attendance.SubjectName, &attendance.ClassName, &attendance.TeacherName, &attendance.StatusName,
		); err != nil {
			return nil, err
		}
		if createdAt != nil {
			attendance.CreatedAt = createdAt.Format("2006-01-02 15:04:05")
		}
		attendances = append(attendances, attendance)
	}

	return attendances, nil
}

func (r *AttendanceRepositoryImpl) FindByClassID(ctx context.Context, classID int) (
	[]response.AttendanceResponse,
	error,
) {
	rows, err := r.db.Query(
		ctx, `SELECT a.id, a.journal_id, a.student_id, a.status_id, a.notes, a.created_at,
		cj.date, cj.topic, cj.notes as journal_notes, s.name as subject_name,
		c.name as class_name, t.full_name as teacher_name,
		ast.name as status_name
		FROM attendance a
		JOIN class_journals cj ON a.journal_id = cj.id
		JOIN subjects s ON cj.subject_id = s.id
		JOIN classes c ON cj.class_id = c.id
		JOIN teachers t ON cj.teacher_id = t.id
		JOIN attendance_statuses ast ON a.status_id = ast.id
		WHERE cj.class_id = $1
		ORDER BY cj.date DESC, a.student_id`, classID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var attendances []response.AttendanceResponse
	for rows.Next() {
		var attendance response.AttendanceResponse
		var createdAt *time.Time
		if err := rows.Scan(
			&attendance.ID, &attendance.JournalID, &attendance.StudentID, &attendance.StatusID,
			&attendance.Notes, &createdAt, &attendance.Date, &attendance.Topic, &attendance.JournalNotes,
			&attendance.SubjectName, &attendance.ClassName, &attendance.TeacherName, &attendance.StatusName,
		); err != nil {
			return nil, err
		}
		if createdAt != nil {
			attendance.CreatedAt = createdAt.Format("2006-01-02 15:04:05")
		}
		attendances = append(attendances, attendance)
	}

	return attendances, nil
}

func (r *AttendanceRepositoryImpl) FindAll(ctx context.Context) (
	[]response.AttendanceResponse,
	error,
) {
	rows, err := r.db.Query(
		ctx, `SELECT a.id, a.journal_id, a.student_id, a.status_id, a.notes, a.created_at,
		cj.date, cj.topic, cj.notes as journal_notes, s.name as subject_name,
		c.name as class_name, t.full_name as teacher_name,
		ast.name as status_name
		FROM attendance a
		JOIN class_journals cj ON a.journal_id = cj.id
		JOIN subjects s ON cj.subject_id = s.id
		JOIN classes c ON cj.class_id = c.id
		JOIN teachers t ON cj.teacher_id = t.id
		JOIN attendance_statuses ast ON a.status_id = ast.id
		ORDER BY a.created_at DESC`,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var attendances []response.AttendanceResponse
	for rows.Next() {
		var attendance response.AttendanceResponse
		var createdAt *time.Time
		if err := rows.Scan(
			&attendance.ID, &attendance.JournalID, &attendance.StudentID, &attendance.StatusID,
			&attendance.Notes, &createdAt, &attendance.Date, &attendance.Topic, &attendance.JournalNotes,
			&attendance.SubjectName, &attendance.ClassName, &attendance.TeacherName, &attendance.StatusName,
		); err != nil {
			return nil, err
		}
		if createdAt != nil {
			attendance.CreatedAt = createdAt.Format("2006-01-02 15:04:05")
		}
		attendances = append(attendances, attendance)
	}

	return attendances, nil
}
