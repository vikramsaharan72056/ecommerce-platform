# Dev Environment Commands

## Start

### 1. Start infrastructure (Docker)
```bash
npm run docker:up
```

### 2. Create Kafka topics (only needed after a fresh Docker start or volume reset)
```bash
docker exec ecom_kafka kafka-topics --bootstrap-server localhost:9092 --create --if-not-exists --topic dev-auth-user-events --partitions 6 --replication-factor 1
docker exec ecom_kafka kafka-topics --bootstrap-server localhost:9092 --create --if-not-exists --topic dev-tenant-tenant-events --partitions 3 --replication-factor 1
docker exec ecom_kafka kafka-topics --bootstrap-server localhost:9092 --create --if-not-exists --topic dev-notification-dispatch-events --partitions 3 --replication-factor 1
docker exec ecom_kafka kafka-topics --bootstrap-server localhost:9092 --create --if-not-exists --topic dev-auth-user-events-dlq --partitions 1 --replication-factor 1
docker exec ecom_kafka kafka-topics --bootstrap-server localhost:9092 --create --if-not-exists --topic dev-tenant-tenant-events-dlq --partitions 1 --replication-factor 1
```

### 3. Start local services
```bash
npm run dev
```

---

## Stop

### Stop local services
Press `Ctrl+C` in the terminal running `npm run dev`.

### Stop infrastructure (Docker, keep volumes)
```bash
npm run docker:down
```

### Stop infrastructure and wipe all data (full reset)
```bash
docker compose -f infrastructure/docker-compose.yml down --volumes
```

---

## Notes

- **Port 5432 conflict**: A local PostgreSQL installation occupies port 5432. Auth DB is mapped to port **5435** instead (`localhost:5435`). Do not change this back to 5432.
- **Kafka topics**: The `docker-compose.yml` kafka-init container creates the `dev-*` topics automatically on first start. If topics are missing (e.g. after a volume reset), run step 2 manually. Topic names use hyphens only — dots and underscores cause Kafka metrics warnings.
- **Auth DB schema**: No Prisma migrations are checked in. If auth DB is wiped, re-run:
  ```bash
  cd apps/auth-service && DATABASE_URL="postgresql://auth_user:auth_secret_dev@localhost:5435/auth_db" npx prisma db push
  ```

---

## Service URLs

| Service | URL |
|---|---|
| API Gateway | http://localhost:3000 |
| Auth Service | http://localhost:3001 |
| Auth Swagger | http://localhost:3001/docs |
| Tenant Service | http://localhost:3002 |
| Notification Service | http://localhost:3003 |
| Kafka UI | http://localhost:8080 |
| Schema Registry | http://localhost:8081 |
| MailHog (emails) | http://localhost:8025 |
| Grafana | http://localhost:3300 (admin / admin_dev) |
| Prometheus | http://localhost:9090 |
| Loki | http://localhost:3100 |
| Tempo | http://localhost:3200 |
