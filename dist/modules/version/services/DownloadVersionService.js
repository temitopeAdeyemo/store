"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
class GetApplicationService extends BaseService_1.default {
    async execute(data) {
        const application = await this.throwAppNotFound({ package_name: data.package_name, application_name: data.application_name });
        this.throwNotActive(data.application_name);
        this.throwVersionNotFound(data.application_name, data.version_no);
        // increase file download number
        return { package_name: data.package_name };
        // Do res.download() or res.send()
    }
}
exports.default = GetApplicationService;
