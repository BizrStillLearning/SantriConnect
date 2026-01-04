package database

import (
	"context"
	"fmt"
	"runtime"
	"time"

	"github.com/redis/go-redis/v9"
)

type RedisConfig struct {
	Host     string
	Port     string
	Password string
	DB       int
}

func ConnectRedis(ctx context.Context, cfg RedisConfig) (
	*redis.Client,
	error,
) {
	cpuCores := runtime.GOMAXPROCS(0)
	poolSize := cpuCores * 10
	minIdleConns := max(2, cpuCores)

	client := redis.NewClient(
		&redis.Options{
			Addr:     cfg.Host + ":" + cfg.Port,
			Password: cfg.Password,
			DB:       cfg.DB,

			PoolSize:     poolSize,
			MinIdleConns: minIdleConns,
			PoolTimeout:  4 * time.Second,

			ConnMaxIdleTime: 5 * time.Minute,
			ConnMaxLifetime: 30 * time.Minute,

			DialTimeout:  5 * time.Second,
			ReadTimeout:  3 * time.Second,
			WriteTimeout: 3 * time.Second,

			MaxRetries:      3,
			MinRetryBackoff: 8 * time.Millisecond,
			MaxRetryBackoff: 512 * time.Millisecond,

			Protocol: 3,

			ContextTimeoutEnabled: true,
		},
	)

	pingCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	if err := client.Ping(pingCtx).Err(); err != nil {
		client.Close()
		return nil, fmt.Errorf("failed to ping Redis: %w", err)
	}

	return client, nil
}

func CloseRedis(client *redis.Client) error {
	if client != nil {
		return client.Close()
	}
	return nil
}

func GetRedisStats(client *redis.Client) *redis.PoolStats {
	return client.PoolStats()
}

func HealthCheck(ctx context.Context, client *redis.Client) error {
	ctx, cancel := context.WithTimeout(ctx, 2*time.Second)
	defer cancel()

	return client.Ping(ctx).Err()
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
