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
const fs = __importStar(require("fs"));
const AppError_1 = __importDefault(require("../utils/AppError"));
class FileSys {
    async createDirIfNotExist_(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        return;
    }
    async uploadFile_(file, dir) {
        // file.name = file.name.replace(/\s+/g, '-');
        await this.createDirIfNotExist_(dir);
        if (dir.endsWith('file')) {
            file.name = file.name.replace(/\s+/g, '-');
            file.mv(`${dir}/${file.name}`, (err) => {
                if (err)
                    throw new AppError_1.default('Application file not Sucessfully uploaded', 500);
            });
        }
        if (dir.endsWith('screenshots')) {
            //
            let fileUrls = [];
            file.forEach((i) => {
                i.name = i.name.replace(/\s+/g, '-');
                i.mv(`${dir}/${i.name}`, (err) => {
                    if (err)
                        throw new AppError_1.default('screenshots file not Sucessfully uploaded', 500);
                });
                fileUrls.push(`${dir}/${i.name}`);
            });
            console.log('+++++++++++++++++++++++++++', fileUrls);
            return fileUrls;
        }
        if (dir.endsWith('icon')) {
            file.name = file.name.replace(/\s+/g, '-');
            file.mv(`${dir}/${file.name}`, (err) => {
                if (err)
                    throw new AppError_1.default('icon file not Sucessfully uploaded', 500);
            });
        }
        return `${dir}/${file.name}`;
    }
    async dirExists_(path) {
        return fs.existsSync(path);
    }
    async checkFileExists(path) {
        return fs.existsSync(path);
    }
    async throwFileExists(path) {
        console.log('>!!!!!!!>>>>>>>>>>>>>>>>>>>>>>>>>>>', path);
        if (await this.checkFileExists(path))
            throw new AppError_1.default('File Exists.');
        return;
    }
    async throwFileNotFound(path) {
        if (!(await this.checkFileExists(path)))
            throw new AppError_1.default('File not found.');
        return;
    }
}
const fileSys = new FileSys();
exports.default = fileSys;
