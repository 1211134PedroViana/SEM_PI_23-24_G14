import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import authorizeRole from '../middlewares/authorizeRole';

import config from '../../../config';
import IFloorController from '../../controllers/IControllers/IFloorController';

const route = Router();

export default (app: Router) => {
  app.use('/floors', route);

  route.use(isAuth);
  route.use(attachCurrentUser);

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

  //API POST request - create a new Floor of a existing Building
  route.post(
    '/create',
    authorizeRole(config.permissions.floor.post),
    celebrate({
      body: Joi.object({
        buildingId: Joi.string().required(),
        floorNumber: Joi.number().required(),
        description: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.createFloor(req, res, next),
  );

  //API PUT request - update data of a Building
  route.put(
    '/update',
    authorizeRole(config.permissions.floor.put),
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        floorNumber: Joi.number().required(),
        description: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.updateFloor(req, res, next),
  );

  //API GET request - list all Buildings
  route.get('/list', 
  authorizeRole(config.permissions.floor.get),
  (req, res, next) => ctrl.listFloors(req, res, next));

  route.get('/withPassages', 
  authorizeRole(config.permissions.floor.get),
  (req, res, next) => ctrl.listFloorsWithPassage(req, res, next));

  route.get('/fromBuilding/:buildingId', 
  authorizeRole(config.permissions.floor.get),
  (req, res, next) => ctrl.listFloorsFromBuilding(req, res, next));

  //API GET request - get Floor by floorId
  route.get('/floorById/:floorId', 
  authorizeRole(config.permissions.floor.get),
  (req, res, next) => ctrl.getFloorById(req, res, next));
};
