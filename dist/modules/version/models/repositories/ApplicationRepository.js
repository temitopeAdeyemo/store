"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(require("../entities/Application"));
const database_config_1 = __importDefault(require("../../../../config/database.config"));
class ApplicationRepository {
    constructor() {
        this.ormRepository = database_config_1.default.getRepository(Application_1.default);
    }
    async findByPackageName(package_name) {
        const user = await this.ormRepository.findOne({
            where: { package_name },
        });
        return user || undefined;
    }
    async findById(id) {
        return await this.findOneExecuter({ id });
    }
    async create(data) {
        const application = this.ormRepository.create(data);
        await this.ormRepository.save(application);
        return application;
    }
    async findOneBy(searchWith, value) {
        const data = {};
        data[searchWith] = value;
        return await this.findOneExecuter(data);
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
                'package_name',
                'icon',
                'screenshots',
                'build_number',
                'version',
                'device',
                'file_extension',
                'compatible_model_name',
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
                'package_name',
                'icon',
                'screenshots',
                'build_number',
                'version',
                'device',
                'file_extension',
                'compatible_model_name',
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
    async save(user) {
        return this.ormRepository.save(user);
    }
    async update() { }
}
exports.default = ApplicationRepository;
