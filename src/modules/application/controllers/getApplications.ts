import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { GetAppService } from '../services';
import { IGetAppsQueryDTO } from '../dtos/IGetAppFilterDTO';

class GetApp {
  async upload(req: Request<{}, {}, {}, IGetAppsQueryDTO>, res: Response, next: NextFunction) {
    const { application_name, device, id, page, limit } = req.query;

    const response = await new GetAppService().execute(
      {
        application_name,
        device,
        id,
      },
      'get_many',
      {
        page,
        limit,
      }
    );

    const successResponse = jsonResponse.build(201, 'User created successfully', response);

    next(successResponse);
  }
}

export default new GetApp();
