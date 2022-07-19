import { Router } from 'express';
import clientController from '../controller/controller.client';
import validateLogin from '../middleware/validate.login';

const router = Router();

router.post('/registrar', clientController.createClient);

router.post('/entrar', validateLogin, clientController.loginClient);

export default router;
