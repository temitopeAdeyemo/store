import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { GetAppService } from '../services';
import { IGetVersionQueryDTO } from '../dtos/IGetVersionFilterDTO';

class GetVersions {
  async upload(req: Request<{}, {}, {}, IGetVersionQueryDTO>, res: Response, next: NextFunction) {
    const { package_name, build_number, version_no, application_name, id } = req.query;

    const response = await new GetAppService().execute(
      {
        package_name,
        build_number,
        application_name,
        version_no,
        id,
      },
      'get_one'
    );

    const successResponse = jsonResponse.build(201, 'User created successfully', response);

    next(successResponse);
  }
}

export default new GetVersions();
