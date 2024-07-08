import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { GetAppService } from '../services';
import { IGetVersionsQueryDTO } from '../dtos/IGetVersionFilterDTO';

class GetVersion {
  async upload(req: Request<{}, {}, {}, IGetVersionsQueryDTO>, res: Response, next: NextFunction) {
    const { package_name, build_number, version_no, id, page, limit, application_name } = req.query;

    const response = await new GetAppService().execute(
      {
        application_name,
        package_name,
        build_number,
        id,
        version_no,
      },
      'get_many',
      {
        page,
        limit,
      }
    );

    const successResponse = jsonResponse.build(200, 'User created successfully', response);

    next(successResponse);
  }
}

export default new GetVersion();
