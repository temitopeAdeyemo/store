"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = require("../../../shared/utils/AppSuccess");
const services_1 = require("../services");
class CreateUser {
    async register(req, res, next) {
        const { entity_name, email, password, role, first_name, last_name } = req.body;
        const response = await new services_1.CreateUserService().execute({
            entity_name,
            email,
            password,
            role,
            first_name,
            last_name,
        });
        const successResponse = AppSuccess_1.jsonResponse.build(201, 'User created successfully', response);
        next(successResponse);
    }
}
exports.default = new CreateUser();
