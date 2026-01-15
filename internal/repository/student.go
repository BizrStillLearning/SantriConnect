package repository

import (
	"context"
	"errors"
	"santri-connect-api/internal/delivery/http/dto/response"
	"santri-connect-api/internal/domain"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type StudentRepositoryImpl struct {
	db     *pgxpool.Pool
	client *redis.Client
}

func NewStudentRepository(db *pgxpool.Pool, client *redis.Client) StudentRepository {
	return &StudentRepositoryImpl{
		db:     db,
		client: client,
	}
}

func (r *StudentRepositoryImpl) FindByID(ctx context.Context, id int) (
	response.StudentResponse,
	error,
) {
	var student response.StudentResponse
	if err := r.db.QueryRow(
		ctx, `SELECT s.id, s.student_number, s.full_name, s.parent_name, s.parent_phone, s.address, s.created_at,
       				u.id, u.username, u.email, r.name, c.name
					FROM students s 
					LEFT JOIN users u ON u.id = s.user_id
					LEFT JOIN roles r ON r.id = u.role_id
					LEFT JOIN classes c ON c.id = s.class_id
					WHERE s.id = $1`, id,
	).Scan(
		&student.ID, &student.StudentNumber, &student.FullName, &student.ParentName, &student.ParentPhone,
		&student.Address, &student.CreatedAt, &student.User.ID, &student.User.Username, &student.User.Email,
		&student.User.Role, &student.Class,
	); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return response.StudentResponse{}, domain.ErrStudentNotFound
		}
		return response.StudentResponse{}, err
	}

	return student, nil
}

func (r *StudentRepositoryImpl) FindAll(ctx context.Context) (
	[]response.StudentResponse,
	error,
) {
	rows, err := r.db.Query(
		ctx, `SELECT s.id, s.student_number, s.full_name, s.parent_name, s.parent_phone, s.address, s.created_at,
       				u.id, u.username, u.email, r.name, c.name
					FROM students s 
					LEFT JOIN users u ON u.id = s.user_id
					LEFT JOIN roles r ON r.id = u.role_id
					LEFT JOIN classes c ON c.id = s.class_id`,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var students []response.StudentResponse
	for rows.Next() {
		var student response.StudentResponse
		if err := rows.Scan(
			&student.ID, &student.StudentNumber, &student.FullName, &student.ParentName, &student.ParentPhone,
			&student.Address, &student.CreatedAt, &student.User.ID, &student.User.Username, &student.User.Email,
			&student.User.Role, &student.Class,
		); err != nil {
			return nil, err
		}
		students = append(students, student)
	}

	return students, nil
}

func (r *StudentRepositoryImpl) FindByClassID(ctx context.Context, classID int) (
	[]response.StudentResponse,
	error,
) {
	rows, err := r.db.Query(
		ctx, `SELECT s.id, s.student_number, s.full_name, s.parent_name, s.parent_phone, s.address, s.created_at,
       				u.id, u.username, u.email, r.name, c.name
					FROM students s 
					LEFT JOIN users u ON u.id = s.user_id
					LEFT JOIN roles r ON r.id = u.role_id
					LEFT JOIN classes c ON c.id = s.class_id
					WHERE s.class_id = $1`, classID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var students []response.StudentResponse
	for rows.Next() {
		var student response.StudentResponse
		if err := rows.Scan(
			&student.ID, &student.StudentNumber, &student.FullName, &student.ParentName, &student.ParentPhone,
			&student.Address, &student.CreatedAt, &student.User.ID, &student.User.Username, &student.User.Email,
			&student.User.Role, &student.Class,
		); err != nil {
			return nil, err
		}
		students = append(students, student)
	}

	return students, nil
}

func (r *StudentRepositoryImpl) FindByStatus(ctx context.Context, statusID int) (
	[]response.StudentRegistrationResponse,
	error,
) {
	rows, err := r.db.Query(
		ctx,
		`SELECT sr.id, sr.full_name, sr.address, sr.parent_name, sr.parent_phone, sr.registered_at, 
       		u.id, u.username, u.email, u.created_at,
       		r.name
			FROM student_registrations sr
			LEFT JOIN users u ON u.id = sr.user_id
			LEFT JOIN roles r ON r.id = u.role_id
			WHERE sr.verification_status_id = $1`, statusID,
	)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var students []response.StudentRegistrationResponse
	for rows.Next() {
		var student response.StudentRegistrationResponse
		if err := rows.Scan(
			&student.ID, &student.FullName, &student.Address, &student.ParentName, &student.ParentPhone,
			&student.RegisteredAt, &student.User.ID, &student.User.Username, &student.User.Email,
			&student.User.CreatedAt, &student.User.Role,
		); err != nil {
			return nil, err
		}
		students = append(students, student)
	}

	return students, nil
}
