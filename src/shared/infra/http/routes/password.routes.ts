import { Router } from 'express';

import { ResetUserPasswordController } from '@modules/accounts/useCases/resetUserPassword/ResetUserPasswordController';
import { SendForgottenPasswordMailController } from '@modules/accounts/useCases/sendForgottenPasswordMail/SendForgottenPasswordMailController';

export const passwordRoutes = Router();

const sendForgottenPasswordMailController =
  new SendForgottenPasswordMailController();

const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post('/forgot', sendForgottenPasswordMailController.handle);
passwordRoutes.post('/reset', resetUserPasswordController.handle);
