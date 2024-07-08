"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const BaseService_1 = __importDefault(require("../../../shared/base/BaseService"));
const DbRepoHelper_1 = __importDefault(require("../../../shared/Helpers/DbRepoHelper"));
const FsHelper_1 = __importDefault(require("../../../shared/Helpers/FsHelper"));
class ApplicationBaseService extends BaseService_1.default {
    constructor() {
        super(...arguments);
        this.applicationFolder = path_1.default.join(__dirname, '../../../../public/uploads/application_files');
    }
    async throwPackageNameExists(packageName) {
        return DbRepoHelper_1.default.throwPackageExists_(packageName);
    }
    saveAppDetails(data) {
        return DbRepoHelper_1.default.createVersion_(data);
    }
    throwDuplicatePackageName(package_name) {
        return DbRepoHelper_1.default.throwDuplicatePackageOrBuild_('package_name', package_name);
    }
    throwDuplicateBuildNum(build_number) {
        return DbRepoHelper_1.default.throwDuplicatePackageOrBuild_('build_number', build_number);
    }
    throwDuplicateVersion(package_name, version) {
        return DbRepoHelper_1.default.throwDuplicateVersionNo_('version_no', version);
    }
    throwVersionExist(appName, version) {
        return DbRepoHelper_1.default.throwVersionExist_(appName, version);
    }
    throwAppNotFound(data) {
        return DbRepoHelper_1.default.throwAppNotFound(data);
    }
    fetchVersions(data) {
        return DbRepoHelper_1.default.getVersionsByVersionData(data);
    }
    fetchVersion(data) {
        return DbRepoHelper_1.default.getVersionByVersionData(data);
    }
    throwVersionNotFound(appName, versionNo) {
        return DbRepoHelper_1.default.throwVersionNotFound_(appName, versionNo);
    }
    throwNotActive(appName) {
        return DbRepoHelper_1.default.throwVersionNotActive_(appName);
    }
    checkDirExists(appName) {
        return FsHelper_1.default.dirExists_(`${this.applicationFolder}/${appName}`);
    }
    async unsetLatest(appName) {
        return await DbRepoHelper_1.default.unsetLatest_(appName);
    }
    setVersionData(data) {
        this.versionData = data;
        return;
    }
    setScreenshotUrl(screenshotsUrl) {
        this.versionData.screenshots = screenshotsUrl;
        return;
    }
    setFileUrl(fileUrl) {
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
    async throwDuplicateFileUpload(file_name, appName) {
        await FsHelper_1.default.throwFileExists(`${this.applicationFolder}/${appName}/file/${file_name.replace(/\s+/g, '-')}`);
        return;
    }
    async uploadFile(file, package_name, type) {
        if (type === 'screenshots')
            return FsHelper_1.default.uploadFile_(file, `${this.applicationFolder}/${package_name}/${type}`);
        if (type === 'file')
            return FsHelper_1.default.uploadFile_(file, `${this.applicationFolder}/${package_name}/${type}`);
        if (type === 'icon')
            return FsHelper_1.default.uploadFile_(file, `${this.applicationFolder}/${package_name}/${type}`);
    }
}
exports.default = ApplicationBaseService;
