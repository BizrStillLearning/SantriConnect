package usecase

import (
	"context"
	"santri-connect-api/internal/delivery/http/dto/response"
	"santri-connect-api/internal/repository"
)

type UserUsecaseImpl struct {
	userRepo repository.UserRepository
}

func NewUserUsecase(userRepo repository.UserRepository) UserUsecase {
	return &UserUsecaseImpl{
		userRepo: userRepo,
	}
}

func (u *UserUsecaseImpl) FindByID(ctx context.Context, id int) (
	response.UserResponse,
	error,
) {
	return u.userRepo.FindByID(ctx, id)
}
