DATABASE_URL ?= $(shell cat .env | grep DATABASE_URL | cut -d '=' -f2)

run:
	go run ./cmd/main.go

migrate-up:
	migrate -path ./migrations/ -database "$(DATABASE_URL)?sslmode=disable" up

migrate-down:
	migrate -path ./migrations/ -database "$(DATABASE_URL)?sslmode=disable" down

migrate-force:
	migrate -path ./migrations/ -database "$(DATABASE_URL)?sslmode=disable" force $(version)