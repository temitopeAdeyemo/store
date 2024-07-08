"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = require("../../../shared/utils/AppSuccess");
const services_1 = require("../services");
class GetVersions {
    async upload(req, res, next) {
        const { package_name, build_number, version_no, application_name, id } = req.query;
        const response = await new services_1.GetAppService().execute({
            package_name,
            build_number,
            application_name,
            version_no,
            id,
        }, 'get_one');
        const successResponse = AppSuccess_1.jsonResponse.build(201, 'User created successfully', response);
        next(successResponse);
    }
}
exports.default = new GetVersions();
