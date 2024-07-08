import AppError from "../../shared/utils/AppError";
import EmailService from "../../shared/services/EmailService";
// import SmsService from "../../shared/services/SendSMS";

class EmailSmsHelper {
  private readonly emailService = new EmailService();

  // private smsService = new SmsService();

  async sendOtpMail_(
    type: "passReset" | "verifyEmail" | "pinReset",
    email: string,
    otp: string
  ) {
    let option: any = {};
    option[type] = true;

    if (email) await this.emailService.sendOTP([email], otp, option);
  }

}

export default new EmailSmsHelper();
