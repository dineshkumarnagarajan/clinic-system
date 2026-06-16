import { Response } from 'express';
import { Types } from 'mongoose';
import { Patient } from '../models/Patient';
import { Document } from '../models/Document';
import { AuthRequest } from '../middleware/auth';

const buildCursorFilter = (cursor?: string): Record<string, any> | undefined => {
    if (!cursor) {
        return undefined;
    }

    if (!Types.ObjectId.isValid(cursor)) {
        return undefined;
    }

    return { _id: { $lt: new Types.ObjectId(cursor) } };
};

export const searchPatients = async (req: AuthRequest, res: Response) => {
    try {
        const { query, cursor, limit } = req.query;

        if (!query) {
            return res.status(400).json({ error: 'Search query required' });
        }

        const pageSize = Math.min(Number(limit) || 20, 50);
        const filter: Record<string, any> = {
            $or: [
                { patientId: new RegExp(query as string, 'i') },
                { firstName: new RegExp(query as string, 'i') },
                { lastName: new RegExp(query as string, 'i') },
            ],
        };

        const cursorFilter = buildCursorFilter(cursor as string | undefined);
        if (cursorFilter) {
            Object.assign(filter, cursorFilter);
        }

        const patients = await Patient.find(filter)
            .sort({ _id: -1 })
            .limit(pageSize + 1);

        let nextCursor: string | null = null;
        if (patients.length > pageSize) {
            nextCursor = patients[pageSize]._id.toString();
            patients.splice(pageSize, 1);
        }

        res.json({ patients, nextCursor });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getPatientDetails = async (req: AuthRequest, res: Response) => {
    try {
        const { patientId } = req.params;

        const patient = await Patient.findOne({ patientId });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json(patient);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getTodaysPatients = async (req: AuthRequest, res: Response) => {
    try {
        const { cursor, limit } = req.query;
        const pageSize = Math.min(Number(limit) || 20, 50);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const filter: Record<string, any> = {
            createdAt: { $gte: today, $lt: tomorrow },
        };

        const cursorFilter = buildCursorFilter(cursor as string | undefined);
        if (cursorFilter) {
            Object.assign(filter, cursorFilter);
        }

        const patients = await Patient.find(filter)
            .sort({ _id: -1 })
            .limit(pageSize + 1);

        let nextCursor: string | null = null;
        if (patients.length > pageSize) {
            nextCursor = patients[pageSize]._id.toString();
            patients.splice(pageSize, 1);
        }

        res.json({ patients, nextCursor });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getPatientDocuments = async (req: AuthRequest, res: Response) => {
    try {
        const { patientId } = req.params;

        const documents = await Document.find({ patientId })
            .sort({ createdAt: -1 });

        res.json(documents);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
