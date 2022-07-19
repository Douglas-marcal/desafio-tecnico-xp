import { Router } from 'express';
import clientController from '../controller/controller.client';
import validateLogin from '../middleware/validate.login';
import validateClientRegister from '../middleware/validate.client.register';
import validateToken from '../middleware/validate.token';

const router = Router();

router.post('/registrar', validateClientRegister, clientController.createClient);

router.post('/entrar', validateLogin, clientController.clientLogin);

router.get('/:codCliente', validateToken, clientController.availableBalance);

export default router;
