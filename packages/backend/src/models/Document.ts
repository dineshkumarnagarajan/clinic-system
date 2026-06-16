import { Schema, model } from 'mongoose';

interface IDocument {
    documentId: string;
    patientId: string;
    staffId: string;
    documentType: 'discharge_summary' | 'lab_report' | 'clinical_note' | 'other';
    title: string;
    content: string;
    s3Url: string;
    fileSize: number;
    mimeType: string;
    uploadedAt: Date;
    isEncrypted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const documentSchema = new Schema<IDocument>(
    {
        documentId: { type: String, unique: true, required: true },
        patientId: { type: String, required: true, index: true },
        staffId: { type: String, required: true },
        documentType: {
            type: String,
            enum: ['discharge_summary', 'lab_report', 'clinical_note', 'other'],
            required: true,
        },
        title: { type: String, required: true },
        content: { type: String, required: true },
        s3Url: { type: String },
        fileSize: { type: Number },
        mimeType: { type: String },
        uploadedAt: { type: Date, default: Date.now },
        isEncrypted: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Index for fast patient document lookup
documentSchema.index({ patientId: 1, createdAt: -1 });

export const Document = model<IDocument>('Document', documentSchema);
