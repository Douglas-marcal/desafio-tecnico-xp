import { Router } from 'express';

import investmentController from '../controller/controller.investment';
import validateBuyAndSellFields from '../middleware/validate.buy.sell';
import validateToken from '../middleware/validate.token';

const router = Router();

router.post('/comprar', validateToken, validateBuyAndSellFields, investmentController.buyAsset);

router.post('/vender', validateToken, validateBuyAndSellFields, investmentController.sellAsset);

export default router;
