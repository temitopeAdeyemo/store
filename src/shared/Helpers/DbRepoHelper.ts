import AppError from '../utils/AppError';
import UserRepository from '../../modules/user/models/repositories/UserRepository';
import IGenericUserDTO from '../../modules/user/dtos/IUserDTO';
import ICreateUserDTO from '../../modules/user/dtos/ICreateEntityDTO';
import ApplicationRepository from '../../modules/application/models/repositories/ApplicationRepository';
import ICreateAppDTO from '../../modules/application/dtos/ICreateAppDTO';
import IApplicationDTO from '../../modules/application/dtos/IApplicationDTO';
import { getVersionFilterType } from '../../modules/version/models/repositories/VersionRepository';
import IGetAppFilterDTO, { IGetAppData } from '../../modules/application/dtos/IGetAppFilterDTO';
import VersionRepository from '../../modules/version/models/repositories/VersionRepository';
import ICreateVersionDTO from '../../modules/version/dtos/ICreateVersionDTO';
import IVersionDTO from '../../modules/version/dtos/IVersionDTO';
import IGetVersionFilterDTO, { IGetVersionData } from '../../modules/version/dtos/IGetVersionFilterDTO';

export type CredentialTypes = 'email' | 'phone_number';

class DbRepoHelper {
  protected readonly userRepository = new UserRepository();
  protected readonly applicationRepository = new ApplicationRepository();
  protected readonly versionRepository = new VersionRepository();

  async createUser_(data: ICreateUserDTO) {
    await this.userRepository.create(data);
  }

  async credentialTaken_(credential: CredentialTypes, value: string) {
    const userExists = await this.userRepository.findByPhoneOrEmail(credential, value);
    console.log(888888, userExists);

    if (userExists) {
      throw new AppError(`${credential} taken.`, 400);
    }
  }

  async getUser_(credential: CredentialTypes, value: string) {
    const user = await this.userRepository.findByPhoneOrEmail(credential, value);

    if (!user) {
      throw new AppError(`Invalid Credentials.`, 401);
    }

    return user;
  }

  getUserByPhoneOREmail_(email?: string, phone_number?: string) {
    if (email) return this.getUser_('email', email);
    else if (phone_number) return this.getUser_('phone_number', phone_number);
  }

  async updateUser_(data: IGenericUserDTO, user: IGenericUserDTO) {
    user = { ...user, ...data };
    await this.userRepository.save(user);
  }

  async throwPackageExists_(packageName: string) {
    const application = await this.versionRepository.findByPackageName(packageName);
    if (application) throw new AppError(`Package name taken.`, 401);

    return;
  }

  async createApplication_(data: ICreateAppDTO) {
    await this.applicationRepository.create(data);

    return;
  }

  async createVersion_(data: ICreateVersionDTO) {
    await this.versionRepository.create(data);

    return;
  }

  async throwDuplicatePackageOrBuild_(data: getVersionFilterType, dataValue: string) {
    const application = await this.getVersion_(data, dataValue);
    if (application) throw new AppError(data + ' exist, Please deploy another version.');

    return;
  }

  async getAppByName_(appName: string): Promise<IApplicationDTO | null> {
    return await this.applicationRepository.findOneByAppName(appName);
  }

  async getVersion_(by: getVersionFilterType, dataValue: string): Promise<IVersionDTO | null> {
    return await this.versionRepository.findOneBy(by, dataValue);
  }

  async throwDuplicateVersionNo_(data: getVersionFilterType, dataValue: string) {
    const version = await this.getVersion_(data, dataValue);
    if (version) throw new AppError('Version exists, Please deploy a new version.');

    return;
  }

  async throwAppNotFound(data: IGetAppFilterDTO): Promise<IApplicationDTO> {
    const application = await this.getAppByAppData(data);
    if (!application) throw new AppError('Application not found.', 401);
    return application;
  }

  async getAppJoinLtVersion(applicationName: string, device?: string): Promise<IApplicationDTO> {
    const app = await this.applicationRepository.getAppPopLtVersion(applicationName);

    if (!app || (device && app.device != device)) throw new AppError('Application not found.', 401);

    return app;
  }

  async getAppJoinVersions(data: IGetAppFilterDTO): Promise<IApplicationDTO> {
    const app = await this.applicationRepository.getAppPopVersions(data);

    if (!app || (data.device && app.device != data.device)) throw new AppError('Application not found.', 401);

    return app;
  }

  async getAppByAppData(data: IGetAppFilterDTO): Promise<IApplicationDTO | null> {
    const app = await this.applicationRepository.findOneByAppData(data);
    if (!app) throw new AppError('Application not found.');
    return app;
  }

  async getVersionByVersionData(data: IGetVersionFilterDTO): Promise<IVersionDTO> {
    const app = await this.versionRepository.findOneByAppData(data);
    if (!app) throw new AppError('Version not found');

    return app;
  }

  async getAppsByAppData(data: IGetAppData) {
    return await this.applicationRepository.findAll({
      searchFilter: data.searchFilter,
      filterOptions: data.filterOptions,
    });
  }

  async getVersionsByVersionData(data: IGetVersionData): Promise<IVersionDTO[]> {
    return await this.versionRepository.findAll({
      searchFilter: data.searchFilter,
      filterOptions: data.filterOptions,
    });
  }

  async throwNotActive_(application: IApplicationDTO) {
    if (!application.status) throw new AppError('This application is not available for download.', 401);

    return;
  }

  async throwVersionExist_(appName: string, versionNo: string) {
    const application = await this.getAppByName_(appName);

    if (!application) throw new AppError('Application not found.', 401);

    if (application && application.versions.includes(versionNo)) throw new AppError('Version Exists.', 401);

    return;
  }

  async throwVersionNotFound_(appName: string, version: string) {
    const application = await this.getAppByName_(appName);

    if (!application) throw new AppError('Application not found.', 401);

    if (application && !application.versions.includes(version)) throw new AppError('Version not found.', 401);

    return;
  }

  async throwDuplicateAppName_(appName: string) {
    const application = await this.applicationRepository.findByAppName(appName);
    console.log('application found from throwDuplicateAppName_', application);
    if (application) throw new AppError(`Application name taken.`, 401);

    return;
  }

  async throwVersionNotActive_(appName: string) {
    const app = await this.getAppByAppData({ application_name: appName });

    if (!app || (app && app.status != 'ACTIVE')) throw new AppError('Application not found or not available.', 401);
    return app;
  }

  async unsetLatest_(application_name: string) {
    const app = await this.versionRepository.findActive(application_name);

    if (app) {
      app.latest = false;
      await this.versionRepository.save(app);
    }

    return;
  }
}

export default new DbRepoHelper();
