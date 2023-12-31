import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import authorizeRole from '../middlewares/authorizeRole';

import config from '../../../config';
import IPassageController from '../../controllers/IControllers/IPassageController';

const route = Router();

export default (app: Router) => {
  app.use('/passages', route);

  route.use(isAuth);
  route.use(attachCurrentUser);

  const ctrl = Container.get(config.controllers.passage.name) as IPassageController;

  //API POST request - create a new Floor of an existing Building
  route.post(
    '/create',
    authorizeRole(config.permissions.passage.post),
    celebrate({
      body: Joi.object({
        fromBuildingId: Joi.string().required(),
        toBuildingId: Joi.string().required(),
        fromFloorId: Joi.string().required(),
        toFloorId: Joi.string().required(),
        location: {
          positionX: Joi.number().required(),
          positionY: Joi.number().required(),
          direction: Joi.string().required(),
        },
      }),
    }),
    (req, res, next) => ctrl.createPassage(req, res, next),
  );

  //API GET request - list all Passages
  route.get('/list', 
  authorizeRole(config.permissions.passage.get),
  (req, res, next) => ctrl.listPassages(req, res, next));

  //API GET request - list all Passages between 2 buildings
  route.get(
    '/list',
    celebrate({
      body: Joi.object({
        FromBuildingID: Joi.string().required(),
        ToBuildingID: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.listPassagesBetweenBuildings(req, res, next),
  );

  //API PUT request - edit a Passage
  route.put(
    '/update',
    authorizeRole(config.permissions.passage.put),
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        fromBuildingId: Joi.string().required(),
        toBuildingId: Joi.string().required(),
        fromFloorId: Joi.string().required(),
        toFloorId: Joi.string().required(),
        location: {
          positionX: Joi.number().required(),
          positionY: Joi.number().required(),
          direction: Joi.string().required(),
        },
      }),
    }),
    (req, res, next) => ctrl.updatePassage(req, res, next),
  );

  route.get('/passagesFromFloor/:floorId', 
  authorizeRole(config.permissions.passage.get),
  (req, res, next) => ctrl.getPassagesByFloor(req, res, next));

  route.get('/passageFromDescription/:description',
  authorizeRole(config.permissions.passage.get), 
  (req, res, next) => ctrl.getPassageByDescription(req, res, next));
};
