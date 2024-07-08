"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
exports.default = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        application_name: celebrate_1.Joi.string().required(),
        // package_name: Joi.string().required(), //starts with com.
        icon: celebrate_1.Joi.string().required(),
        // screenshots: Joi.string()
        // .required(),
        description: celebrate_1.Joi.string().required(),
        // version: Joi.string().required(),
        device: celebrate_1.Joi.string().required(),
        // file_extension: Joi.string().required(),
        // model_name: Joi.string().required(),
        program_file_name: celebrate_1.Joi.string(),
        program_file_version: celebrate_1.Joi.string(),
        application_file: celebrate_1.Joi.string().required(),
    }),
});
