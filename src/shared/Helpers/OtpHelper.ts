import AppError from '../utils/AppError';
import cache from '../services/Redis';
import config from '../../config/environments.config';

class OTPHelper {
  private readonly cache = cache;

  cacheOtp_(key: any, otp: string) {
    this.cache.set(key, otp, config.otpExpiresin);

    return key;
  }

  async getAndValidateOtp_(key: any, otp: string) {
    const cachedOtp = await this.cache.get(key);

    if (!cachedOtp) {
      throw new AppError('Invalid otp or otp expired.', 403);
    }

    if (cachedOtp != otp) {
      throw new AppError('Otp do not match.', 403);
    }
  }

  async deleteCachedOtp_(key: any) {
    this.cache.delete(key);
  }

  async getCachedOtp_(key: any) {
    return await this.cache.get(key);
  }
}

export default new OTPHelper();
