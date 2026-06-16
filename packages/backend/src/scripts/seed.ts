import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Staff } from '../models/Staff';
import { Patient } from '../models/Patient';
import { Document } from '../models/Document';

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clinic_system');
        console.log('✅ MongoDB connected');

        // Clear existing data
        await Staff.deleteMany({});
        await Patient.deleteMany({});
        await Document.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Seed staff members
        const staffMembers = await Staff.create([
            {
                staffId: 'STAFF001',
                firstName: 'John',
                lastName: 'Clinician',
                email: 'clinician@hospital.com',
                password: 'password123',
                role: 'clinician',
                department: 'Cardiology',
                hospital: 'Central Hospital',
            },
            {
                staffId: 'STAFF002',
                firstName: 'Jane',
                lastName: 'Nurse',
                email: 'nurse@hospital.com',
                password: 'password123',
                role: 'nurse',
                department: 'Emergency',
                hospital: 'Central Hospital',
            },
            {
                staffId: 'ADMIN001',
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@hospital.com',
                password: 'password123',
                role: 'admin',
                department: 'Administration',
                hospital: 'Central Hospital',
            },
        ]);
        console.log('✅ Seeded staff members');

        // Seed patients
        const patients = await Patient.create([
            {
                patientId: 'PAT001',
                firstName: 'Alice',
                lastName: 'Johnson',
                dateOfBirth: new Date('1980-05-15'),
                phoneNumber: '555-0101',
                email: 'alice@example.com',
                hospital: 'Central Hospital',
                department: 'Cardiology',
            },
            {
                patientId: 'PAT002',
                firstName: 'Bob',
                lastName: 'Smith',
                dateOfBirth: new Date('1975-08-22'),
                phoneNumber: '555-0102',
                email: 'bob@example.com',
                hospital: 'Central Hospital',
                department: 'Emergency',
            },
            {
                patientId: 'PAT003',
                firstName: 'Carol',
                lastName: 'Davis',
                dateOfBirth: new Date('1990-03-10'),
                phoneNumber: '555-0103',
                email: 'carol@example.com',
                hospital: 'Central Hospital',
                department: 'Cardiology',
            },
        ]);
        console.log('✅ Seeded patients');

        // Seed documents
        const documents = await Document.create([
            {
                documentId: 'DOC001',
                patientId: 'PAT001',
                staffId: staffMembers[0]._id,
                documentType: 'discharge_summary',
                title: 'Discharge Summary - Cardiac Catheterization',
                content: 'Patient underwent successful cardiac catheterization. Findings show normal coronary arteries...',
                isEncrypted: true,
            },
            {
                documentId: 'DOC002',
                patientId: 'PAT001',
                staffId: staffMembers[0]._id,
                documentType: 'lab_report',
                title: 'ECG Report - Normal Sinus Rhythm',
                content: 'ECG shows normal sinus rhythm with no acute ST segment changes...',
                isEncrypted: true,
            },
            {
                documentId: 'DOC003',
                patientId: 'PAT002',
                staffId: staffMembers[1]._id,
                documentType: 'clinical_note',
                title: 'Emergency Department Visit Note',
                content: 'Patient presented with chest pain. Initial evaluation and stabilization completed...',
                isEncrypted: true,
            },
            {
                documentId: 'DOC004',
                patientId: 'PAT003',
                staffId: staffMembers[0]._id,
                documentType: 'lab_report',
                title: 'Blood Work Results',
                content: 'Comprehensive metabolic panel results within normal limits...',
                isEncrypted: true,
            },
        ]);
        console.log('✅ Seeded documents');

        console.log('\n🎉 Database seeding completed successfully!');
        console.log('\nDemo Credentials:');
        console.log('Email: clinician@hospital.com');
        console.log('Password: password123');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();
