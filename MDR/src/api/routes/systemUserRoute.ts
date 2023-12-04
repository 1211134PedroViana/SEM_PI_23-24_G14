import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from '../../../config';
import ISystemUserController from '../../controllers/IControllers/ISystemUserController';

const route = Router();

export default (app: Router) => {
  app.use('/systemUsers', route);

  const ctrl = Container.get(config.controllers.building.name) as ISystemUserController;

  //API POST request - create a new Building
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
