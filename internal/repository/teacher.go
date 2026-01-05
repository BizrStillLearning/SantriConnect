package repository

import (
	"context"
	"errors"
	"fmt"
	"santri-connect-api/internal/delivery/http/dto/request"
	"santri-connect-api/internal/delivery/http/dto/response"
	"santri-connect-api/internal/domain"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type TeacherRepositoryImpl struct {
	db     *pgxpool.Pool
	client *redis.Client
}

func NewTeacherRepository(db *pgxpool.Pool, client *redis.Client) TeacherRepository {
	return &TeacherRepositoryImpl{
		db:     db,
		client: client,
	}
}

func (r *TeacherRepositoryImpl) FindByID(ctx context.Context, id int) (
	response.TeacherResponse,
	error,
) {
	var teacher response.TeacherResponse
	if err := r.db.QueryRow(
		ctx, `SELECT t.id, t.nip, t.full_name, t.specialization, u.id, u.username, u.email, r.name 
			FROM teachers t
			LEFT JOIN users u ON u.id = t.user_id
			LEFT JOIN roles r ON r.id = u.role_id
			WHERE t.id = $1`, id,
	).Scan(
		&teacher.ID, &teacher.NIP, &teacher.FullName, &teacher.Specialization, &teacher.User.ID, &teacher.User.Username,
		&teacher.User.Email, &teacher.User.Role,
	); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return response.TeacherResponse{}, domain.ErrTeacherNotFound
		}

		return response.TeacherResponse{}, domain.ErrExecution
	}

	return teacher, nil
}

func (r *TeacherRepositoryImpl) FindByUserID(ctx context.Context, userID int) (
	response.TeacherResponse,
	error,
) {
	var teacher response.TeacherResponse
	if err := r.db.QueryRow(
		ctx, `SELECT t.id, t.nip, t.full_name, t.specialization, u.username, u.email, r.name 
			FROM teachers t
			LEFT JOIN users u ON u.id = t.user_id
			LEFT JOIN roles r ON r.id = u.role_id
			WHERE t.user_id = $1`, userID,
	).Scan(
		&teacher.ID, &teacher.NIP, &teacher.FullName, &teacher.Specialization, &teacher.User.Username,
		&teacher.User.Email, &teacher.User.Role,
	); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return response.TeacherResponse{}, domain.ErrTeacherNotFound
		}

		return response.TeacherResponse{}, domain.ErrExecution
	}

	return teacher, nil
}

func (r *TeacherRepositoryImpl) FindAll(ctx context.Context) (
	[]response.TeacherResponse,
	error,
) {
	rows, err := r.db.Query(
		ctx, `SELECT t.id, t.nip, t.full_name, t.specialization, u.id, u.username, u.email, r.name 
			FROM teachers t
			LEFT JOIN users u ON u.id = t.user_id
			LEFT JOIN roles r ON r.id = u.role_id`,
	)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var teachers []response.TeacherResponse
	for rows.Next() {
		var teacher response.TeacherResponse
		if err := rows.Scan(
			&teacher.ID, &teacher.NIP, &teacher.FullName, &teacher.Specialization, &teacher.User.ID,
			&teacher.User.Username,
			&teacher.User.Email, &teacher.User.Role,
		); err != nil {
			return nil, domain.ErrExecution
		}

		teachers = append(teachers, teacher)
	}

	return teachers, nil
}

func (r *TeacherRepositoryImpl) FindBySpecialization(ctx context.Context, specialization string) (
	[]response.TeacherResponse,
	error,
) {
	rows, err := r.db.Query(
		ctx, `SELECT t.id, t.nip, t.full_name, t.specialization, u.id, u.username, u.email, r.name 
			FROM teachers t
			LEFT JOIN users u ON u.id = t.user_id
			LEFT JOIN roles r ON r.id = u.role_id
			WHERE t.specialization = $1`, specialization,
	)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var teachers []response.TeacherResponse
	for rows.Next() {
		var teacher response.TeacherResponse
		if err := rows.Scan(
			&teacher.ID, &teacher.NIP, &teacher.FullName, &teacher.Specialization, &teacher.User.ID,
			&teacher.User.Username,
			&teacher.User.Email, &teacher.User.Role,
		); err != nil {
			return nil, domain.ErrExecution
		}

		teachers = append(teachers, teacher)
	}

	return teachers, nil
}

func (r *TeacherRepositoryImpl) FindIDByUserID(ctx context.Context, userID int) (
	int,
	error,
) {
	fmt.Println(userID)
	var id int
	if err := r.db.QueryRow(
		ctx, `SELECT id FROM teachers WHERE user_id = $1`, userID,
	).Scan(&id); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return 0, domain.ErrTeacherNotFound
		}

		return 0, domain.ErrExecution
	}

	return id, nil
}

func (r *TeacherRepositoryImpl) AddTeacher(ctx context.Context, req request.CreateTeacherRequest) (
	int,
	error,
) {
	var id int
	if err := r.db.QueryRow(
		ctx, `INSERT INTO teachers (user_id, nip, full_name, specialization) VALUES ($1, $2, $3, $4) RETURNING id`,
		req.UserID,
		req.NIP, req.FullName, req.Specialization,
	).Scan(&id); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return 0, domain.ErrTeacherNotFound
		} else if !errors.Is(err, pgx.ErrNoRows) {
			return 0, domain.ErrDataTeacherAlreadyExists
		}

		return 0, domain.ErrExecution
	}

	return id, nil
}
