"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const UserRepository_1 = __importDefault(require("../../modules/user/models/repositories/UserRepository"));
const ApplicationRepository_1 = __importDefault(require("../../modules/application/models/repositories/ApplicationRepository"));
const VersionRepository_1 = __importDefault(require("../../modules/version/models/repositories/VersionRepository"));
class DbRepoHelper {
    constructor() {
        this.userRepository = new UserRepository_1.default();
        this.applicationRepository = new ApplicationRepository_1.default();
        this.versionRepository = new VersionRepository_1.default();
    }
    async createUser_(data) {
        await this.userRepository.create(data);
    }
    async credentialTaken_(credential, value) {
        const userExists = await this.userRepository.findByPhoneOrEmail(credential, value);
        console.log(888888, userExists);
        if (userExists) {
            throw new AppError_1.default(`${credential} taken.`, 400);
        }
    }
    async getUser_(credential, value) {
        const user = await this.userRepository.findByPhoneOrEmail(credential, value);
        if (!user) {
            throw new AppError_1.default(`Invalid Credentials.`, 401);
        }
        return user;
    }
    getUserByPhoneOREmail_(email, phone_number) {
        if (email)
            return this.getUser_('email', email);
        else if (phone_number)
            return this.getUser_('phone_number', phone_number);
    }
    async updateUser_(data, user) {
        user = { ...user, ...data };
        await this.userRepository.save(user);
    }
    async throwPackageExists_(packageName) {
        const application = await this.versionRepository.findByPackageName(packageName);
        if (application)
            throw new AppError_1.default(`Package name taken.`, 401);
        return;
    }
    async createApplication_(data) {
        await this.applicationRepository.create(data);
        return;
    }
    async createVersion_(data) {
        await this.versionRepository.create(data);
        return;
    }
    async throwDuplicatePackageOrBuild_(data, dataValue) {
        const application = await this.getVersion_(data, dataValue);
        if (application)
            throw new AppError_1.default(data + ' exist, Please deploy another version.');
        return;
    }
    async getAppByName_(appName) {
        return await this.applicationRepository.findOneByAppName(appName);
    }
    async getVersion_(by, dataValue) {
        return await this.versionRepository.findOneBy(by, dataValue);
    }
    async throwDuplicateVersionNo_(data, dataValue) {
        const version = await this.getVersion_(data, dataValue);
        if (version)
            throw new AppError_1.default('Version exists, Please deploy a new version.');
        return;
    }
    async throwAppNotFound(data) {
        const application = await this.getAppByAppData(data);
        if (!application)
            throw new AppError_1.default('Application not found.', 401);
        return application;
    }
    async getAppJoinLtVersion(applicationName, device) {
        const app = await this.applicationRepository.getAppPopLtVersion(applicationName);
        if (!app || (device && app.device != device))
            throw new AppError_1.default('Application not found.', 401);
        return app;
    }
    async getAppJoinVersions(data) {
        const app = await this.applicationRepository.getAppPopVersions(data);
        if (!app || (data.device && app.device != data.device))
            throw new AppError_1.default('Application not found.', 401);
        return app;
    }
    async getAppByAppData(data) {
        const app = await this.applicationRepository.findOneByAppData(data);
        if (!app)
            throw new AppError_1.default('Application not found.');
        return app;
    }
    async getVersionByVersionData(data) {
        const app = await this.versionRepository.findOneByAppData(data);
        if (!app)
            throw new AppError_1.default('Version not found');
        return app;
    }
    async getAppsByAppData(data) {
        return await this.applicationRepository.findAll({
            searchFilter: data.searchFilter,
            filterOptions: data.filterOptions,
        });
    }
    async getVersionsByVersionData(data) {
        return await this.versionRepository.findAll({
            searchFilter: data.searchFilter,
            filterOptions: data.filterOptions,
        });
    }
    async throwNotActive_(application) {
        if (!application.status)
            throw new AppError_1.default('This application is not available for download.', 401);
        return;
    }
    async throwVersionExist_(appName, versionNo) {
        const application = await this.getAppByName_(appName);
        if (!application)
            throw new AppError_1.default('Application not found.', 401);
        if (application && application.versions.includes(versionNo))
            throw new AppError_1.default('Version Exists.', 401);
        return;
    }
    async throwVersionNotFound_(appName, version) {
        const application = await this.getAppByName_(appName);
        if (!application)
            throw new AppError_1.default('Application not found.', 401);
        if (application && !application.versions.includes(version))
            throw new AppError_1.default('Version not found.', 401);
        return;
    }
    async throwDuplicateAppName_(appName) {
        const application = await this.applicationRepository.findByAppName(appName);
        console.log('application found from throwDuplicateAppName_', application);
        if (application)
            throw new AppError_1.default(`Application name taken.`, 401);
        return;
    }
    async throwVersionNotActive_(appName) {
        const app = await this.getAppByAppData({ application_name: appName });
        if (!app || (app && app.status != 'ACTIVE'))
            throw new AppError_1.default('Application not found or not available.', 401);
        return app;
    }
    async unsetLatest_(application_name) {
        const app = await this.versionRepository.findActive(application_name);
        if (app) {
            app.latest = false;
            await this.versionRepository.save(app);
        }
        return;
    }
}
exports.default = new DbRepoHelper();
