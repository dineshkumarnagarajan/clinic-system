import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { Staff } from '../models/Staff';
import { AuthRequest } from '../middleware/auth';

export const registerStaff = async (req: AuthRequest, res: Response) => {
    try {
        const { staffId, firstName, lastName, email, password, role, department, hospital } = req.body;

        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ error: 'Staff member already exists' });
        }

        const staff = new Staff({
            staffId,
            firstName,
            lastName,
            email,
            password,
            role,
            department,
            hospital,
        });

        await staff.save();

        res.status(201).json({
            message: 'Staff registered successfully',
            staffId: staff._id,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const loginStaff = async (req: AuthRequest, res: Response) => {
    try {
        const { email, password } = req.body;

        const staff = await Staff.findOne({ email }).select('+password');
        console.log('staff', staff)
        if (!staff) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await staff.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { staffId: staff._id, role: staff.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: process.env.JWT_EXPIRY || '7d' } as any
        );

        res.json({
            message: 'Login successful',
            token,
            staff: {
                id: staff._id,
                firstName: staff.firstName,
                lastName: staff.lastName,
                email: staff.email,
                role: staff.role,
                department: staff.department,
            },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const staff = await Staff.findById(req.staffId);
        if (!staff) {
            return res.status(404).json({ error: 'Staff not found' });
        }

        res.json(staff);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
