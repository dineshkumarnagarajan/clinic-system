# Clinic System - Getting Started Guide

## 🎯 Quick Start (5 minutes)

### 1. Prerequisites
```bash
# Check Node.js version (need 18+)
node --version

# Install pnpm globally
npm install -g pnpm

# Verify Docker & Docker Compose are installed
docker --version
docker-compose --version
```

### 2. Clone/Setup Project
```bash
cd clinic-system
cp .env.example .env
```

### 3. Start Development Environment
```bash
# Option A: Using Docker (recommended for testing)
docker-compose -f docker-compose.dev.yml up

# Option B: Manual setup (if not using Docker)
pnpm install
pnpm dev
```

### 4. Access Applications
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

### 5. Demo Login
```
Email: clinician@hospital.com
Password: password123
```

## 📁 Project Structure

- `packages/backend/` - Node.js + Express API server
- `packages/frontend/` - React web application
- `packages/shared/` - Shared TypeScript types
- `docker-compose.yml` - Production configuration
- `docker-compose.dev.yml` - Development configuration

## 🔧 Available Commands

```bash
# Development
pnpm dev              # Start all services

# Building
pnpm build            # Build all packages
pnpm type-check       # Check TypeScript types
pnpm lint            # Lint all packages

# Docker
docker-compose up     # Start production
docker-compose down   # Stop containers

# Individual packages
cd packages/backend && pnpm run dev
cd packages/frontend && pnpm run dev
```

## 🆘 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### MongoDB connection error
```bash
# Check if MongoDB is running
docker ps | grep mongo

# Restart containers
docker-compose down && docker-compose -f docker-compose.dev.yml up
```

### Module not found errors
```bash
# Clear pnpm cache and reinstall
pnpm install --force
```

## 📚 Next Steps

1. Review [README.md](./README.md) for comprehensive documentation
2. Check backend API in `packages/backend/src/routes/`
3. Explore frontend components in `packages/frontend/src/`
4. Customize environment variables in `.env`
5. Add seed data for testing

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material-UI](https://mui.com/)
