package main

import (
    "fmt"
    "time"
)

func processOrder(orderID int32) {
    // Simulate processing time
    time.Sleep(2 * time.Second)

    err := updateOrderStatus(orderID, "completed")
    if err != nil {
        fmt.Printf("gRPC call err: %v\n", err)
        return
    }

    fmt.Printf("✓ completed order %d\n", orderID)
}
