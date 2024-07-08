"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = require("../../../shared/utils/AppSuccess");
const services_1 = require("../services");
class GetApp {
    async get(req, res, next) {
        const { application_name, device } = req.query;
        const response = await new services_1.GetAppService().execute({
            application_name,
            device,
        }, 'get_one');
        const successResponse = AppSuccess_1.jsonResponse.build(201, 'User created successfully', response);
        next(successResponse);
    }
}
exports.default = new GetApp();
