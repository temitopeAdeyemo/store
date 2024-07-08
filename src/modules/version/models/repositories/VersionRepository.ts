import { Repository } from 'typeorm';
import Version from '../entities/Version';
import ICreateVersionDTO from '../../dtos/ICreateVersionDTO';
import appDataSource from '../../../../config/database.config';
// import IApplicationDTO from '../../dtos/IApplicationDTO';
// import IGetAppFilterDTO, { IGetAppData } from '@modules/application/dtos/IGetAppFilterDTO';
import IGetVersionFilterDTO, { IGetVersionData } from '../../dtos/IGetVersionFilterDTO';
import IVersionDTO from '@modules/version/dtos/IVersionDTO';
export type getVersionFilterType = 'build_number' | 'package_name' | 'version_no';

class VersionRepository {
  private ormRepository: Repository<Version>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(Version);
  }

  async findByPackageName(package_name: string): Promise<Version | undefined> {
    const user = await this.ormRepository.findOne({
      where: { package_name },
    });

    return user || undefined;
  }

  async findById(id: string, application_name?: string): Promise<Version | null> {
    const filter: any = { id };
    application_name ? (filter.application_name = application_name) : null;
    console.log(filter);
    return await this.findOneExecuter({ id });
  }

  async create(data: ICreateVersionDTO): Promise<Version> {
    const application = this.ormRepository.create(data);

    await this.ormRepository.save(application);

    return application;
  }

  async findOneBy(
    searchWith: 'build_number' | 'package_name' | 'version_no',
    value: string,
    appName?: string
  ): Promise<Version | null> {
    const data: { build_number?: string; package_name?: string; version_no?: string; application_name?: string } = {};
    data[searchWith] = value;

    appName ? (data['application_name'] = appName) : null;
    return await this.findOneExecuter(data);
  }

  async findOneByAppData(data: IGetVersionFilterDTO): Promise<Version | null> {
    return await this.findOneExecuter(data);
  }

  private async findOneExecuter(data: IGetVersionFilterDTO): Promise<Version | null> {
    const application = await this.ormRepository.findOne({
      where: data,
      select: [
        'id',
        // 'application_name',
        'package_name',
        // 'icon',
        'screenshots',
        'build_number',
        // 'version',
        // 'device',
        'file_extension',
        'compatible_model_names',
        // 'program_file_name',
        // 'program_file_version',
        'created_at',
        // 'updated_at',
      ],
    });

    return application || null;
  }

  async findAll(data: IGetVersionData): Promise<Version[]> {
    const page = data.filterOptions?.page ? Number(data.filterOptions.page) : 1;
    const limit = data.filterOptions?.limit ? Number(data.filterOptions.limit) : 10;

    const application = await this.ormRepository.find({
      where: data.searchFilter,
      select: [
        'id',
        // 'application_name',
        'package_name',
        // 'icon',
        'screenshots',
        'build_number',
        // 'version',
        // 'device',
        'file_extension',
        'compatible_model_names',
        // 'program_file_name',
        // 'program_file_version',
        'created_at',
        'updated_at',
      ],
      order: {
        created_at: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return application;
  }

  async save(versionData: IVersionDTO): Promise<Version> {
    return this.ormRepository.save(versionData);
  }

  async findActive(application_name: string): Promise<IVersionDTO | null> {
    const application = await this.ormRepository.findOneBy({
      latest: true,
    });
    return application;
  }
}

export default VersionRepository;
