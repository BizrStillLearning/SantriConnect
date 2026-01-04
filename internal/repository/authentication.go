package repository

import (
	"context"
	"errors"
	"fmt"
	"log"
	"santri-connect-api/internal/delivery/http/dto/request"
	"santri-connect-api/internal/delivery/http/dto/response"
	"santri-connect-api/internal/domain"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
	"golang.org/x/crypto/bcrypt"
)

type AuthenticationRepositoryImpl struct {
	db     *pgxpool.Pool
	client *redis.Client
}

func NewAuthenticationRepository(db *pgxpool.Pool, client *redis.Client) AuthenticationRepository {
	return &AuthenticationRepositoryImpl{
		db:     db,
		client: client,
	}
}

func (r *AuthenticationRepositoryImpl) Login(ctx context.Context, req request.LoginRequest) (
	response.UserResponse,
	error,
) {
	var (
		user = response.UserResponse{
			Username: req.Username,
		}
		passHash string
	)

	if err := r.db.QueryRow(
		ctx, `SELECT u.id, u.email, u.password, u.created_at, r.name 
			FROM users u
			LEFT JOIN roles r ON u.role_id = r.id
			WHERE username = $1`, req.Username,
	).Scan(&user.ID, &user.Email, &passHash, &user.CreatedAt, &user.Role); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return response.UserResponse{}, domain.ErrUserNotFound
		}

		return response.UserResponse{}, domain.ErrExecution
	}

	if err := bcrypt.CompareHashAndPassword([]byte(passHash), []byte(req.Password)); err != nil {
		return response.UserResponse{}, domain.ErrPasswordMismatch
	}

	return user, nil
}

func (r *AuthenticationRepositoryImpl) CheckBlackList(ctx context.Context, token string) error {
	key := fmt.Sprintf("blacklist:%s", token)
	cond, err := r.client.Get(ctx, key).Result()
	if errors.Is(err, redis.Nil) {
		return nil
	}

	log.Println("condition: " + cond)

	if err != nil {
		return domain.ErrExecutionRedis
	}

	if cond == "1" {
		return domain.ErrTokenBlackList
	}

	return nil
}

func (r *AuthenticationRepositoryImpl) AddToBlackList(ctx context.Context, token string, expiration time.Duration) error {
	key := fmt.Sprintf("blacklist:%s", token)
	err := r.client.Set(ctx, key, "1", expiration).Err()
	if err != nil {
		return domain.ErrExecutionRedis
	}
	return nil
}
