# Use a small image to run the compiled binary
FROM alpine:latest

# Install required packages (optional: CA certificates if your app uses HTTPS/gRPC securely)
RUN apk add --no-cache ca-certificates

WORKDIR /app

# Copy precompiled binary into container
COPY processor .

# Make sure it is executable
RUN chmod +x processor

CMD ["./processor"]
