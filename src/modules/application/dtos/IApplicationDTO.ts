import Version from "../../../modules/version/models/entities/Version";

export default interface IApplicationDTO {
  // application_file: string;
  application_name: string;
  // package_name: string;
  icon: string;
  versions: string[] ;
  // screenshots?: string;
  // build_number: string;
  // version: string;
  device: string;
  description: string;
  // file_extension: string;
  // file_url: string;
  // compatible_model_name: string;
  shareToSubOrganization?: boolean;
  program_file_name?: string;
  program_file_version?: string;
  // application_versions: Array<string>;
  status: string;
  // latest_version_id: string;
  // versions: Array<string>;
  latest_version: string;
  organization?: string;
}
