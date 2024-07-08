"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = require("../../../shared/utils/AppSuccess");
const services_1 = require("../services");
class GetApp {
    async upload(req, res, next) {
        const { application_name, device, id, page, limit } = req.query;
        const response = await new services_1.GetAppService().execute({
            application_name,
            device,
            id,
        }, 'get_many', {
            page,
            limit,
        });
        const successResponse = AppSuccess_1.jsonResponse.build(201, 'User created successfully', response);
        next(successResponse);
    }
}
exports.default = new GetApp();
