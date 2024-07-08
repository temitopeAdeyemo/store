import { Router } from 'express';
import userRouter from '../modules/user/routes/routes';
import applicationRouter from '../modules/application/routes/routes';
import versionRouter from '../modules/version/routes/routes';

const router = Router();

router.use('/user', userRouter);
router.use('/application', applicationRouter);
router.use('/version', versionRouter);


export default router;
