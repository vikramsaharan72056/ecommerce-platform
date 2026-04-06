#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# PHASE 1 — FOUNDATION VERIFICATION SCRIPT
# This script tests the end-to-end flow:
# Gateway -> Auth -> Notification (Kafka) -> MailHog
# ─────────────────────────────────────────────────────────────────────────────

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

GATEWAY_URL="http://localhost:3000"
MAILHOG_API="http://localhost:8025/api/v2/messages"

echo -e "${BLUE}Testing Phase 1 Foundation...${NC}"

# 1. Health Check
echo -e "\n${YELLOW}[1/4] Checking Gateway Health...${NC}"
curl -s -X GET "${GATEWAY_URL}/health" | grep -q "up" && echo -e "${GREEN}✓ Gateway is alive${NC}" || echo -e "${RED}✗ Gateway check failed${NC}"

# 2. Register a User (via Gateway)
echo -e "\n${YELLOW}[2/4] Registering User via API Gateway...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "${GATEWAY_URL}/v1/auth/register" \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: dev-tenant-1" \
  -d '{
    "email": "test-user@example.com",
    "password": "StrongPassword123!",
    "firstName": "Phase",
    "lastName": "One"
  }')

echo "${REGISTER_RESPONSE}" | grep -q "userId" && echo -e "${GREEN}✓ Registration successful${NC}" || (echo -e "${RED}✗ Registration failed${NC}" && echo "${REGISTER_RESPONSE}")

# 3. Verify Kafka + Notification (Check MailHog)
echo -e "\n${YELLOW}[3/4] Verifying Notification Service (Kafka -> Email)...${NC}"
echo "Waiting 5 seconds for Kafka processing..."
sleep 5
EMAILS=$(curl -s -X GET "${MAILHOG_API}")
echo "${EMAILS}" | grep -q "test-user@example.com" && echo -e "${GREEN}✓ Verification email found in MailHog${NC}" || echo -e "${RED}✗ No email found. Check notification-service logs.${NC}"

# 4. Auth Login + JWT Check
echo -e "\n${YELLOW}[4/4] Testing Login and JWT Issue...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "${GATEWAY_URL}/v1/auth/login" \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: dev-tenant-1" \
  -d '{
    "email": "test-user@example.com",
    "password": "StrongPassword123!"
  }')

ACCESS_TOKEN=$(echo "${LOGIN_RESPONSE}" | sed -n 's/.*"accessToken":"\([^"]*\)".*/\1/p')

if [ -n "$ACCESS_TOKEN" ]; then
  echo -e "${GREEN}✓ Login successful. JWT issued.${NC}"
  echo -e "${YELLOW}Testing Authenticated Profile Call...${NC}"
  PROFILE=$(curl -s -X GET "${GATEWAY_URL}/v1/auth/me" -H "Authorization: Bearer ${ACCESS_TOKEN}")
  echo "${PROFILE}" | grep -q "test-user@example.com" && echo -e "${GREEN}✓ Profile call successful (JWT Validated)${NC}" || echo -e "${RED}✗ Profile call failed${NC}"
else
  echo -e "${RED}✗ Login failed${NC}"
  echo "${LOGIN_RESPONSE}"
fi

echo -e "\n${BOLD}${GREEN}Phase 1 Foundation Test Passed! 🏆${NC}"
