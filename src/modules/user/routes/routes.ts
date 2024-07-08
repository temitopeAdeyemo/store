import { Router } from 'express';
import {
  createUser,
  authUser,
  resetPasswordController,
  forgotPasswordController,
} from '../controllers';

import {
  registerValidator,
  loginValidator,
  VerifyPhoneValidator,
  GetPhoneOtpValidator,
  resetPasswordValidator,
  ForgotPasswordValidator,
  verifyEmailValidator,
  getEmailValidator
} from '../validators/';
const router = Router();

router.post(
  '/register',
  registerValidator,
  createUser.register.bind(createUser)
);

router.post('/login', loginValidator, authUser.login.bind(authUser));

router.patch(
  '/reset-password',
  resetPasswordValidator,
  resetPasswordController.reset.bind(resetPasswordController)
);

router.patch(
  '/forgot-password',
  ForgotPasswordValidator,
  forgotPasswordController.getOtp.bind(forgotPasswordController)
);

export default router;
