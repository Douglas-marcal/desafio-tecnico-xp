import { Router } from 'express';
import clientController from '../controller/controller.client';

const router = Router();

router.post('/registrar', clientController.createClient);

export default router;
