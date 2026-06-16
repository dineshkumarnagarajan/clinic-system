import { Router, Request, Response } from 'express';
import {
  searchPatients,
  getPatientDetails,
  getTodaysPatients,
  getPatientDocuments,
} from '../controllers/patient.controller';
import { authMiddleware } from '../middleware/auth';

const router: Router = Router();

router.use(authMiddleware);

router.get('/search', searchPatients);
router.get('/today', getTodaysPatients);
router.get('/:patientId', getPatientDetails);
router.get('/:patientId/documents', getPatientDocuments);

export default router;
