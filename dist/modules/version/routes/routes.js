"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', 
// uploadAppValidator,
controllers_1.createVersion.upload.bind(controllers_1.createVersion));
router.get('/', controllers_1.getVersion.upload.bind(controllers_1.getVersion));
router.post('/download', controllers_1.downloadVersion.upload.bind(controllers_1.downloadVersion));
router.get('/all', controllers_1.getVersions.upload.bind(controllers_1.getVersions));
exports.default = router;
