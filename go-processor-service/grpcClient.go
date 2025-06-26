package main

import (
    "context"
    "fmt"

    "google.golang.org/grpc"
    pb "go-processor-service/protoc" // Adjust to your actual path
)

func updateOrderStatus(orderID int32, status string) error {
    conn, err := grpc.Dial("node-service:50051", grpc.WithInsecure(), grpc.WithBlock())
    if err != nil {
        return fmt.Errorf("failed to connect to gRPC server: %v", err)
    }
    defer conn.Close()

    client := pb.NewOrderServiceClient(conn)

    _, err = client.UpdateOrderStatus(context.Background(), &pb.OrderStatusRequest{
        Id: orderID,
        Status:  status,
    })
    return err
}
