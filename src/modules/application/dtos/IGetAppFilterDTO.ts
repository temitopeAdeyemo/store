export default interface IGetAppFilterDTO {
  id?: string;
  application_name?: string;
  device?: string;
  program_file_name?: string;
  organization?: string;
  program_file_version?: string;
  status?: string;
}

export interface FilterOptions {
  page: string;
  limit: string;
}

export interface IGetAppData {
  searchFilter: IGetAppFilterDTO;
  filterOptions?: FilterOptions;
}

export interface IGetAppQueryDTO {
  id?: string;
  application_name: string;
  device?: string;
}

export interface IGetAppsQueryDTO extends FilterOptions, IGetAppFilterDTO {}
