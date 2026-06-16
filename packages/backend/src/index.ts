import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import authRoutes from "./routes/auth.routes";
import patientRoutes from './routes/patient.routes';
import documentRoutes from './routes/document.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Express = express();
const PORT = process.env.BACKEND_PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/documents', documentRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'Backend is running' });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🏥 Clinic System Backend running on port ${PORT}`);
});
