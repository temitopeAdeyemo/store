"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
class GetApplicationService extends BaseService_1.default {
    async execute(searchFilter, executeFor, filterOptions) {
        switch (executeFor) {
            case 'get_many':
                return await this.fetchVersions({ searchFilter, filterOptions });
            case 'get_one':
                return await this.fetchVersion(searchFilter);
        }
    }
}
exports.default = GetApplicationService;
