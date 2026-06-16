import { Schema, model } from 'mongoose';
import { encryptData, decryptData } from '../utils/encryption';

interface IPatient {
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

const patientSchema = new Schema<IPatient>(
    {
        patientId: { type: String, unique: true, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String },
        hospital: { type: String, required: true },
        department: { type: String, required: true },
    },
    { timestamps: true }
);

// Encrypt sensitive fields before saving
patientSchema.pre('save', function (next) {
    if (this.isModified('phoneNumber')) {
        this.phoneNumber = encryptData(this.phoneNumber);
    }
    if (this.isModified('email') && this.email) {
        this.email = encryptData(this.email);
    }
    next();
});

// Decrypt sensitive fields after fetching
patientSchema.post('find', function (docs) {
    if (Array.isArray(docs)) {
        docs.forEach(doc => {
            if (doc.phoneNumber) doc.phoneNumber = decryptData(doc.phoneNumber);
            if (doc.email) doc.email = decryptData(doc.email);
        });
    }
});

patientSchema.post('findOne', function (doc) {
    if (doc) {
        if (doc.phoneNumber) doc.phoneNumber = decryptData(doc.phoneNumber);
        if (doc.email) doc.email = decryptData(doc.email);
    }
});

export const Patient = model<IPatient>('Patient', patientSchema);
