import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { GetAppService } from '../services';
import {IGetAppQueryDTO} from '../dtos/IGetAppFilterDTO';

class GetApp {
  async get(req: Request<{}, {}, {}, IGetAppQueryDTO | any>, res: Response, next: NextFunction) {
    const { application_name, device } = req.query;

    const response = await new GetAppService().execute(
      {
        application_name,
        device,
      },
      'get_one'
    );

    const successResponse = jsonResponse.build(201, 'User created successfully', response);

    next(successResponse);
  }
}

export default new GetApp();
