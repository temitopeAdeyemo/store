"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(require("../entities/Application"));
const database_config_1 = __importDefault(require("../../../../config/database.config"));
// export type getAppFilterType = 'build_number' | 'package_name';
class ApplicationRepository {
    constructor() {
        this.ormRepository = database_config_1.default.getRepository(Application_1.default);
    }
    async findByAppName(application_name) {
        const application = await this.ormRepository.findOne({
            where: { application_name },
        });
        console.log('application found from findByAppName', application);
        return application || null;
    }
    async findById(id) {
        return await this.findOneExecuter({ id });
    }
    async create(data) {
        const application = this.ormRepository.create(data);
        await this.ormRepository.save(application);
        return application;
    }
    async findOneByAppName(data) {
        // const data: { build_number?: string; package_name?: string } = {};
        // data[searchWith] = value;
        return await this.findOneExecuter({ application_name: data });
    }
    async getAppPopLtVersion(application_name) {
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
    async getAppPopVersions(data) {
        // const selectFields = ['id', 'application_name'];
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~", data);
        const application = await this.ormRepository.findOne({
            join: {
                alias: 'application',
                innerJoinAndSelect: {
                    version: 'application.versions',
                },
            },
            where: { latest_version: "1.0" },
            select: ["id", 'device', 'application_name', 'icon', 'versions',],
        });
        return application;
    }
    async findOneByAppData(data) {
        return await this.findOneExecuter(data);
    }
    async findOneExecuter(data) {
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
    async findAll(data) {
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
    async save(application) {
        return this.ormRepository.save(application);
    }
    async update() { }
}
exports.default = ApplicationRepository;
