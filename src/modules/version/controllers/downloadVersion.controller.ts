import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { DownloadVersionService } from '../services';
import { IGetVersionQueryDTO } from '../dtos/IGetVersionFilterDTO';

class DownloadVersion {
  async upload(req: Request<{}, {}, {}, IGetVersionQueryDTO>, res: Response, next: NextFunction) {
    const { application_name, package_name, version_no, build_number } = req.query;

    const response = await new DownloadVersionService().execute({
      application_name,
      package_name,
      version_no,
      build_number,
    });

    const successResponse = jsonResponse.build(201, 'User created successfully', response);

    next(successResponse);
  }
}

export default new DownloadVersion();
