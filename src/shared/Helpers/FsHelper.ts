import * as fs from 'fs';
import AppError from '../utils/AppError';
import { File } from 'buffer';

class FileSys {
  async createDirIfNotExist_(path: string) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    return;
  }

  async uploadFile_(file: any, dir: string): Promise<any> {
    // file.name = file.name.replace(/\s+/g, '-');

    await this.createDirIfNotExist_(dir);

    if (dir.endsWith('file')) {
      file.name = file.name.replace(/\s+/g, '-');
      file.mv(`${dir}/${file.name}`, (err: any) => {
        if (err) throw new AppError('Application file not Sucessfully uploaded', 500);
      });
    }

    if (dir.endsWith('screenshots')) {
      //
      let fileUrls: string[] = [];
      file.forEach((i: any) => {
        i.name = i.name.replace(/\s+/g, '-');

        i.mv(`${dir}/${i.name}`, (err: any) => {
          if (err) throw new AppError('screenshots file not Sucessfully uploaded', 500);
        });
        fileUrls.push(`${dir}/${i.name}`);
      });

      console.log('+++++++++++++++++++++++++++', fileUrls);
      return fileUrls;
    }

    if (dir.endsWith('icon')) {
      file.name = file.name.replace(/\s+/g, '-');
      file.mv(`${dir}/${file.name}`, (err: any) => {
        if (err) throw new AppError('icon file not Sucessfully uploaded', 500);
      });
    }

    return `${dir}/${file.name}`;
  }

  async dirExists_(path: string) {
    return fs.existsSync(path);
  }

  async checkFileExists(path: string) {
    return fs.existsSync(path);
  }

  async throwFileExists(path: string) {
    console.log('>!!!!!!!>>>>>>>>>>>>>>>>>>>>>>>>>>>', path);
    if (await this.checkFileExists(path)) throw new AppError('File Exists.');
    return;
  }

  async throwFileNotFound(path: string): Promise<void> {
    if (!(await this.checkFileExists(path))) throw new AppError('File not found.');
    return;
  }
}

const fileSys = new FileSys();
export default fileSys;
