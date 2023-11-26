import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from '../../../config';
import IBuildingController from '../../controllers/IControllers/IBuildingController';

const route = Router();

export default (app: Router) => {
  app.use('/buildings', route);

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

  //API POST request - create a new Building
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        code: Joi.string().required(),
        description: Joi.string(),
        name: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.createBuilding(req, res, next),
  );

  //API PUT request - update data of a Building
  route.put(
    '/update',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        description: Joi.string(),
        name: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.updateBuilding(req, res, next),
  );

  //API GET request - llist all Buildings
  route.get('/list', (req, res, next) => ctrl.listBuildings(req, res, next));

  //API GET request - list all Buildings with min and max floors
  route.get(
    '/listAllBuildignsWithMinAndMaxFloors/Min/:min/Max/:max',
    (req, res, next) => ctrl.listBuildingsWithMinAndMaxFloors(req, res, next),
  );
  
};
