package repository

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"santri-connect-api/internal/delivery/http/dto/response"
	"santri-connect-api/internal/domain"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type UserRepositoryImpl struct {
	db     *pgxpool.Pool
	client *redis.Client
}

func NewUserRepository(db *pgxpool.Pool, client *redis.Client) UserRepository {
	return &UserRepositoryImpl{
		db:     db,
		client: client,
	}
}

func (u *UserRepositoryImpl) FindByID(ctx context.Context, id int) (
	response.UserResponse,
	error,
) {
	key := fmt.Sprintf("user:%d", id)
	userJSON, err := u.client.Get(ctx, key).Result()
	if err == nil {
		var user response.UserResponse
		if err := json.Unmarshal([]byte(userJSON), &user); err == nil {
			return user, nil
		}
	}

	if errors.Is(err, redis.Nil) {
		var user response.UserResponse
		if err := u.db.QueryRow(
			ctx,
			`SELECT
  				u.id,
  				u.username,
  				u.email,
  				u.created_at,
  				r.name
			FROM
  				users u
  			LEFT JOIN roles r ON r.id = u.role_id
			WHERE u.id = $1`,
			id,
		).Scan(
			&user.ID,
			&user.Username,
			&user.Email,
			&user.CreatedAt,
			&user.Role,
		); err != nil {
			if errors.Is(err, pgx.ErrNoRows) {
				return response.UserResponse{}, domain.ErrUserNotFound
			}
			return response.UserResponse{}, err
		}

		cachedData, err := json.Marshal(user)
		if err != nil {
			return response.UserResponse{}, domain.ErrConversionJSON
		}

		if err := u.client.Set(ctx, key, cachedData, 1*time.Hour).Err(); err != nil {
			return response.UserResponse{}, domain.ErrExecutionRedis
		}

		return user, nil
	}

	return response.UserResponse{}, domain.ErrExecutionRedis
}

func (u *UserRepositoryImpl) FindAll(ctx context.Context) (
	[]response.UserResponse,
	error,
) {
	var users []response.UserResponse

	key := fmt.Sprintf("user:*")
	userJson, err := u.client.Get(ctx, key).Result()
	if err == nil {
		if err := json.Unmarshal([]byte(userJson), &users); err == nil {
			return users, nil
		}
	}

	rows, err := u.db.Query(
		ctx, `SELECT u.id, u.username, u.email, u.created_at, r.name 
			FROM users u
			LEFT JOIN roles r ON r.id = u.role_id`,
	)

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var user response.UserResponse
		if err := rows.Scan(
			&user.ID,
			&user.Username,
			&user.Email,
			&user.CreatedAt,
			&user.Role,
		); err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	go func() {
		cachedData, err := json.Marshal(users)
		if err != nil {
			return
		}

		if err := u.client.Set(ctx, key, cachedData, 1*time.Hour).Err(); err != nil {
			return
		}
	}()

	return users, nil
}
