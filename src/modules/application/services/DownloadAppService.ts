import IDownloadDTO from '../dtos/IDownloadDTO';
import IGetAppFilterDTO, { IGetAppData } from '../dtos/IGetAppFilterDTO';
import ApplicationBaseService, { IBaseService } from './BaseService';

type getApp = IGetAppFilterDTO | IGetAppFilterDTO[] | null;

class GetLatestAppService extends ApplicationBaseService implements IBaseService {
  async execute(data: IDownloadDTO): Promise<object> {
    const application = await this.getAppJoinLtVersion(data.application_name, data.device);

    this.throwNotActive(application);

    return { package_name: data.application_name };

    // increase file download number

    // Do res.download() or res.send()
  }
}

export default GetLatestAppService;
