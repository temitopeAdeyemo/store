"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("../../../shared/base/BaseService"));
class ForgotPasswordService extends BaseService_1.default {
    async execute(data) {
        const user = this.returnNumberOREmail(data.email);
        await this.getUser("email", data.email);
        const otpId = this.cacheOtp(`reset_pass.${user}`, this.generatedOtp);
        this.sendOtpMail('passReset', this.generatedOtp, data.email);
        return { otp_id: otpId };
    }
}
exports.default = ForgotPasswordService;
