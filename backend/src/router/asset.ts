import { Router } from 'express';
import assetController from '../controller/controller.asset';

const router = Router();

router.post('/registrar', assetController.registerAsset);

router.get('/:codAtivo', assetController.getByAssetCode);

export default router;
