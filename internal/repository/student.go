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
