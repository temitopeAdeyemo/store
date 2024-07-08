import IGetAppFilterDTO, { FilterOptions, IGetAppData } from '../dtos/IGetAppFilterDTO';
import ApplicationBaseService, { IBaseService } from './BaseService';

type execFor = 'get_many' | 'get_one';
type getApp = IGetAppFilterDTO | IGetAppFilterDTO[] | null;

class GetApplicationService extends ApplicationBaseService implements IBaseService {
  async execute(searchFilter: IGetAppFilterDTO, executeFor: execFor, filterOptions?: FilterOptions): Promise<getApp> {
    switch (executeFor) {
      case 'get_many':
        return await this.fetchApplications({ searchFilter, filterOptions });
      case 'get_one':
        return await this.fetchApplication(searchFilter);
    }
  }
}

export default GetApplicationService;
