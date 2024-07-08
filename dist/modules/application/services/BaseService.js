"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const BaseService_1 = __importDefault(require("../../../shared/base/BaseService"));
const DbRepoHelper_1 = __importDefault(require("../../../shared/Helpers/DbRepoHelper"));
const FsHelper_1 = __importDefault(require("../../../shared/Helpers/FsHelper"));
const CreateVersionService_1 = __importDefault(require("../../../modules/version/services/CreateVersionService"));
class ApplicationBaseService extends BaseService_1.default {
    constructor() {
        super(...arguments);
        this.createVersionService = new CreateVersionService_1.default();
        this.applicationFolder = path_1.default.join(__dirname, '../../../../public/uploads/application_files');
        // protected throwVersionNotFound(application: IApplicationDTO, version: string) {
        //   return dbRepoHelper.versionNotFound_(application, version);
        // }
        // async updateAppVersion(version: string, appName: string) {
        //   // return this.updateAppVersion;
        // };
    }
    saveAppDetails(data) {
        return DbRepoHelper_1.default.createApplication_(data);
    }
    // protected async createVersion(data: ICreateAppDTO) {
    //   await this.createVersionService.execute(data);
    // }
    throwDuplicateAppName(appName) {
        return DbRepoHelper_1.default.throwDuplicateAppName_(appName);
    }
    uploadAppIcon(applicationFile, package_name, type) {
        return FsHelper_1.default.uploadFile_(applicationFile, `${this.applicationFolder}/${package_name}/${type}`);
    }
    throwDuplicatePackageName(package_name) {
        return DbRepoHelper_1.default.throwDuplicatePackageOrBuild_('package_name', package_name);
    }
    throwDuplicateBuildNum(build_number) {
        return DbRepoHelper_1.default.throwDuplicatePackageOrBuild_('build_number', build_number);
    }
    // protected throwDuplicateVersion(package_name: string, version: string) {
    //   return dbRepoHelper.throwDuplicateVersion_(package_name, version);
    // }
    getApp(data) {
        return DbRepoHelper_1.default.throwAppNotFound(data);
    }
    getAppJoinLtVersion(appName, device) {
        return DbRepoHelper_1.default.getAppJoinLtVersion(appName, device);
    }
    fetchApplications(data) {
        return DbRepoHelper_1.default.getAppsByAppData(data);
    }
    fetchApplication(data) {
        // return dbRepoHelper.getAppByAppData(data);
        return DbRepoHelper_1.default.getAppJoinVersions(data);
    }
    throwNotActive(application) {
        return DbRepoHelper_1.default.throwNotActive_(application);
    }
}
exports.default = ApplicationBaseService;
