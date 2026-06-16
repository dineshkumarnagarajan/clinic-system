# Product Requirement Document (PRD)

## Project Name: Clinic Document Management System (CDMS)
**Status:** Live (v1.0.0) / Active Development  
**Author:** AI Product Development Partner  
**Target Audience:** Clinicians, Nurses, Healthcare Administrators, and Engineering Teams  

---

## 1. Executive Summary & Goals

### 1.1 Objective
The Clinic Document Management System (CDMS) is a centralized, secure, HIPAA-aligned document dashboard designed to help healthcare practitioners quickly search for patients and review their associated medical history (discharge summaries, lab reports, clinical notes). By consolidating records across systems and departments, the system cuts administrative search times, speeds up patient consultations, and reduces clinical gaps.

### 1.2 Success Metrics
- **Consultation Delay Reduction:** Decrease time spent searching for patient records from several minutes to under 2 seconds.
- **Data Completeness:** 100% of patient records consolidated with matching clinical documents.
- **User Adoption:** High daily active usage among clinicians and nurses within the partner clinic/hospital.

---

## 2. User Personas

| Persona | Role | Key Needs |
| :--- | :--- | :--- |
| **Dr. John (Clinician)** | Primary User | Needs instant access to a patient's historical lab reports and discharge summaries during a live consultation. |
| **Nurse Jane (Nurse)** | Assistant / Editor | Needs to view today's active patient list, check incoming records, and prep patient details for the doctor. |
| **Admin Alex (Admin)** | Administrator | Needs to manage staff accounts, roles, access levels, and ensure audit logs and data storage comply with HIPAA regulations. |

---

## 3. Key Features & Functional Requirements

### 3.1 Staff Authentication & Authorization
- **Register / Sign Up:** Allow new staff members to register. Require approval/activation flags.
- **Role-Based Authentication (RBAC):** Authenticate users using JWT. Enforce distinct role boundaries (`admin`, `clinician`, `nurse`, `staff`).
- **Secure Password Policies:** Hash user passwords using `bcrypt` with a minimum of 12 salt rounds.

### 3.2 Real-time Patient Search & List View
- **Today's Patients:** Default view displaying patients scheduled/admitted today (chronologically sorted).
- **Global Patient Search:** Multi-attribute query search matching:
  - Patient ID
  - First Name / Last Name
  - Date of Birth (DOB)
- **Cursor-Based Pagination:** Perform fast, infinite-scroll pagination using Mongo Object ID cursors (`_id` comparison), preventing item skipping or duplicating during list updates.

### 3.3 Patient Profile & Document Aggregation
- **Consolidated Profile View:** Display patient metadata (Name, DOB, Patient ID, Department, Hospital).
- **Document Timeline:** Chronological list of patient documents categorized by types:
  - `discharge_summary`
  - `lab_report`
  - `clinical_note`
  - `other` (e.g. general templates, forms)
- **Encrypted Document Previews:** Decrypt document contents on-the-fly when viewed by authorized staff.

---

## 4. Technical Architecture & Security Constraints

### 4.1 System Diagram & Flow
```
[React Frontend (Vite)] ──(JWT Authenticated REST APIs)──> [Express Backend] ──> [MongoDB (Atlas/Local)]
                                                              │
                                                       (AES-256 Decrypt)
                                                              │
                                                              v
                                                   [Secure Document Output]
```

### 4.2 Database Schema
- **Staff Collection:** Stores usernames, emails, roles, and hashed credentials.
- **Patient Collection:** Stores patient identity information. Sensitive details (DOB, Email, Phone) are encrypted at-rest using AES-256.
- **Document Collection:** Stores clinical files with references to `patientId` and the uploading `staffId`. Content is fully encrypted.

### 4.3 Security & Compliance (HIPAA Alignment)
- **Encryption-at-Rest:** Implement AES-256-CBC encryption for all patient-identifiable data (PII/PHI) and document contents.
- **Security Headers:** Use Express `helmet` middleware to enforce secure HTTP headers (XSS protection, Clickjacking, CSP).
- **Session Safety:** Short-lived JWTs (expiring in 7 days or configurable shorter periods) with client storage best practices.

---

## 5. Non-Functional Requirements

- **Performance:** APIs must respond within < 200ms for searches. Patient listing queries must use indexed DB lookups (`patientId: 1`, `createdAt: -1`).
- **Scalability:** The backend must run statelessly in a Docker container, allowing horizontal scaling behind a load balancer.
- **Resilience:** Use cursor-based pagination to limit memory footprints when querying large user records (e.g. 10,000+ patients).

---

## 6. Product Roadmap (Future Phases)

- **Phase 2 (Cloud Storage):** Integrate AWS S3 with signed URLs for handling large imaging reports and PDF attachments.
- **Phase 3 (Integrations):** Support HL7 / FHIR standards to sync data directly with EMR/EHR providers (Epic, Athena, Cerner).
- **Phase 4 (Audit Trail):** Log every view, search, and edit action to create a cryptographically verifiable HIPAA audit trail.
- **Phase 5 (Multi-Factor Auth):** Implement 2FA/MFA via TOTP (Google Authenticator) for administrative and clinical accounts.
- **Phase 6 (Export & Printing):** Safe PDF export options with watermarking and access logging.
