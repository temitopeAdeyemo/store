"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1684982082997 = void 0;
class Migrations1684982082997 {
    constructor() {
        this.name = 'Migrations1684982082997';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "application_name" character varying NOT NULL, "application_file" character varying NOT NULL, "package_name" character varying NOT NULL, "icon" character varying NOT NULL, "screenshots" character varying NOT NULL, "description" character varying(500) NOT NULL, "build_number" character varying NOT NULL, "version" character varying NOT NULL, "device" character varying NOT NULL, "file_extension" character varying NOT NULL, "model_name" character varying NOT NULL, "program_file_name" character varying NOT NULL, "program_file_version" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'INACTIVE', "md5_encoding" character varying NOT NULL, "file_url" character varying NOT NULL, "shareToSubOrganization" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_569e0c3e863ebdf5f2408ee1670" UNIQUE ("id"), CONSTRAINT "UQ_78ffdfe953e8d9a11245f561791" UNIQUE ("icon"), CONSTRAINT "UQ_8cf09ae4d9e012270597e238d32" UNIQUE ("screenshots"), CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "entity_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "role" character varying DEFAULT 'USER', "first_name" character varying, "last_name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "application"`);
    }
}
exports.Migrations1684982082997 = Migrations1684982082997;
