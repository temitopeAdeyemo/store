"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
class CreateVersionService extends BaseService_1.default {
    async execute(data) {
        // Check if app exist, incase it is an update.
        await this.throwPackageNameExists(data.package_name);
        await this.createDirIfNotExist(`${data.package_name}`);
        // Check against duplicate build number
        await this.throwDuplicateBuildNum(data.build_number);
        await this.throwDuplicateFileUpload(data.application_file.name, data.application_name);
        // Check if folder exist, folder with the app_name
        await this.checkDirExists(data.application_name);
        // write to server path, Make sure it overwrites existing file...
        const fileUrl = await this.uploadFile(data.application_file, data.application_name, 'file');
        //Upload screenshot
        const screenshotsUrl = await this.uploadFile(data.screenshots, data.application_name, 'screenshots');
        this.setVersionData(data);
        // data.screenshots = screenshotsUrl;
        this.setScreenshotUrl(screenshotsUrl);
        // data.file_url = fileUrl;
        this.setFileUrl(fileUrl);
        // Update version to latest and prev. latest to latest: false.
        await this.unsetLatest(data.application_name);
        // set app latest version 
        this.setMd5Encoding();
        this.setFileExtension();
        console.log('&&&&&&&&&&&&&&&&&', this.versionData);
        //save to db
        await this.saveAppDetails(this.versionData);
        // return url
        return { path: fileUrl };
    }
}
exports.default = CreateVersionService;
