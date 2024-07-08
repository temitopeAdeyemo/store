export default interface IGetVersionFilterDTO {
  id?: string;
  // md5_encoding: string;
  application_name?: string;
  package_name?: string;
  version_name?: string;
  // screenshots?: string;
  build_number?: string;
  version_no?: string;
  latest?: boolean;
  // device: string;
  // file_extension?: string;
  // description?: string;
  // file_url: string;
  // compatible_model_names?: string[];
  // application_file: any;
  // download_no: string;
  // program_file_name?: string;
  // program_file_version?: string;
  // application_versions: Array<string>;
  // status: string;
}

export interface FilterOptions {
  page: string;
  limit: string;
}

export interface IGetVersionData {
  searchFilter: IGetVersionFilterDTO;
  filterOptions?: FilterOptions;
}

export interface IGetVersionQueryDTO {
  id?: string;
  package_name?: string;
  build_number?: string;
  file_url?: string;
  version_no: string;
  application_name: string;
}

export interface IGetVersionsQueryDTO extends FilterOptions, IGetVersionFilterDTO {}
