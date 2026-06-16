# Deployment Guide

## Production Deployment

### Prerequisites
- Docker & Docker Compose installed
- Environment variables configured in `.env`
- MongoDB connection string
- Optional: AWS S3 credentials for document storage

### 1. Environment Setup

```bash
# Copy and configure environment variables
cp .env.example .env

# Edit .env with production values
# - Change JWT_SECRET to a strong value
# - Update MONGODB_URI to production database
# - Configure AWS S3 (if using)
# - Set CORS_ORIGIN to your frontend domain
```

### 2. Build Docker Images

```bash
# Build all images
docker-compose build

# Or build specific services
docker-compose build backend
docker-compose build frontend
```

### 3. Deploy

```bash
# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 4. Database Setup

```bash
# Initialize database (first time only)
docker-compose exec backend pnpm run seed

# Monitor database
docker exec -it clinic-mongodb mongosh -u admin -p admin123
```

### 5. Verification

```bash
# Check backend health
curl http://localhost:5000/health

# Check frontend (should return 200)
curl http://localhost:3000

# Test API
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"clinician@hospital.com","password":"password123"}'
```

## AWS Deployment

### Using AWS ECS + RDS + S3

1. **Create RDS MongoDB Instance**
   - Update `MONGODB_URI` in environment variables

2. **Create S3 Bucket**
   - Enable encryption
   - Configure CORS
   - Update `AWS_S3_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`

3. **Create ECS Tasks**
   - Create task definition for backend
   - Create task definition for frontend
   - Configure environment variables
   - Set resource limits

4. **Load Balancer**
   - Configure Application Load Balancer
   - Route `/api/*` to backend service
   - Route `/*` to frontend service

### Using AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize EB application
eb init -p docker clinic-system

# Create environment
eb create clinic-system-prod

# Deploy
eb deploy

# Monitor
eb open
```

## Database Backup

```bash
# Backup MongoDB
docker-compose exec clinic-mongodb mongodump \
  --uri="mongodb://admin:admin123@localhost:27017" \
  --out=/backup

# Restore MongoDB
docker-compose exec clinic-mongodb mongorestore \
  --uri="mongodb://admin:admin123@localhost:27017" \
  /backup
```

## Monitoring & Logging

### Using Docker Logs
```bash
# View all logs
docker-compose logs

# Follow logs
docker-compose logs -f

# View specific service
docker-compose logs backend
```

### Health Checks
```bash
# Backend health
curl http://your-domain:5000/health

# Frontend availability
curl http://your-domain:3000
```

## Security Checklist

- [ ] Change all default passwords
- [ ] Update JWT_SECRET to strong value
- [ ] Enable HTTPS (use nginx reverse proxy or AWS ALB)
- [ ] Configure firewall rules
- [ ] Enable database encryption
- [ ] Set up database backups
- [ ] Configure monitoring and alerts
- [ ] Enable audit logging
- [ ] Review CORS settings
- [ ] Test authentication flows

## Scaling

### Horizontal Scaling
1. Deploy multiple backend instances behind load balancer
2. Deploy multiple frontend instances on CDN
3. Use MongoDB replica set for high availability

### Vertical Scaling
1. Increase Docker resource limits
2. Increase server CPU/RAM
3. Optimize database indexes

## Troubleshooting

### Services not starting
```bash
# Check for port conflicts
docker ps -a

# Restart services
docker-compose restart

# View detailed logs
docker-compose logs -f backend
```

### MongoDB connection issues
```bash
# Check MongoDB status
docker-compose ps clinic-mongodb

# Verify credentials
docker-compose exec clinic-mongodb \
  mongosh -u admin -p admin123 admin
```

### Frontend not loading
```bash
# Check frontend logs
docker-compose logs frontend

# Verify API connectivity
docker-compose exec frontend curl http://backend:5000/health
```

## Maintenance

### Regular Tasks
- Monitor disk usage
- Review logs for errors
- Update dependencies monthly
- Backup database weekly
- Test disaster recovery

### Updates
```bash
# Update images
docker-compose pull

# Rebuild and restart
docker-compose up -d --force-recreate
```
