"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
class CreateUserService extends BaseService_1.default {
    async execute(data) {
        // Check if app exist, incase it is an update.
        await this.throwPackageNameExists(data.package_name);
        this.createDirIfNotExist(`${data.package_name}/${data}`);
        // write to server path
        this.uploadFile(data.application_file);
        // Check against dublicate version
        //
        //save to db
        const path = await this.createApp(data);
        // return url
        return { path };
    }
}
exports.default = CreateUserService;
