"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(require("../../../application/models/entities/Application"));
const typeorm_1 = require("typeorm");
let Version = class Version {
};
__decorate([
    (0, typeorm_1.Column)({ primary: true, unique: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Version.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Version.prototype, "version_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Version.prototype, "md5_encoding", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Version.prototype, "package_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: true }),
    __metadata("design:type", Boolean)
], Version.prototype, "latest", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Version.prototype, "screenshots", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 500 }),
    __metadata("design:type", String)
], Version.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Version.prototype, "build_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Version.prototype, "version_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, default: [] }),
    __metadata("design:type", Array)
], Version.prototype, "compatible_model_names", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '0' }),
    __metadata("design:type", String)
], Version.prototype, "download_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Version.prototype, "file_extension", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, typeorm_1.ManyToOne)(() => Application_1.default, (application) => application.versions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'application', referencedColumnName: 'application_name' }),
    __metadata("design:type", String)
], Version.prototype, "application_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Version.prototype, "file_url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Version.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Version.prototype, "updated_at", void 0);
Version = __decorate([
    (0, typeorm_1.Entity)()
], Version);
exports.default = Version;
