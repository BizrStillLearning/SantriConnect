package jwt

import (
	"context"
	"errors"
	"fmt"
	"santri-connect-api/internal/repository"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type TokenUseCases interface {
	GenerateToken(userID int, role string, expired time.Duration) (
		string,
		error,
	)
	ValidateToken(ctx context.Context, tokenString string) (
		*Claims,
		error,
	)
}

type Claims struct {
	UserID int
	Role   string
	jwt.RegisteredClaims
}

type jwtService struct {
	secretKey string
	issuer    string
	authr     repository.AuthenticationRepository
}

type ConfigJWT struct {
	AccessTokenSecret, RefreshTokenSecret string
}

func NewJWTService(secretKey string, issuer string, authr repository.AuthenticationRepository) TokenUseCases {
	return &jwtService{
		secretKey: secretKey,
		issuer:    issuer,
		authr:     authr,
	}
}

func (j *jwtService) GenerateToken(userID int, role string, expired time.Duration) (
	string,
	error,
) {
	claims := Claims{
		UserID: userID,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    j.issuer,
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(expired)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(j.secretKey))
}

func (j *jwtService) ValidateToken(ctx context.Context, tokenString string) (
	*Claims,
	error,
) {
	token, err := jwt.ParseWithClaims(
		tokenString,
		&Claims{},
		func(token *jwt.Token) (
			interface{},
			error,
		) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, errors.New("unexpected signing method")
			}
			return []byte(j.secretKey), nil
		},
	)

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token claims")
	}

	fmt.Printf("claims: %+v", claims)

	if err := j.authr.CheckBlackList(ctx, tokenString); err != nil {
		return nil, err
	}

	return claims, nil
}
