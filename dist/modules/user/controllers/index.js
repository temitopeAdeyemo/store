"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordController = exports.resetPasswordController = exports.authUser = exports.createUser = void 0;
const create_controller_1 = __importDefault(require("./create.controller"));
exports.createUser = create_controller_1.default;
const auth_controller_1 = __importDefault(require("./auth.controller"));
exports.authUser = auth_controller_1.default;
const resetPassword_controller_1 = __importDefault(require("./resetPassword.controller"));
exports.resetPasswordController = resetPassword_controller_1.default;
const forgotPassword_controller_1 = __importDefault(require("./forgotPassword.controller"));
exports.forgotPasswordController = forgotPassword_controller_1.default;
