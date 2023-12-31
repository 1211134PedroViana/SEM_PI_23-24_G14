import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import authorizeRole from '../middlewares/authorizeRole';

import config from '../../../config';
import IRoomController from '../../controllers/IControllers/IRoomController';

const route = Router();

export default (app: Router) => {
  app.use('/rooms', route);

  route.use(isAuth);
  route.use(attachCurrentUser);

  const ctrl = Container.get(config.controllers.room.name) as IRoomController;

  //API POST request - create a new Floor of an existing Building
  route.post(
    '/create',
    authorizeRole(config.permissions.room.post),
    celebrate({
      body: Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        dimension: {
          pos1: Joi.number().required(),
          pos2: Joi.number().required(),
          pos3: Joi.number().required(),
          pos4: Joi.number().required(),
        },
        location: {
          positionX: Joi.number().required(),
          positionY: Joi.number().required(),
          direction: Joi.string().required(),
        },
        floorId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createRoom(req, res, next),
  );

  //API PUT request - update data of a Building
  route.put(
    '/update',
    authorizeRole(config.permissions.room.put),
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        description: Joi.string(),
        dimension: {
          pos1: Joi.number(),
          pos2: Joi.number(),
          pos3: Joi.number(),
          pos4: Joi.number(),
        },
        location: {
          positionX: Joi.number(),
          positionY: Joi.number(),
          direction: Joi.string(),
        },
      }),
    }),
    (req, res, next) => ctrl.updateRoom(req, res, next),
  );

  //API GET request - list all Passages
  route.get('/list', 
  authorizeRole(config.permissions.room.get),
  (req, res, next) => ctrl.listRoom(req, res, next));

  route.get('/roomsFromFloor/:floorId',
  authorizeRole(config.permissions.room.get), 
  (req, res, next) => ctrl.getRoomsByFloor(req, res, next));

  route.get('/roomFromDescription/:description',
  authorizeRole(config.permissions.room.get), 
  (req, res, next) => ctrl.getRoomByDescription(req, res, next));
};
