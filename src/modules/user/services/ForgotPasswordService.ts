import IForgotPasswordDTO from '../dtos/IForgotPasswordDTO';
import BaseService, { IBaseService } from '../../../shared/base/BaseService';
class ForgotPasswordService extends BaseService implements IBaseService {
  async execute(data: IForgotPasswordDTO): Promise<object> {
    const user = this.returnNumberOREmail(data.email);

    await this.getUser("email", data.email);

    const otpId = this.cacheOtp(`reset_pass.${user}`, this.generatedOtp);

    this.sendOtpMail('passReset', this.generatedOtp, data.email);

    return { otp_id: otpId };
  }
}

export default ForgotPasswordService;
