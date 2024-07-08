"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../entities/User"));
const database_config_1 = __importDefault(require("../../../../config/database.config"));
class UserRepository {
    constructor() {
        this.ormRepository = database_config_1.default.getRepository(User_1.default);
    }
    async findByEmail(email) {
        const user = await this.ormRepository.findOne({
            where: { email },
        });
        return user || undefined;
    }
    async findByPhoneOrEmail(data, value) {
        let user;
        const query = {};
        query[data] = value;
        user = await this.ormRepository.findOne({
            where: query,
        });
        return user || undefined;
    }
    async findById(id) {
        const user = await this.ormRepository.findOne({
            where: { id },
        });
        return user || undefined;
    }
    async create(data) {
        const user = this.ormRepository.create(data);
        await this.ormRepository.save(user);
        return user;
    }
    async findOne(data) {
        const user = await this.ormRepository.findOne({
            where: data,
            select: ['id', 'first_name', 'last_name', 'email', 'created_at', 'updated_at'],
        });
        return user || undefined;
    }
    async save(user) {
        return this.ormRepository.save(user);
    }
    async update() { }
}
exports.default = UserRepository;
