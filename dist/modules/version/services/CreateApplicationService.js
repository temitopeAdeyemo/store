"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
class CreateApplicationService extends BaseService_1.default {
    async execute(data) {
        // Check if app exist, incase it is an update.
        await this.throwPackageNameExists(data.package_name);
        this.createDirIfNotExist(`${data.package_name}`);
        // Check against dublicate package name
        await this.throwDuplicatePackageName(data.package_name);
        // Check against dublicate build number
        await this.throwDuplicateBuildNum(data.build_number);
        // write to server path
        const path = this.uploadFile(data.application_file, data.package_name);
        data.md5_encoding = data.application_file.md5_encoding;
        // Writing file to server path
        data.application_file.mv(__dirname + '/uploads/application_files/mm.jpeg', (err) => {
            if (err)
                throw Error('Application file not Sucessfully uploaded ' + err);
        });
        //save to db
        await this.saveAppDetails(data);
        // return url
        return { path };
    }
}
exports.default = CreateApplicationService;
