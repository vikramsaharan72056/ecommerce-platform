# Dev Environment Commands

## Start

```bash
npm run docker:up
```

All services start automatically — infrastructure and microservices are all in Docker. The `kafka-init` container creates the required topics on first start.

### If Kafka topics are missing (e.g. after a volume wipe)
```bash
docker exec ecom_kafka kafka-topics --bootstrap-server localhost:9092 --create --if-not-exists --topic dev-auth-user-events --partitions 6 --replication-factor 1
docker exec ecom_kafka kafka-topics --bootstrap-server localhost:9092 --create --if-not-exists --topic dev-tenant-tenant-events --partitions 3 --replication-factor 1
docker exec ecom_kafka kafka-topics --bootstrap-server localhost:9092 --create --if-not-exists --topic dev-notification-dispatch-events --partitions 3 --replication-factor 1
docker exec ecom_kafka kafka-topics --bootstrap-server localhost:9092 --create --if-not-exists --topic dev-auth-user-events-dlq --partitions 1 --replication-factor 1
docker exec ecom_kafka kafka-topics --bootstrap-server localhost:9092 --create --if-not-exists --topic dev-tenant-tenant-events-dlq --partitions 1 --replication-factor 1
```

---

## Stop

### Stop (keep volumes)
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
- **Kafka topics**: The `kafka-init` container creates all `dev-*` topics automatically on every `docker:up`. If topics are missing after a volume wipe, run the manual commands above. Topic names use hyphens only — dots and underscores cause Kafka metrics warnings.
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
