package domain

import "time"

type User struct {
	ID        int
	Username  string
	Email     string
	Password  string
	RoleID    int
	CreatedAt time.Time
}
