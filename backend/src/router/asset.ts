import { Router } from 'express';
import assetController from '../controller/controller.asset';
import validateNewAssetFields from '../middleware/validate.new.asset';
import validateToken from '../middleware/validate.token';

const router = Router();

router.get('/', validateToken, assetController.getAllAssets);

router.post('/registrar', validateToken, validateNewAssetFields, assetController.registerAsset);

router.get('/:codAtivo', validateToken, assetController.getByAssetCode);

export default router;
