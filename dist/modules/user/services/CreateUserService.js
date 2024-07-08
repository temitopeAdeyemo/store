"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("../../../shared/base/BaseService"));
class CreateUserService extends BaseService_1.default {
    async execute(data) {
        await this.throwCredTaken('email', data.email);
        data.password = await this.hashPassword(data.password);
        await this.createUser(data);
        await this.cacheOtp(`$verify_email.${data.email}`, this.generatedOtp);
        await this.sendOtpMail('verifyEmail', data.email, this.generatedOtp);
        return { email: data.email };
    }
}
exports.default = CreateUserService;
