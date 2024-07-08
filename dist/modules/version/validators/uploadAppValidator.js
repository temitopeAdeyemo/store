"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
exports.default = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required(),
        package_name: celebrate_1.Joi.string().required(),
        icon: celebrate_1.Joi.string().required(),
        screenshots: celebrate_1.Joi.string()
            .required(),
        build_number: celebrate_1.Joi.string().required(),
        version: celebrate_1.Joi.string().required(),
        device: celebrate_1.Joi.string().required(),
        file_extension: celebrate_1.Joi.string().required(),
        model_name: celebrate_1.Joi.string().required(),
        program_file_name: celebrate_1.Joi.string(),
        program_file_version: celebrate_1.Joi.string(),
        application_file: celebrate_1.Joi.string().required(),
    }),
});
