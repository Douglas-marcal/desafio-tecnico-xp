import { Router } from 'express';
import assetRouter from './asset';
import clientRouter from './client';
import investmentRouter from './investment';

const router = Router();

router.use('/ativos', assetRouter);

router.use('/conta', clientRouter);

router.use('/investimentos', investmentRouter);

export default router;
