package repository

import (
	"context"
	"errors"
	"santri-connect-api/internal/delivery/http/dto/request"
	"santri-connect-api/internal/delivery/http/dto/response"
	"santri-connect-api/internal/domain"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type ClassJournalRepositoryImpl struct {
	db                   *pgxpool.Pool
	client               *redis.Client
	queryGetClassJournal string
}

func NewClassJournalRepository(db *pgxpool.Pool, client *redis.Client) ClassJournalRepository {
	return &ClassJournalRepositoryImpl{
		db:     db,
		client: client,
	}
}

func (r *ClassJournalRepositoryImpl) FindByID(ctx context.Context, id int) (
	response.ClassJournalResponse,
	error,
) {
	var journal response.ClassJournalResponse
	if err := r.db.QueryRow(
		ctx,
		`SELECT cj.id, cj.date, s.name, c.name, cj.topic, cj.notes, t.id, t.nip, t.full_name, t.specialization, cj.created_at, u.id, u.username, u.email, u.created_at, r.name
			FROM class_journals cj
			LEFT JOIN subjects s ON s.id = cj.subject_id
			LEFT JOIN classes c ON c.id = cj.class_id
			LEFT JOIN teachers t ON t.id = cj.teacher_id
			LEFT JOIN users u ON u.id = t.user_id
			LEFT JOIN roles r ON r.id = u.role_id
			WHERE cj.id = $1`, id,
	).Scan(
		&journal.ID, &journal.Date, &journal.Subject, &journal.Class, &journal.Topic,
		&journal.Notes, &journal.Teacher.ID, &journal.Teacher.NIP, &journal.Teacher.FullName,
		&journal.Teacher.Specialization, &journal.CreatedAt, &journal.Teacher.User.ID, &journal.Teacher.User.Username,
		&journal.Teacher.User.Email, &journal.Teacher.User.CreatedAt, &journal.Teacher.User.Role,
	); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return response.ClassJournalResponse{}, domain.ErrClassJournalNotFound
		}
		return response.ClassJournalResponse{}, err
	}

	return journal, nil
}

