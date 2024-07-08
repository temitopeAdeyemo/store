export default interface ICreateEntityDTO {
  email: string;
  password: string;
  entity_name?: string;
  last_name: string;
  first_name: string;
  role?: string;
}
