import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IStaff {
    staffId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'clinician' | 'nurse' | 'staff';
    department: string;
    hospital: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
}

const staffSchema = new Schema<IStaff>(
    {
        staffId: { type: String, unique: true, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, unique: true, required: true, lowercase: true },
        password: { type: String, required: true, select: false },
        role: { type: String, enum: ['admin', 'clinician', 'nurse', 'staff'], default: 'staff' },
        department: { type: String, required: true },
        hospital: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Hash password before saving
staffSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
staffSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export const Staff = model<IStaff>('Staff', staffSchema);
