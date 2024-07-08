"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = require("../../../shared/utils/AppSuccess");
const services_1 = require("../services");
class GetApp {
    async upload(req, res, next) {
        const { package_name, build_number, version_no, id, page, limit, application_name } = req.query;
        const response = await new services_1.GetAppService().execute({
            application_name,
            package_name,
            build_number,
            id,
            version_no,
        }, 'get_many', {
            page,
            limit,
        });
        const successResponse = AppSuccess_1.jsonResponse.build(200, 'User created successfully', response);
        next(successResponse);
    }
}
exports.default = new GetApp();
