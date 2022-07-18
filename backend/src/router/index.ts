import { Router } from 'express';
import assetRouter from './asset';

const router = Router();

router.use('/ativos', assetRouter);

export default router;
