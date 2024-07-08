import { Router } from 'express';
import { createVersion, downloadVersion, getVersion, getVersions } from '../controllers';

import { uploadAppValidator } from '../validators/';
const router = Router();

router.post(
  '/',
  // uploadAppValidator,
  createVersion.upload.bind(createVersion)
);

router.get('/', getVersion.upload.bind(getVersion));
router.post('/download', downloadVersion.upload.bind(downloadVersion));
router.get('/all', getVersions.upload.bind(getVersions));

export default router;
