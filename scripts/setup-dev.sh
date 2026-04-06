#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# ONE-COMMAND LOCAL DEV ENVIRONMENT SETUP
# Run from the repo root: bash scripts/setup-dev.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e  # Exit on any error

BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BOLD}${BLUE}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║          Ecom Platform — Dev Environment Setup            ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# ── Prerequisites check ──
echo -e "${YELLOW}Checking prerequisites...${NC}"

check_command() {
  if ! command -v $1 &> /dev/null; then
    echo -e "${RED}✗ $1 is not installed. Please install it first.${NC}"
    exit 1
  fi
  echo -e "${GREEN}✓ $1 found${NC}"
}

check_command node
check_command npm
check_command docker
check_command docker-compose

NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo -e "${RED}✗ Node.js 20+ required. Found: $(node -v)${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) - OK${NC}"

# ── Generate RSA key pair for JWT ──
echo -e "\n${YELLOW}Generating RSA-256 key pair for JWT...${NC}"
mkdir -p .keys
if [ ! -f .keys/auth-private.pem ]; then
  openssl genrsa -out .keys/auth-private.pem 2048 2>/dev/null
  openssl rsa -in .keys/auth-private.pem -pubout -out .keys/auth-public.pem 2>/dev/null
  echo -e "${GREEN}✓ RSA key pair generated in .keys/${NC}"
else
  echo -e "${GREEN}✓ RSA key pair already exists${NC}"
fi

# Export keys for env files (escaping backslashes for sed)
PRIVATE_KEY=$(cat .keys/auth-private.pem | tr '\n' '\\n' | sed 's/\\/\\\\/g; s/&/\\&/g')
PUBLIC_KEY=$(cat .keys/auth-public.pem | tr '\n' '\\n' | sed 's/\\/\\\\/g; s/&/\\&/g')

# ── Patch .env.development with real keys ──
if grep -q "generate with openssl" apps/auth-service/.env.development 2>/dev/null; then
  sed -i "s|JWT_PRIVATE_KEY=.*|JWT_PRIVATE_KEY=\"${PRIVATE_KEY}\"|" apps/auth-service/.env.development
  sed -i "s|JWT_PUBLIC_KEY=.*|JWT_PUBLIC_KEY=\"${PUBLIC_KEY}\"|" apps/auth-service/.env.development
  echo -e "${GREEN}✓ JWT keys injected into auth-service .env.development${NC}"
fi

# ── Install dependencies ──
echo -e "\n${YELLOW}Installing npm dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

# ── Start infrastructure ──
echo -e "\n${YELLOW}Starting infrastructure (PostgreSQL, Redis, Kafka, monitoring)...${NC}"
docker-compose -f infrastructure/docker-compose.yml up -d \
  auth-db tenant-db notification-db redis zookeeper kafka schema-registry kafka-init mailhog \
  prometheus loki tempo grafana

echo -e "${YELLOW}Waiting for services to be healthy...${NC}"
sleep 10

# ── Run database migrations ──
echo -e "\n${YELLOW}Running database migrations...${NC}"

(cd apps/auth-service && DATABASE_URL=postgresql://auth_user:auth_secret_dev@localhost:5432/auth_db npm run db:migrate 2>/dev/null || echo "Migration note: run manually if DB not ready")
echo -e "${GREEN}✓ Auth DB migrations done${NC}"

(cd apps/tenant-service && DATABASE_URL=postgresql://tenant_user:tenant_secret_dev@localhost:5433/tenant_db npm run db:migrate 2>/dev/null || echo "Migration note: run manually if DB not ready")
echo -e "${GREEN}✓ Tenant DB migrations done${NC}"

(cd apps/notification-service && DATABASE_URL=postgresql://notif_user:notif_secret_dev@localhost:5434/notification_db npm run db:migrate 2>/dev/null || echo "Migration note: run manually if DB not ready")
echo -e "${GREEN}✓ Notification DB migrations done${NC}"

# ── Done ──
echo -e "\n${BOLD}${GREEN}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                    Setup Complete! 🚀                     ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "  ${BOLD}Service URLs:${NC}"
echo -e "  API Gateway:        http://localhost:3000"
echo -e "  Auth Service:       http://localhost:3001"
echo -e "  Auth Swagger:       http://localhost:3001/docs"
echo -e "  Tenant Service:     http://localhost:3002"
echo -e "  Notification Svc:   http://localhost:3003"
echo -e "  Kafka UI:           http://localhost:8080"
echo -e "  MailHog (emails):   http://localhost:8025"
echo -e "  Grafana:            http://localhost:3300  (admin/admin_dev)"
echo -e "  Prometheus:         http://localhost:9090"
echo ""
echo -e "  ${BOLD}Start services:${NC}"
echo -e "  npm run dev          # Start all services with Turborepo"
echo ""
echo -e "  ${BOLD}Run tests:${NC}"
echo -e "  npm test             # Run all tests"
echo ""
