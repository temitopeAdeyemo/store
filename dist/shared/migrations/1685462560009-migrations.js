"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1685462560009 = void 0;
class Migrations1685462560009 {
    constructor() {
        this.name = 'Migrations1685462560009';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "UQ_569e0c3e863ebdf5f2408ee1670" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "version" ADD CONSTRAINT "UQ_4fb5fbb15a43da9f35493107b1d" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "version" ALTER COLUMN "download_no" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "version" ALTER COLUMN "download_no" SET DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "version" ALTER COLUMN "download_no" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "version" ALTER COLUMN "download_no" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "version" DROP CONSTRAINT "UQ_4fb5fbb15a43da9f35493107b1d"`);
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "UQ_569e0c3e863ebdf5f2408ee1670"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_cace4a159ff9f2512dd42373760"`);
    }
}
exports.Migrations1685462560009 = Migrations1685462560009;
