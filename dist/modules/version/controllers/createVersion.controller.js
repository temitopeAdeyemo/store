"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = require("../../../shared/utils/AppSuccess");
const services_1 = require("../services");
class CreateApp {
    async upload(req, res, next) {
        const { application_name, package_name, build_number, file_extension, version_no, compatible_model_names, version_name, description, } = req.body;
        const files = req.files;
        // files.application_file.mv(__dirname + '/uploads/application_files/mm.jpeg', (err: any) => {
        //   if (err) throw Error('Application file not Sucessfully uploaded ' + err);
        // });
        const response = await new services_1.CreateUserService().execute({
            application_file: files.application_file,
            application_name,
            package_name,
            screenshots: files.screenshots,
            build_number,
            version_no,
            file_extension,
            compatible_model_names,
            version_name,
            description,
        });
        const successResponse = AppSuccess_1.jsonResponse.build(201, 'User created successfully', response);
        next(successResponse);
    }
}
exports.default = new CreateApp();
