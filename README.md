# Clinic Document Management System

A comprehensive healthcare document management system that helps clinicians quickly access and review patient medical documents (discharge summaries, lab reports, clinical notes) without manual searching.

## 🎯 Problem Statement

- Clinicians spend excessive time manually searching through multiple documents
- Documents scattered across different departments and systems
- Leads to delays in patient consultations and missed medical history

## ✨ Solution

A centralized dashboard with:
- Real-time patient search (by ID, name, DOB)
- Grouped patient documents in one place
- Secure, encrypted document storage
- HIPAA-compliant access control
- Staff authentication and role-based permissions

## 🛠️ Tech Stack

### Frontend
- **React 18** (TypeScript)
- **Vite** - Fast development server
- **TanStack Query** - Server state management
- **Redux Toolkit** - Client state management
- **Material-UI** - Component library

### Backend
- **Node.js + Express.js** (TypeScript)
- **MongoDB** - Patient and document data
- **JWT** - Authentication
- **Helmet** - Security headers
- **AES-256 Encryption** - Data encryption
- **Bcrypt** - Password hashing

### DevOps & Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **pnpm** - Fast package manager
- **TypeScript** - Type safety

## 📋 Features

### ✅ Implemented
- [x] Staff authentication (login/register)
- [x] Patient search (multiple criteria)
- [x] Today's patient list view
- [x] Patient details with grouped documents
- [x] Document management API
- [x] Encrypted data storage
- [x] JWT-based authorization
- [x] Responsive UI with Material-UI
- [x] Docker containerization

### 🚧 Future Enhancements
- [ ] AWS S3 integration for large file storage
- [ ] EMR/EHR integration (Epic, Athena, Cerner)
- [ ] Document upload with file validation
- [ ] Advanced search with filters
- [ ] Document versioning
- [ ] Audit logging
- [ ] Export documents feature
- [ ] Email notifications
- [ ] Two-factor authentication

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- pnpm (install: `npm install -g pnpm`)

### Local Development Setup

#### Option 1: Docker (Recommended)

```bash
# Clone/navigate to project
cd clinic-system

# Copy environment file
cp .env.example .env

# Start development environment
docker-compose -f docker-compose.dev.yml up

# Services will be available at:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

#### Option 2: Manual Setup

```bash
# Install dependencies
pnpm install

# Start backend
cd packages/backend
pnpm run dev
# Backend runs on http://localhost:5000

# In another terminal, start frontend
cd packages/frontend
pnpm run dev
# Frontend runs on http://localhost:3000
```

### Production Build

```bash
# Build all packages
pnpm build

# Start with Docker Compose
docker-compose up

# Services will be available at:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt with salt rounds (12)
- **Data Encryption** - AES-256 for sensitive fields
- **CORS** - Configured for frontend origin
- **Helmet** - HTTP security headers
- **Environment Variables** - Sensitive data not in code
- **HTTPS Ready** - Production-grade setup

## 📊 Database Schema

### Staff Collection
- `staffId` - Unique identifier
- `firstName`, `lastName` - Staff name
- `email` - Unique email
- `password` - Hashed password
- `role` - admin/clinician/nurse/staff
- `department` - Department name
- `hospital` - Hospital name

### Patient Collection
- `patientId` - Unique identifier
- `firstName`, `lastName` - Patient name
- `dateOfBirth` - Patient DOB (encrypted)
- `phoneNumber` - Contact (encrypted)
- `email` - Email (encrypted)
- `hospital` - Hospital name
- `department` - Department name

### Document Collection
- `documentId` - Unique identifier
- `patientId` - Reference to patient
- `staffId` - Reference to staff member
- `documentType` - discharge_summary/lab_report/clinical_note/other
- `title` - Document title
- `content` - Document content
- `s3Url` - AWS S3 URL (optional)
- `isEncrypted` - Encryption flag

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new staff member
POST   /api/auth/login         - Login
GET    /api/auth/profile       - Get staff profile (protected)
```

### Patients
```
GET    /api/patients/search    - Search patients
GET    /api/patients/today     - Get today's patients
GET    /api/patients/:id       - Get patient details (protected)
GET    /api/patients/:id/docs  - Get patient documents (protected)
```

### Documents
```
POST   /api/documents/upload   - Upload document (protected)
GET    /api/documents          - List documents (protected)
GET    /api/documents/:id      - Get document details (protected)
```

## 📝 Demo Credentials

```
Email: clinician@hospital.com
Password: password123
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run specific package tests
cd packages/backend && pnpm test
cd packages/frontend && pnpm test
```

## 📦 Project Structure

```
clinic-system/
├── packages/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── controllers/    # Request handlers
│   │   │   ├── models/         # Mongoose schemas
│   │   │   ├── routes/         # API routes
│   │   │   ├── middleware/     # Auth, error handling
│   │   │   ├── services/       # Business logic
│   │   │   ├── utils/          # Helpers (encryption, etc.)
│   │   │   ├── config/         # Configuration
│   │   │   └── index.ts        # Entry point
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/     # Reusable components
│   │   │   ├── pages/          # Page components
│   │   │   ├── store/          # Redux store & slices
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── services/       # API services
│   │   │   ├── theme/          # MUI theme
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── shared/
│       └── src/
│           └── types.ts        # Shared TypeScript types
├── .env.example
├── docker-compose.yml
├── docker-compose.dev.yml
├── Dockerfile.backend
├── Dockerfile.frontend
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

## 🚦 Development Workflow

### Before committing:
```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Build
pnpm build
```

## 📚 Documentation

- Backend API docs: See routes in `packages/backend/src/routes/`
- Frontend components: See `packages/frontend/src/components/`
- TypeScript types: See `packages/shared/src/types.ts`

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📝 License

MIT License - See LICENSE file for details

## 🆘 Support

For issues or questions:
1. Check existing documentation
2. Review GitHub issues
3. Contact the development team

---

**Built with ❤️ for better healthcare documentation management**
