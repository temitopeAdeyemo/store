"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validators_1 = require("../validators/");
const router = (0, express_1.Router)();
router.post('/', 
// uploadAppValidator,
controllers_1.createApp.upload.bind(controllers_1.createApp));
router.get('/', validators_1.getAppValidator, controllers_1.getApplication.get);
router.post('/download', controllers_1.downloadApp.upload.bind(controllers_1.downloadApp));
router.get('/all', controllers_1.getApplications.upload.bind(controllers_1.getApplications));
exports.default = router;
