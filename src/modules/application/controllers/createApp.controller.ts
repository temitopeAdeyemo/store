import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { CreateUserService } from '../services';

class CreateApp {
  async upload(req: Request, res: Response, next: NextFunction) {
    const {
      application_name,
      package_name,
      build_number,
      device,
      file_extension,
      compatible_model_names,
      program_file_name,
      program_file_version,
      description,
      version_name,
      version_no,
      application_file,
    } = req.body;

    const files: any = req.files;

    console.log("1111111111111111111",files.screenshots)

    // files.application_file.mv(__dirname + '/uploads/application_files/mm.jpeg', (err: any) => {
    //   if (err) throw Error('Application file not Sucessfully uploaded ' + err);
    // });

    const response = await new CreateUserService().execute(
      {
        application_name,
        icon: files.icon,
        device,
        program_file_name,
        program_file_version,
        description,
      },
      {application_file: files.application_file,
        version_name,
        version_no,
        application_name,
        package_name,
        screenshots: files.screenshots,
        build_number,
        file_extension,
        compatible_model_names,
        description,
      }
    );

    const successResponse = jsonResponse.build(201, 'User created successfully', response);

    next(successResponse);
  }
}

export default new CreateApp();
