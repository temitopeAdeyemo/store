"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1685445879376 = void 0;
class Migrations1685445879376 {
    constructor() {
        this.name = 'Migrations1685445879376';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "version" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version_name" character varying NOT NULL, "md5_encoding" character varying NOT NULL, "package_name" character varying NOT NULL, "latest" boolean NOT NULL DEFAULT true, "screenshots" character varying, "description" character varying(500) NOT NULL, "build_number" character varying NOT NULL, "version_no" character varying NOT NULL, "compatible_model_names" text array NOT NULL DEFAULT '{}', "download_no" character varying NOT NULL, "file_extension" character varying NOT NULL, "application_name" character varying NOT NULL, "file_url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "application" character varying, CONSTRAINT "UQ_4fb5fbb15a43da9f35493107b1d" UNIQUE ("id"), CONSTRAINT "UQ_f8492c9f4dce5d4a4d77d27483a" UNIQUE ("package_name"), CONSTRAINT "UQ_7d65107878d3f134ed676691110" UNIQUE ("build_number"), CONSTRAINT "UQ_e6e37964c4e7e7125f1c7985395" UNIQUE ("file_url"), CONSTRAINT "PK_4fb5fbb15a43da9f35493107b1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "application_name" character varying NOT NULL, "icon" character varying NOT NULL, "description" character varying(500) NOT NULL, "organization" character varying NOT NULL DEFAULT 'Store', "latest_version" character varying NOT NULL, "device" character varying NOT NULL, "program_file_name" character varying NOT NULL, "program_file_version" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', "shareToSubOrganization" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_569e0c3e863ebdf5f2408ee1670" UNIQUE ("id"), CONSTRAINT "UQ_35a70088180db2d7b27dd5c5b57" UNIQUE ("application_name"), CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "entity_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "role" character varying DEFAULT 'USER', "first_name" character varying, "last_name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "version" ADD CONSTRAINT "FK_a68e7d3de8c1f9b6acea62adf38" FOREIGN KEY ("application") REFERENCES "application"("application_name") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "version" DROP CONSTRAINT "FK_a68e7d3de8c1f9b6acea62adf38"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "application"`);
        await queryRunner.query(`DROP TABLE "version"`);
    }
}
exports.Migrations1685445879376 = Migrations1685445879376;
