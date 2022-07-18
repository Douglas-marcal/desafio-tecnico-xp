import { Router } from 'express';
import clientController from '../controller/controller.client';

const router = Router();

router.post('/registrar', clientController.createClient);

router.post('/entrar', clientController.loginClient);

export default router;
