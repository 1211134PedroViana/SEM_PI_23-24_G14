import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import authorizeRole from '../middlewares/authorizeRole';

import config from '../../../config';
import IBuildingController from '../../controllers/IControllers/IBuildingController';

const route = Router();

export default (app: Router) => {
  app.use('/buildings', route);

  route.use(isAuth);
  route.use(attachCurrentUser);

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

  //API POST request - create a new Building
  route.post(
    '/create',
    authorizeRole(config.permissions.building.post),
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
    authorizeRole(config.permissions.building.put),
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
  route.get('/list',
  authorizeRole(config.permissions.building.get), 
  (req, res, next) => ctrl.listBuildings(req, res, next));

  //API GET request - list all Buildings with min and max floors
  route.get(
    '/listAllBuildignsWithMinAndMaxFloors/Min/:min/Max/:max',
    authorizeRole(config.permissions.building.get),
    (req, res, next) => ctrl.listBuildingsWithMinAndMaxFloors(req, res, next),
  );

  //API GET request - get Building by buildingId
  route.get('/buildingById/:buildingId', 
  authorizeRole(config.permissions.building.get),
  (req, res, next) => ctrl.getBuildingById(req, res, next));
  
};
