import { Router } from 'express';
import assetController from '../controller/controller.asset';
import validateNewAssetFields from '../middleware/validate.new.asset';

const router = Router();

router.get('/', assetController.getAllAssets);

router.post('/registrar', validateNewAssetFields, assetController.registerAsset);

router.get('/:codAtivo', assetController.getByAssetCode);

export default router;
