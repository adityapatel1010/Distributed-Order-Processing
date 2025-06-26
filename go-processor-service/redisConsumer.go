package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "time"

    "github.com/redis/go-redis/v9"
)

var ctx = context.Background()

type RedisOrder struct {
    ID       int32 `json:"id"`
    Quantity int   `json:"quantity"`
}

func startRedisConsumer() {
    rdb := redis.NewClient(&redis.Options{
        Addr: "redis:6379",
    })

    for {
        result, err := rdb.BRPop(ctx, 0*time.Second, "orderQueue").Result()
        if err != nil {
            log.Println("Redis BRPOP error:", err)
            continue
        }

        var order RedisOrder
        if err := json.Unmarshal([]byte(result[1]), &order); err != nil {
            log.Println("Failed to parse order:", err)
            continue
        }

        fmt.Printf("▶︎ processing order %d\n", order.ID)
        processOrder(order.ID)
    }
}
