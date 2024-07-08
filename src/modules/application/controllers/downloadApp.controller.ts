import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { DownloadAppService } from '../services';
import { IGetAppQueryDTO } from '../dtos/IGetAppFilterDTO';

class DownloadApp {
  async upload(req: Request<{}, {}, {}, IGetAppQueryDTO>, res: Response, next: NextFunction) {
    const { application_name, device } = req.query;

      const response = await new DownloadAppService().execute({
        application_name,
        device,
      });

    const successResponse = jsonResponse.build(201, 'User created successfully', response);

    next(successResponse);
  }
}

export default new DownloadApp();
