"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersions = exports.getVersion = exports.downloadVersion = exports.createVersion = void 0;
const createVersion_controller_1 = __importDefault(require("./createVersion.controller"));
exports.createVersion = createVersion_controller_1.default;
const downloadVersion_controller_1 = __importDefault(require("./downloadVersion.controller"));
exports.downloadVersion = downloadVersion_controller_1.default;
const getVersion_1 = __importDefault(require("./getVersion"));
exports.getVersion = getVersion_1.default;
const getVersions_1 = __importDefault(require("./getVersions"));
exports.getVersions = getVersions_1.default;
