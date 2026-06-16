import { Response } from 'express';
import { Document } from '../models/Document';
import { AuthRequest } from '../middleware/auth';

export const uploadDocument = async (req: AuthRequest, res: Response) => {
    try {
        const { patientId, documentType, title, content, s3Url, fileSize, mimeType } = req.body;

        const documentId = `DOC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const document = new Document({
            documentId,
            patientId,
            staffId: req.staffId,
            documentType,
            title,
            content,
            s3Url,
            fileSize,
            mimeType,
            isEncrypted: true,
        });

        await document.save();

        res.status(201).json({
            message: 'Document uploaded successfully',
            document: document._id,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getDocuments = async (req: AuthRequest, res: Response) => {
    try {
        const { patientId } = req.query;

        const query = patientId ? { patientId } : {};
        const documents = await Document.find(query).sort({ createdAt: -1 });

        res.json(documents);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getDocumentById = async (req: AuthRequest, res: Response) => {
    try {
        const { documentId } = req.params;

        const document = await Document.findOne({ documentId });
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.json(document);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
