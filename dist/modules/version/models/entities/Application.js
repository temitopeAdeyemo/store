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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Application = class Application {
    async addVersion() {
        if (this.application_versions.length < 1) {
            this.application_versions = [this.version];
        }
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ primary: true, unique: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Application.prototype, "application_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Application.prototype, "application_file", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Application.prototype, "package_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Application.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Application.prototype, "screenshots", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 500 }),
    __metadata("design:type", String)
], Application.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Application.prototype, "build_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Application.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, default: [] }),
    __metadata("design:type", Array)
], Application.prototype, "application_versions", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Application.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Application.prototype, "file_extension", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Application.prototype, "compatible_model_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Application.prototype, "program_file_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Application.prototype, "program_file_version", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 'INACTIVE', enum: ['INACTIVE', 'ACTIVE'] }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Application.prototype, "md5_encoding", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Application.prototype, "file_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Application.prototype, "shareToSubOrganization", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Application.prototype, "addVersion", null);
Application = __decorate([
    (0, typeorm_1.Entity)()
], Application);
exports.default = Application;
