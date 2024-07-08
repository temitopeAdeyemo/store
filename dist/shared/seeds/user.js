"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const environments_config_1 = __importDefault(require("../../config/environments.config"));
const UserRepository_1 = __importDefault(require("../../modules/user/models/repositories/UserRepository"));
const superAdmin = {
    email: environments_config_1.default.defaultUserEmail,
    password: (0, bcryptjs_1.hashSync)(environments_config_1.default.defaultUserPassword, parseInt(environments_config_1.default.saltRounds)),
    first_name: environments_config_1.default.defaultUserFirstName,
    last_name: environments_config_1.default.defaultUserLastName,
    role: 'SUPER ADMIN',
    entity_name: "Store",
};
const runSeedings = async () => {
    try {
        const userRepository = new UserRepository_1.default();
        const user = await userRepository.findByEmail(environments_config_1.default.defaultUserEmail);
        if (!user) {
            await userRepository.create(superAdmin);
            console.log('Super admin created');
        }
    }
    catch (err) {
        console.error('Something went wrong when creating the super admin:\n', err.stack);
    }
};
exports.default = runSeedings;