func (r *ClassJournalRepositoryImpl) FindAll(ctx context.Context) (
	[]response.ClassJournalResponse,
	error,
) {
	rows, err := r.db.Query(
		ctx,
		`SELECT cj.id, cj.date, s.name, c.name, cj.topic, cj.notes, t.id, t.nip, t.full_name, t.specialization, cj.created_at, u.id, u.username, u.email, u.created_at, r.name
			FROM class_journals cj
			LEFT JOIN subjects s ON s.id = cj.subject_id
			LEFT JOIN classes c ON c.id = cj.class_id
			LEFT JOIN teachers t ON t.id = cj.teacher_id
			LEFT JOIN users u ON u.id = t.user_id
			LEFT JOIN roles r ON r.id = u.role_id`,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var journals []response.ClassJournalResponse
	for rows.Next() {
		var journal response.ClassJournalResponse
		if err := rows.Scan(
			&journal.ID, &journal.Date, &journal.Subject, &journal.Class, &journal.Topic,
			&journal.Notes, &journal.Teacher.ID, &journal.Teacher.NIP, &journal.Teacher.FullName,
			&journal.Teacher.Specialization, &journal.CreatedAt, &journal.Teacher.User.ID,
			&journal.Teacher.User.Username,
			&journal.Teacher.User.Email, &journal.Teacher.User.CreatedAt, &journal.Teacher.User.Role,
		); err != nil {
			return nil, err
		}
		journals = append(journals, journal)
	}

	return journals, nil
}

func (r *ClassJournalRepositoryImpl) FindByClassID(ctx context.Context, classID int) (
	[]response.ClassJournalResponse,
	error,
) {
	rows, err := r.db.Query(
		ctx,
		`SELECT cj.id, cj.date, s.name, c.name, cj.topic, cj.notes, t.id, t.nip, t.full_name, t.specialization, cj.created_at, u.id, u.username, u.email, u.created_at, r.name
			FROM class_journals cj
			LEFT JOIN subjects s ON s.id = cj.subject_id
			LEFT JOIN classes c ON c.id = cj.class_id
			LEFT JOIN teachers t ON t.id = cj.teacher_id
			LEFT JOIN users u ON u.id = t.user_id
			LEFT JOIN roles r ON r.id = u.role_id
			WHERE cj.class_id = $1`, classID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var journals []response.ClassJournalResponse
	for rows.Next() {
		var journal response.ClassJournalResponse
		if err := rows.Scan(
			&journal.ID, &journal.Date, &journal.Subject, &journal.Class, &journal.Topic,
			&journal.Notes, &journal.Teacher.ID, &journal.Teacher.NIP, &journal.Teacher.FullName,
			&journal.Teacher.Specialization, &journal.CreatedAt, &journal.Teacher.User.ID,
			&journal.Teacher.User.Username,
			&journal.Teacher.User.Email, &journal.Teacher.User.CreatedAt, &journal.Teacher.User.Role,
		); err != nil {
			return nil, err
		}
		journals = append(journals, journal)
	}

	return journals, nil
}

func (r *ClassJournalRepositoryImpl) FindByTeacherID(ctx context.Context, teacherID int) (
	[]response.ClassJournalResponse,
	error,
) {
	rows, err := r.db.Query(
		ctx,
		`SELECT cj.id, cj.date, s.name, c.name, cj.topic, cj.notes, t.id, t.nip, t.full_name, t.specialization, cj.created_at, u.id, u.username, u.email, u.created_at, r.name
			FROM class_journals cj
			LEFT JOIN subjects s ON s.id = cj.subject_id
			LEFT JOIN classes c ON c.id = cj.class_id
			LEFT JOIN teachers t ON t.id = cj.teacher_id
			LEFT JOIN users u ON u.id = t.user_id
			LEFT JOIN roles r ON r.id = u.role_id
			WHERE cj.teacher_id = $1`, teacherID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var journals []response.ClassJournalResponse
	for rows.Next() {
		var journal response.ClassJournalResponse
		if err := rows.Scan(
			&journal.ID, &journal.Date, &journal.Subject, &journal.Class, &journal.Topic,
			&journal.Notes, &journal.Teacher.ID, &journal.Teacher.NIP, &journal.Teacher.FullName,
			&journal.Teacher.Specialization, &journal.CreatedAt, &journal.Teacher.User.ID,
			&journal.Teacher.User.Username,
			&journal.Teacher.User.Email, &journal.Teacher.User.CreatedAt, &journal.Teacher.User.Role,
		); err != nil {
			return nil, err
		}
		journals = append(journals, journal)
	}

	return journals, nil
}

func (r *ClassJournalRepositoryImpl) FindBySubjectID(ctx context.Context, subjectID int) (
	[]response.ClassJournalResponse,
	error,
) {
	rows, err := r.db.Query(
		ctx,
		`SELECT cj.id, cj.date, s.name, c.name, cj.topic, cj.notes, t.id, t.nip, t.full_name, t.specialization, cj.created_at, u.id, u.username, u.email, u.created_at, r.name
			FROM class_journals cj
			LEFT JOIN subjects s ON s.id = cj.subject_id
			LEFT JOIN classes c ON c.id = cj.class_id
			LEFT JOIN teachers t ON t.id = cj.teacher_id
			LEFT JOIN users u ON u.id = t.user_id
			LEFT JOIN roles r ON r.id = u.role_id
			WHERE cj.subject_id = $1`, subjectID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var journals []response.ClassJournalResponse
	for rows.Next() {
		var journal response.ClassJournalResponse
		if err := rows.Scan(
			&journal.ID, &journal.Date, &journal.Subject, &journal.Class, &journal.Topic,
			&journal.Notes, &journal.Teacher.ID, &journal.Teacher.NIP, &journal.Teacher.FullName,
			&journal.Teacher.Specialization, &journal.CreatedAt, &journal.Teacher.User.ID,
			&journal.Teacher.User.Username,
			&journal.Teacher.User.Email, &journal.Teacher.User.CreatedAt, &journal.Teacher.User.Role,
		); err != nil {
			return nil, err
		}
		journals = append(journals, journal)
	}

	return journals, nil
}

func (r *ClassJournalRepositoryImpl) Save(ctx context.Context, req request.CreateClassJournalRequest) (
	response.ClassJournalResponse,
	error,
) {
	var id int
	err := r.db.QueryRow(
		ctx, `INSERT INTO class_journals (date, subject_id, class_id, topic, notes, teacher_id) 
			VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
		req.Date, req.SubjectID, req.ClassID, req.Topic, req.Notes, req.TeacherID,
	).Scan(&id)
	if err != nil {
		return response.ClassJournalResponse{}, err
	}

	return r.FindByID(ctx, id)
}
