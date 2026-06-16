import { Router, Request, Response } from 'express';
import {
  uploadDocument,
  getDocuments,
  getDocumentById,
} from '../controllers/document.controller';
import { authMiddleware } from '../middleware/auth';

const router: Router = Router();

router.use(authMiddleware);

router.post('/upload', uploadDocument);
router.get('/', getDocuments);
router.get('/:documentId', getDocumentById);

export default router;
