import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { CreateUserService } from '../services';

class CreateApp {
  async upload(req: Request, res: Response, next: NextFunction) {
    const {
      application_name,
      package_name,
      build_number,
      file_extension,
      version_no,
      compatible_model_names,
      version_name,
      description,
    } = req.body;

    const files: any = req.files;

    // files.application_file.mv(__dirname + '/uploads/application_files/mm.jpeg', (err: any) => {
    //   if (err) throw Error('Application file not Sucessfully uploaded ' + err);
    // });

    const response = await new CreateUserService().execute({
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

    const successResponse = jsonResponse.build(201, 'User created successfully', response);

    next(successResponse);
  }
}

export default new CreateApp();
