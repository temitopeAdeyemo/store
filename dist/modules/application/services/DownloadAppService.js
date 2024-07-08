"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
class GetLatestAppService extends BaseService_1.default {
    async execute(data) {
        const application = await this.getAppJoinLtVersion(data.application_name, data.device);
        this.throwNotActive(application);
        return { package_name: data.application_name };
        // increase file download number
        // Do res.download() or res.send()
    }
}
exports.default = GetLatestAppService;
