export interface Patient {
    _id: string;
    patientId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    phoneNumber: string;
    email?: string;
    hospital: string;
    department: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Document {
    _id: string;
    documentId: string;
    patientId: string;
    staffId: string;
    documentType: 'discharge_summary' | 'lab_report' | 'clinical_note' | 'other';
    title: string;
    content: string;
    s3Url?: string;
    fileSize?: number;
    mimeType?: string;
    uploadedAt: Date;
    isEncrypted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface StaffUser {
    _id: string;
    staffId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'clinician' | 'nurse' | 'staff';
    department: string;
    hospital: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthResponse {
    message: string;
    token: string;
    staff: Omit<StaffUser, 'password'>;
}
