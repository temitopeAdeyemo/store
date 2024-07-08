import { jsonResponse } from '../../../shared/utils/AppSuccess';
import { Request, Response, NextFunction } from 'express';
import { CreateUserService } from '../services';

class CreateUser {
  async register(req: Request, res: Response, next: NextFunction) {
    const { entity_name, email, password, role, first_name, last_name } =
      req.body;

    const response = await new CreateUserService().execute({
      entity_name,
      email,
      password,
      role,
      first_name,
      last_name,
    });

    const successResponse = jsonResponse.build(
      201,
      'User created successfully',
      response
    );

    next(successResponse);
  }
}

export default new CreateUser();
