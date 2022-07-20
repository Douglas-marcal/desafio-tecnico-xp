import { Router } from 'express';
import assetController from '../controller/controller.asset';

const router = Router();

router.get('/', assetController.getAllAssets);

router.post('/registrar', assetController.registerAsset);

router.get('/:codAtivo', assetController.getByAssetCode);

export default router;
