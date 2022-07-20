import { Router } from 'express';
import investmentController from '../controller/controller.investment';

const router = Router();

router.post('/comprar', investmentController.buyAsset);

router.post('/vender');

export default router;
