import { Router } from 'express';
import { createApp, getApplications, getApplication, downloadApp } from '../controllers';

import { uploadAppValidator, getAppValidator } from '../validators/';
const router = Router();

router.post(
  '/',
  // uploadAppValidator,
  createApp.upload.bind(createApp)
);
router.get('/', getAppValidator, getApplication.get)
router.post('/download', downloadApp.upload.bind(downloadApp));
router.get('/all', getApplications.upload.bind(getApplications));

export default router;
