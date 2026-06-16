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
        const patientData = [];
        const departments = ['Cardiology', 'Emergency', 'Neurology', 'Pediatrics', 'Oncology'];
        for (let i = 1; i <= 100; i++) {
            const idStr = String(i).padStart(3, '0');
            patientData.push({
                patientId: `PAT${idStr}`,
                firstName: `PatientFirstName${i}`,
                lastName: `PatientLastName${i}`,
                dateOfBirth: new Date(1950 + (i % 50), i % 12, (i % 28) + 1),
                phoneNumber: `555-${String(i).padStart(4, '0')}`,
                email: `patient${i}@example.com`,
                hospital: 'Central Hospital',
                department: departments[i % departments.length],
            });
        }
        const patients = await Patient.create(patientData);
        console.log(`✅ Seeded ${patients.length} patients`);

        // Seed documents
        const documentData = [];
        const docTypes = ['discharge_summary', 'lab_report', 'clinical_note', 'other'];
        for (let i = 1; i <= 100; i++) {
            const idStr = String(i).padStart(3, '0');
            documentData.push({
                documentId: `DOC${idStr}`,
                patientId: `PAT${idStr}`,
                staffId: staffMembers[i % staffMembers.length]._id,
                documentType: docTypes[i % docTypes.length],
                title: `Medical Record for Patient ${i} - Doc ${i}`,
                content: `This is confidential medical record content for patient ${i}. Diagnosis: normal recovery.`,
                isEncrypted: true,
            });
        }
        const documents = await Document.create(documentData);
        console.log(`✅ Seeded ${documents.length} documents`);

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
