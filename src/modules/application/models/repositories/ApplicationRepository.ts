import { Repository } from 'typeorm';
import Application from '../entities/Application';
import ICreateAppDTO from '../../dtos/ICreateAppDTO';
import appDataSource from '../../../../config/database.config';
// import IApplicationDTO from '../../dtos/IApplicationDTO';
import IGetAppFilterDTO, { IGetAppData } from '@modules/application/dtos/IGetAppFilterDTO';

// export type getAppFilterType = 'build_number' | 'package_name';

class ApplicationRepository {
  private ormRepository: Repository<Application>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(Application);
  }

  async findByAppName(application_name: string): Promise<Application | null> {
    const application = await this.ormRepository.findOne({
      where: { application_name },
    });
    console.log('application found from findByAppName', application);
    return application || null;
  }

  async findById(id: string): Promise<Application | null> {
    return await this.findOneExecuter({ id });
  }

  async create(data: ICreateAppDTO): Promise<Application> {
    const application = this.ormRepository.create(data);

    await this.ormRepository.save(application);

    return application;
  }

  async findOneByAppName(data: string): Promise<Application | null> {
    // const data: { build_number?: string; package_name?: string } = {};
    // data[searchWith] = value;

    return await this.findOneExecuter({ application_name: data });
  }

  async getAppPopLtVersion(application_name: string): Promise<Application | null> {
    const application = await this.ormRepository
      .createQueryBuilder('application')
      .innerJoinAndSelect('application.versions', 'version', 'version.latest = :latest', { latest: true })
      .where('application.application_name = :application_name', { application_name })
      .getOne();

    return application;
  }

  // async getAppPopVersions(data: IGetAppFilterDTO): Promise<Application | null> {
  //   this.ormRepository.createQueryBuilder('application');
  //   this.ormRepository.createQueryBuilder.innerJoinAndSelect('application.versions', 'version');
  //       .addSelect('application.application_name')
  //       .where('application.application_name = :application_name', data)
  //       .getOne();

  //   return application;
  // }

  async getAppPopVersions(data: IGetAppFilterDTO): Promise<Application | null> {
    // const selectFields = ['id', 'application_name'];
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~",data)

    const application = await this.ormRepository.findOne({
        join: {
          alias: 'application',
          innerJoinAndSelect: {
            version: 'application.versions',
        },
        },
      where: {latest_version: "1.0"},
      select: ["id", 'device', 'application_name', 'icon', 'versions',  ],
    });
    return application;
  }

  async findOneByAppData(data: IGetAppFilterDTO): Promise<Application | null> {
    return await this.findOneExecuter(data);
  }

  private async findOneExecuter(data: IGetAppFilterDTO): Promise<Application | null> {
    const application = await this.ormRepository.findOne({
      where: data,
      select: [
        'id',
        'application_name',
        // 'package_name',
        'icon',
        // 'screenshots',
        // 'build_number',
        // 'version',
        'device',
        // 'file_extension',
        // 'compatible_model_name',
        'program_file_name',
        'program_file_version',
        'created_at',
        // 'updated_at',
      ],
    });

    return application || null;
  }

  async findAll(data: IGetAppData): Promise<Application[]> {
    const page = data.filterOptions?.page ? Number(data.filterOptions.page) : 1;
    const limit = data.filterOptions?.limit ? Number(data.filterOptions.limit) : 10;

    const application = await this.ormRepository.find({
      where: data.searchFilter,
      select: [
        'id',
        'application_name',
        // 'package_name',
        'icon',
        // 'screenshots',
        // 'build_number',
        // 'version',
        'device',
        // 'file_extension',
        // 'compatible_model_name',
        'program_file_name',
        'program_file_version',
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

  async save(application: ICreateAppDTO): Promise<Application> {
    return this.ormRepository.save(application);
  }

  async update() {}
}

export default ApplicationRepository;
