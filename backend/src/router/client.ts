import { Router } from 'express';
import clientController from '../controller/controller.client';
import validateLogin from '../middleware/validate.login';
import validateClientRegister from '../middleware/validate.client.register';

const router = Router();

router.post('/registrar', validateClientRegister, clientController.createClient);

router.post('/entrar', validateLogin, clientController.loginClient);

router.get('/:codCliente', clientController.availableBalance);

export default router;
