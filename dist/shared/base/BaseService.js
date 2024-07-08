"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const uuid = __importStar(require("uuid"));
const DbRepoHelper_1 = __importDefault(require("../Helpers/DbRepoHelper"));
const EmailSmsHelper_1 = __importDefault(require("../Helpers/EmailSmsHelper"));
const OtpHelper_1 = __importDefault(require("../Helpers/OtpHelper"));
const PasswordHelpers_1 = __importDefault(require("../Helpers/PasswordHelpers"));
const ExtraHelpers_1 = __importDefault(require("../Helpers/ExtraHelpers"));
const FsHelper_1 = __importDefault(require("../../shared/Helpers/FsHelper"));
// import UserRepository from '../../modules/user/models/repositories/UserRepository';
const JWT_1 = __importDefault(require("../services/JWT"));
const path_1 = __importDefault(require("path"));
class BaseService {
    constructor() {
        // protected readonly dbRepoHelper = new DbRepoHelper(); //user
        // private readonly emailSmsHelper = new EmailSmsHelper();
        // private readonly otpHelper = new OtpHelper();
        // private readonly passwordHelpers = new PasswordHelpers();
        // private readonly extraHelpers = new ExtraHelpers();
        this.jwtClient = new JWT_1.default();
        this.applicationFolder = path_1.default.join(__dirname, '../public/uploads/application_files/');
        /**
         * This property returns a generated otp
         */
        this.generateOTP = (0, utils_1.generateOTP)();
        /**
         * This property returns a generated uuid number
         */
        this.uuid = uuid.v4();
        /**
         * This property creates a user when called.
         */
        this.createUser = DbRepoHelper_1.default.createUser_.bind(DbRepoHelper_1.default);
        // protected updateAccInfo = this.dbRepoHelper.updateAccInfo_;
        this.throwCredTaken = DbRepoHelper_1.default.credentialTaken_.bind(DbRepoHelper_1.default);
        this.getUser = DbRepoHelper_1.default.getUser_.bind(DbRepoHelper_1.default);
        this.sendOtpMail = EmailSmsHelper_1.default.sendOtpMail_.bind(EmailSmsHelper_1.default);
        this.hashPassword = PasswordHelpers_1.default.hashPassword_.bind(PasswordHelpers_1.default);
        this.checkPassword = PasswordHelpers_1.default.checkPassword_.bind(PasswordHelpers_1.default);
        this.cacheOtp = OtpHelper_1.default.cacheOtp_.bind(OtpHelper_1.default);
        this.generatedOtp = this.generateOTP;
        // protected sendOtpSms = emailSmsHelper.sendOtpSms_.bind(emailSmsHelper);
        this.returnNumberOREmail = ExtraHelpers_1.default.returnNumberOREmail_.bind(ExtraHelpers_1.default);
        // protected sendOtpEmailOrSms = emailSmsHelper.sendOtpEmailOrSms_.bind(emailSmsHelper);
        this.getUserByPhoneOREmail = DbRepoHelper_1.default.getUserByPhoneOREmail_.bind(DbRepoHelper_1.default);
        this.throwCredVerified = ExtraHelpers_1.default.checkCredentialNotVerified_.bind(ExtraHelpers_1.default);
        this.throwCredNotVerified = ExtraHelpers_1.default.checkCredentialVerified_.bind(ExtraHelpers_1.default);
        this.getAndValidateOtp = OtpHelper_1.default.getAndValidateOtp_.bind(OtpHelper_1.default);
        this.updateUser = DbRepoHelper_1.default.updateUser_.bind(DbRepoHelper_1.default);
        this.hashAndUpdatePassword = PasswordHelpers_1.default.hashAndUpdatePassword_.bind(PasswordHelpers_1.default);
        this.deleteCachedOtp = OtpHelper_1.default.deleteCachedOtp_.bind(OtpHelper_1.default);
        this.getCachedOtp = OtpHelper_1.default.getCachedOtp_.bind(OtpHelper_1.default);
        // protected throwPackageNameExists = dbRepoHelper.throwPackageExists_.bind(dbRepoHelper);
    }
    async createDirIfNotExist(path) {
        await FsHelper_1.default.createDirIfNotExist_(`${this.applicationFolder}/${path}`);
    }
}
exports.default = BaseService;
