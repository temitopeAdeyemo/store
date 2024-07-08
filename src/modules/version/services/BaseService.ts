import path from 'path';
import BaseService from '../../../shared/base/BaseService';
import dbRepoHelper from '../../../shared/Helpers/DbRepoHelper';
import ICreateVersionDTO from '../dtos/ICreateVersionDTO';
import fileSys from '../../../shared/Helpers/FsHelper';
import IGetVersionFilterDTO, { IGetVersionData } from '../dtos/IGetVersionFilterDTO';
import IApplicationDTO from '../dtos/IVersionDTO';
import AppError from '@shared/utils/AppError';
import IVersionDTO from '../dtos/IVersionDTO';

export type IBaseResponse = null | void | object;

export interface IBaseService {
  execute: (args: any, args2?: any) => Promise<IBaseResponse>;
}

export default abstract class ApplicationBaseService extends BaseService {
  protected versionData: ICreateVersionDTO;

  protected readonly applicationFolder = path.join(__dirname, '../../../../public/uploads/application_files');

  protected async throwPackageNameExists(packageName: string): Promise<void> {
    return dbRepoHelper.throwPackageExists_(packageName);
  }

  protected saveAppDetails(data: ICreateVersionDTO) {
    return dbRepoHelper.createVersion_(data);
  }

  protected throwDuplicatePackageName(package_name: string) {
    return dbRepoHelper.throwDuplicatePackageOrBuild_('package_name', package_name);
  }

  protected throwDuplicateBuildNum(build_number: string) {
    return dbRepoHelper.throwDuplicatePackageOrBuild_('build_number', build_number);
  }

  protected throwDuplicateVersion(package_name: string, version: string) {
    return dbRepoHelper.throwDuplicateVersionNo_('version_no', version);
  }

  protected throwVersionExist(appName: string, version: string) {
    return dbRepoHelper.throwVersionExist_(appName, version);
  }

  protected throwAppNotFound(data: IGetVersionFilterDTO) {
    return dbRepoHelper.throwAppNotFound(data);
  }

  protected fetchVersions(data: IGetVersionData): Promise<IGetVersionFilterDTO[]> {
    return dbRepoHelper.getVersionsByVersionData(data);
  }

  protected fetchVersion(data: IGetVersionFilterDTO): Promise<IGetVersionFilterDTO> {
    return dbRepoHelper.getVersionByVersionData(data);
  }

  protected throwVersionNotFound(appName: string, versionNo: string) {
    return dbRepoHelper.throwVersionNotFound_(appName, versionNo);
  }

  protected throwNotActive(appName: string) {
    return dbRepoHelper.throwVersionNotActive_(appName);
  }

  protected checkDirExists(appName: string) {
    return fileSys.dirExists_(`${this.applicationFolder}/${appName}`);
  }

  protected async unsetLatest(appName: string) {
    return await dbRepoHelper.unsetLatest_(appName);
  }

  setVersionData(data: ICreateVersionDTO) {
    this.versionData = data;
    return;
  }

  setScreenshotUrl(screenshotsUrl: string) {
    this.versionData.screenshots = screenshotsUrl;
    return;
  }

  setFileUrl(fileUrl: string) {
    this.versionData.file_url = fileUrl;
    return;
  }

  setMd5Encoding() {
    this.versionData.md5_encoding = this.versionData.application_file.md5;
    return;
  }

  setFileExtension() {
    const splittedFileName = this.versionData.application_file.name.split('.');
    const lastIndex = splittedFileName.length - 1;
    this.versionData.file_extension = splittedFileName[lastIndex];
    return;
  }

  async throwDuplicateFileUpload(file_name: string, appName: string) {
    await fileSys.throwFileExists(`${this.applicationFolder}/${appName}/file/${file_name.replace(/\s+/g, '-')}`);
    return;
  }

  protected async uploadFile(file: any, package_name: string, type: 'file' | 'screenshots' | 'icon') {
    if (type === 'screenshots') return fileSys.uploadFile_(file, `${this.applicationFolder}/${package_name}/${type}`);
    if (type === 'file') return fileSys.uploadFile_(file, `${this.applicationFolder}/${package_name}/${type}`);
    if (type === 'icon') return fileSys.uploadFile_(file, `${this.applicationFolder}/${package_name}/${type}`);
  }
}
