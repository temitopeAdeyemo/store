import IDownloadDTO from '../dtos/IDownloadDTO';
import IGetAppFilterDTO from '../dtos/IGetVersionFilterDTO';
import ApplicationBaseService, { IBaseService } from './BaseService';

type getApp = IGetAppFilterDTO | IGetAppFilterDTO[] | null;

class GetApplicationService extends ApplicationBaseService implements IBaseService {
  async execute(data: IDownloadDTO): Promise<object> {
    const application = await this.throwAppNotFound({ package_name: data.package_name, application_name: data.application_name });

    this.throwNotActive(data.application_name);

    this.throwVersionNotFound(data.application_name, data.version_no);

    // increase file download number

    return { package_name: data.package_name };

    // Do res.download() or res.send()
  }
}

export default GetApplicationService;
