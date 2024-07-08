import path from 'path';
import BaseService from '../../../shared/base/BaseService';
import dbRepoHelper from '../../../shared/Helpers/DbRepoHelper';
import ICreateAppDTO from '../dtos/ICreateAppDTO';
import fileSys from '../../../shared/Helpers/FsHelper';
import IGetAppFilterDTO, { IGetAppData } from '../dtos/IGetAppFilterDTO';
import IApplicationDTO from '../dtos/IApplicationDTO';
import AppError from '@shared/utils/AppError';
import CreateVersionService from '../../../modules/version/services/CreateVersionService';

export type IBaseResponse = null | void | object;

export interface IBaseService {
  execute: (args: any, args2?: any) => Promise<IBaseResponse>;
}

export default abstract class ApplicationBaseService extends BaseService {
  protected readonly createVersionService = new CreateVersionService();

  protected readonly applicationFolder = path.join(__dirname, '../../../../public/uploads/application_files');

  protected saveAppDetails(data: ICreateAppDTO) {
    return dbRepoHelper.createApplication_(data);
  }

  // protected async createVersion(data: ICreateAppDTO) {
  //   await this.createVersionService.execute(data);
  // }

  protected throwDuplicateAppName(appName: string): Promise<void> {
    return dbRepoHelper.throwDuplicateAppName_(appName);
  }

  protected uploadAppIcon(applicationFile: any, package_name: string, type: 'icon') {
    return fileSys.uploadFile_(applicationFile, `${this.applicationFolder}/${package_name}/${type}`);
  }

  protected throwDuplicatePackageName(package_name: string) {
    return dbRepoHelper.throwDuplicatePackageOrBuild_('package_name', package_name);
  }

  protected throwDuplicateBuildNum(build_number: string) {
    return dbRepoHelper.throwDuplicatePackageOrBuild_('build_number', build_number);
  }

  // protected throwDuplicateVersion(package_name: string, version: string) {
  //   return dbRepoHelper.throwDuplicateVersion_(package_name, version);
  // }

  protected getApp(data: IGetAppFilterDTO) {
    return dbRepoHelper.throwAppNotFound(data);
  }

  protected getAppJoinLtVersion(appName: string, device?: string) {
    return dbRepoHelper.getAppJoinLtVersion(appName, device);
  }

  protected fetchApplications(data: IGetAppData): Promise<IGetAppFilterDTO[]> {
    return dbRepoHelper.getAppsByAppData(data);
  }

  protected fetchApplication(data: IGetAppFilterDTO): Promise<IGetAppFilterDTO | null> {
    // return dbRepoHelper.getAppByAppData(data);
    return dbRepoHelper.getAppJoinVersions(data)
  }

  protected throwNotActive(application: IApplicationDTO) {
    return dbRepoHelper.throwNotActive_(application);
  }

  // protected throwVersionNotFound(application: IApplicationDTO, version: string) {
  //   return dbRepoHelper.versionNotFound_(application, version);
  // }

  // async updateAppVersion(version: string, appName: string) {
  //   // return this.updateAppVersion;
  // };
}
