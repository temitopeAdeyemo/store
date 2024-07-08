"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = __importDefault(require("../../shared/services/EmailService"));
// import SmsService from "../../shared/services/SendSMS";
class EmailSmsHelper {
    constructor() {
        this.emailService = new EmailService_1.default();
    }
    // private smsService = new SmsService();
    async sendOtpMail_(type, email, otp) {
        let option = {};
        option[type] = true;
        if (email)
            await this.emailService.sendOTP([email], otp, option);
    }
}
exports.default = new EmailSmsHelper();
