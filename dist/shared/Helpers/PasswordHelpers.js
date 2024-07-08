"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bcrypt_1 = __importDefault(require("../../shared/services/Bcrypt"));
const AppError_1 = __importDefault(require("../../shared/utils/AppError"));
const DbRepoHelper_1 = __importDefault(require("./DbRepoHelper"));
class PasswordHelper {
    constructor() {
        // protected readonly dbHelper = new DbRepoHelper();
        this.bcrypt = new Bcrypt_1.default();
    }
    async hashPassword_(Password) {
        return await this.bcrypt.hash(Password);
    }
    async checkPassword_(password, hash) {
        const passwordMatch = await this.bcrypt.compare(password, hash);
        if (!passwordMatch) {
            throw new AppError_1.default("Invalid Credentials.", 401);
        }
    }
    async hashAndUpdatePassword_(newPassword, user) {
        if (!user) {
            throw new AppError_1.default("User not found", 401);
        }
        newPassword = await this.hashPassword_(newPassword);
        return await DbRepoHelper_1.default.updateUser_(user, { password: newPassword });
    }
}
exports.default = new PasswordHelper();
