package usecase

import (
	"context"
	"santri-connect-api/internal/delivery/http/dto/request"
	"santri-connect-api/internal/delivery/http/dto/response"
	"santri-connect-api/internal/infrastructure/jwt"
	"santri-connect-api/internal/repository"
	"sync"
	"time"
)

type AuthenticationUsecaseImpl struct {
	authr      repository.AuthenticationRepository
	userr      repository.UserRepository
	accessJwt  jwt.TokenUseCases
	refreshJwt jwt.TokenUseCases
}

func NewAuthenticationUsecase(
	authr repository.AuthenticationRepository,
	userr repository.UserRepository,
	accessSvc jwt.TokenUseCases,
	refreshSvc jwt.TokenUseCases,
) AuthenticationUsecase {
	return &AuthenticationUsecaseImpl{
		authr:      authr,
		userr:      userr,
		accessJwt:  accessSvc,
		refreshJwt: refreshSvc,
	}
}

func (u *AuthenticationUsecaseImpl) Login(ctx context.Context, username, password string) (
	response.LoginResponse,
	error,
) {
	req := request.LoginRequest{
		Username: username,
		Password: password,
	}

	user, err := u.authr.Login(ctx, req)
	if err != nil {
		return response.LoginResponse{}, err
	}

	var (
		accessToken  string
		refreshToken string
		errChan      = make(chan error, 2)
		wg           sync.WaitGroup
	)

	wg.Add(2)

	go func() {
		defer wg.Done()
		at, err := u.accessJwt.GenerateToken(user.ID, user.Role, 15*time.Minute)
		if err != nil {
			errChan <- err
			return
		}
		accessToken = at
	}()

	go func() {
		defer wg.Done()
		rt, err := u.refreshJwt.GenerateToken(user.ID, user.Role, 24*time.Hour)
		if err != nil {
			errChan <- err
			return
		}
		refreshToken = rt
	}()

	wg.Wait()
	close(errChan)

	for err := range errChan {
		if err != nil {
			return response.LoginResponse{}, err
		}
	}

	return response.LoginResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (u *AuthenticationUsecaseImpl) Logout(ctx context.Context, accessToken string) (
	response.LogoutResponse,
	error,
) {
	if err := u.authr.AddToBlackList(ctx, accessToken, 15*time.Minute); err != nil {
		return response.LogoutResponse{}, err
	}

	resp := response.LogoutResponse{
		Message: "logout berhasil",
	}

	return resp, nil
}

func (u *AuthenticationUsecaseImpl) ResetPassword() {
	//TODO for reset password
}

func (u *AuthenticationUsecaseImpl) RefreshToken(ctx context.Context, accessToken string) (
	response.RefreshTokenResponse,
	error,
) {
	//TODO for refresh token
	panic("implement me")
}
