import { Router } from 'express';
import assetRouter from './asset';
import clientRouter from './client';

const router = Router();

router.use('/ativos', assetRouter);

router.use('/cliente', clientRouter);

export default router;
