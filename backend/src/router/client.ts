import { Router } from 'express';
import clientController from '../controller/controller.client';
import validateLogin from '../middleware/validate.login';
import validateClientRegister from '../middleware/validate.client.register';
import validateToken from '../middleware/validate.token';
import validateDepositOrDraft from '../middleware/validate.deposit.draft';

const router = Router();

router.post('/registrar', validateClientRegister, clientController.createClient);

router.post('/entrar', validateLogin, clientController.clientLogin);

router.post('/deposito', validateToken, validateDepositOrDraft, clientController.deposit);

router.post('/saque', validateToken, validateDepositOrDraft, clientController.draft);

router.get('/ativos', validateToken, clientController.findAllClientAssets);

router.get('/saldo', validateToken, clientController.availableBalance);

export default router;
