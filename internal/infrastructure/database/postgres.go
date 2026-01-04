package database

import (
	"context"
	"fmt"
	"runtime"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

func ConnectDB(ctx context.Context, databaseURL string) (
	*pgxpool.Pool,
	error,
) {
	config, err := pgxpool.ParseConfig(fmt.Sprintf("%s?sslmode=disable", databaseURL))
	if err != nil {
		return nil, fmt.Errorf("failed to parse database URL: %w", err)
	}

	numCPU := runtime.NumCPU()
	maxConns := int32((numCPU * 2) + 2)
	minConns := int32(numCPU / 2)

	if maxConns > 50 {
		maxConns = 50
	}
	if minConns < 2 {
		minConns = 2
	}

	config.MaxConns = maxConns
	config.MinConns = minConns
	config.MinIdleConns = minConns / 2

	config.MaxConnLifetime = 30 * time.Minute
	config.MaxConnIdleTime = 10 * time.Minute
	config.HealthCheckPeriod = 1 * time.Minute

	config.ConnConfig.ConnectTimeout = 5 * time.Second

	config.ConnConfig.StatementCacheCapacity = 512
	config.ConnConfig.DescriptionCacheCapacity = 512

	pool, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		return nil, fmt.Errorf("failed to create connection pool: %w", err)
	}

	ctxp, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := pool.Ping(ctxp); err != nil {
		pool.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return pool, nil
}

func CloseDB(pool *pgxpool.Pool) error {
	if pool != nil {
		pool.Close()
	}
	return nil
}
