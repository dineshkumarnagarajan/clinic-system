# API Documentation

## Base URL

```
Production: https://your-api-domain.com/api
Development: http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

## Endpoints

### Authentication Endpoints

#### Register Staff Member
```
POST /auth/register
```

**Request:**
```json
{
  "staffId": "STAFF001",
  "firstName": "John",
  "lastName": "Clinician",
  "email": "clinician@hospital.com",
  "password": "securePassword123",
  "role": "clinician",
  "department": "Cardiology",
  "hospital": "Central Hospital"
}
```

**Response (201 Created):**
```json
{
  "message": "Staff registered successfully",
  "staffId": "507f1f77bcf86cd799439011"
}
```

#### Login
```
POST /auth/login
```

**Request:**
```json
{
  "email": "clinician@hospital.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "staff": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Clinician",
    "email": "clinician@hospital.com",
    "role": "clinician",
    "department": "Cardiology"
  }
}
```

#### Get Staff Profile
```
GET /auth/profile
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "staffId": "STAFF001",
  "firstName": "John",
  "lastName": "Clinician",
  "email": "clinician@hospital.com",
  "role": "clinician",
  "department": "Cardiology",
  "hospital": "Central Hospital",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

### Patient Endpoints

#### Search Patients
```
GET /patients/search?query={searchTerm}
```

**Parameters:**
- `query` (string, required): Search term (patient ID, name, or DOB)

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "patientId": "PAT001",
    "firstName": "Alice",
    "lastName": "Johnson",
    "dateOfBirth": "1980-05-15T00:00:00Z",
    "phoneNumber": "555-0101",
    "email": "alice@example.com",
    "hospital": "Central Hospital",
    "department": "Cardiology",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Get Today's Patients
```
GET /patients/today
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "patientId": "PAT001",
    "firstName": "Alice",
    "lastName": "Johnson",
    "dateOfBirth": "1980-05-15T00:00:00Z",
    "phoneNumber": "555-0101",
    "hospital": "Central Hospital",
    "department": "Cardiology",
    "createdAt": "2024-01-16T08:00:00Z"
  }
]
```

#### Get Patient Details
```
GET /patients/{patientId}
```

**Parameters:**
- `patientId` (string, required): Patient ID

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "patientId": "PAT001",
  "firstName": "Alice",
  "lastName": "Johnson",
  "dateOfBirth": "1980-05-15T00:00:00Z",
  "phoneNumber": "555-0101",
  "email": "alice@example.com",
  "hospital": "Central Hospital",
  "department": "Cardiology",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Get Patient Documents
```
GET /patients/{patientId}/documents
```

**Parameters:**
- `patientId` (string, required): Patient ID

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "documentId": "DOC001",
    "patientId": "PAT001",
    "staffId": "507f1f77bcf86cd799439011",
    "documentType": "discharge_summary",
    "title": "Discharge Summary - Cardiac Catheterization",
    "s3Url": "https://s3.amazonaws.com/...",
    "isEncrypted": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### Document Endpoints

#### Upload Document
```
POST /documents/upload
```

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "patientId": "PAT001",
  "documentType": "lab_report",
  "title": "ECG Report",
  "content": "Patient ECG shows...",
  "s3Url": "https://s3.amazonaws.com/...",
  "fileSize": 1024,
  "mimeType": "application/pdf"
}
```

**Response (201 Created):**
```json
{
  "message": "Document uploaded successfully",
  "document": "507f1f77bcf86cd799439013"
}
```

#### List Documents
```
GET /documents?patientId={patientId}
```

**Parameters:**
- `patientId` (string, optional): Filter by patient ID

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "documentId": "DOC001",
    "patientId": "PAT001",
    "documentType": "lab_report",
    "title": "ECG Report",
    "content": "Patient ECG shows...",
    "isEncrypted": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Get Document by ID
```
GET /documents/{documentId}
```

**Parameters:**
- `documentId` (string, required): Document ID

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "documentId": "DOC001",
  "patientId": "PAT001",
  "staffId": "507f1f77bcf86cd799439011",
  "documentType": "lab_report",
  "title": "ECG Report",
  "content": "Patient ECG shows...",
  "s3Url": "https://s3.amazonaws.com/...",
  "fileSize": 1024,
  "mimeType": "application/pdf",
  "isEncrypted": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation Error",
  "details": "Email is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "Patient not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error"
}
```

---

## Rate Limiting

- No rate limiting currently implemented
- Recommended: 100 requests per minute per IP

## Pagination

Future versions will include pagination:
```
GET /patients?page=1&limit=20
```

## Filtering

Supported filters:
- `documentType`: discharge_summary, lab_report, clinical_note, other
- `department`: Department name
- `dateRange`: Start and end dates

Example:
```
GET /documents?patientId=PAT001&documentType=lab_report
```
