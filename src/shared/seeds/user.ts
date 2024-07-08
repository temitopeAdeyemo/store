import { hashSync } from 'bcryptjs';
import environment from '../../config/environments.config';
import UserRepository from '../../modules/user/models/repositories/UserRepository';
import ICreateEntityDTO from '../../modules/user/dtos/ICreateEntityDTO';

const superAdmin: ICreateEntityDTO = {
  email: environment.defaultUserEmail,
  password: hashSync(environment.defaultUserPassword, parseInt(environment.saltRounds)),
  first_name: environment.defaultUserFirstName,
  last_name: environment.defaultUserLastName,
  role: 'SUPER ADMIN',
  entity_name: "STORE_ADMIN",
};

const runSeedings = async () => {
  try {
    const userRepository = new UserRepository();
    const user = await userRepository.findByEmail(environment.defaultUserEmail);
    if (!user) {
      await userRepository.create(superAdmin);
      console.log('Super admin created');
    }
  } catch (err: any) {
    console.error(
      'Something went wrong when creating the super admin:\n',
      err.stack
    );
  }
};

export default runSeedings;