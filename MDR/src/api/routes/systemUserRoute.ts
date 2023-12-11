import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from '../../../config';
import ISystemUserController from '../../controllers/IControllers/ISystemUserController';

const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  const ctrl = Container.get(config.controllers.systemUser.name) as ISystemUserController;

  //API POST request - create a new SystemUser
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string(),
        role: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.createSystemUser(req, res, next),
  );
};
