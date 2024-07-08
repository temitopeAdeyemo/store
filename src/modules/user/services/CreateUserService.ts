import ICreateUserDTO from '../dtos/ICreateEntityDTO';
import BaseService, { IBaseService } from '../../../shared/base/BaseService';
class CreateUserService extends BaseService implements IBaseService {
  async execute(data: ICreateUserDTO): Promise<object> {
    await this.throwCredTaken('email', data.email);

    data.password = await this.hashPassword(data.password);

    await this.createUser(data);

    await this.cacheOtp(`$verify_email.${data.email}`, this.generatedOtp);

    await this.sendOtpMail('verifyEmail', data.email, this.generatedOtp);

    return { email: data.email };
  }
}

export default CreateUserService;
