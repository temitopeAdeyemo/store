import ICreateVersionDTO from '../../../modules/version/dtos/ICreateVersionDTO';
import ICreateAppDTO from '../dtos/ICreateAppDTO';
import ApplicationBaseService, { IBaseService } from './BaseService';

class CreateApplicationService extends ApplicationBaseService implements IBaseService {
  async execute(appData: ICreateAppDTO, versionData: ICreateVersionDTO): Promise<object> {
    await this.throwDuplicateAppName(appData.application_name);



    await this.createDirIfNotExist(`${appData.application_name}`);
    // upload icon
    const iconUrl = await this.uploadAppIcon(appData.icon, appData.application_name, 'icon');

    appData.icon = iconUrl;

    appData.latest_version = versionData.version_no

    console.log('||||||||||||||', appData);

    //save to db
    await this.saveAppDetails(appData);

    const path = await this.createVersionService.execute(versionData);

    // await this.updateAppVersion(appData.application_name, versionData.version_no);

    // // Check against dublicate package name
    // await this.throwDuplicatePackageName(data.package_name);

    // // Check against dublicate build number
    // await this.throwDuplicateBuildNum(data.build_number);

    // write to server path
    // const path = this.uploadFile(data.application_file, data.package_name);

    // data.md5_encoding = data.application_file.md5_encoding;

    // Create a directory to write the file and its versions

    // Writing file to server path
    // data.application_file.mv(__dirname + '/uploads/application_files/mm.jpeg', (err: any) => {
    //   if (err) throw Error('Application file not Sucessfully uploaded ' + err);
    // });

    // return url
    return {path};
  }
}

export default CreateApplicationService;
