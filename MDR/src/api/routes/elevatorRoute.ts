import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import authorizeRole from '../middlewares/authorizeRole';

import config from '../../../config';
import IElevatorController from '../../controllers/IControllers/IElevatorController';

const route = Router();

export default (app: Router) => {
  app.use('/elevators', route);

  route.use(isAuth);
  route.use(attachCurrentUser);

  const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;
  

  //API POST request - create a new Elevator
  route.post(
    '/create',
    authorizeRole(config.permissions.elevator.post),
    celebrate({
      body: Joi.object({
        code: Joi.string().required(),
        location: {
          positionX: Joi.number().required(),
          positionY: Joi.number().required(),
          direction: Joi.string().required(),
        },
        buildingId: Joi.string().required(),
        floorList: Joi.array()
          .items(Joi.string().required())
          .required(),
        brand: Joi.string(),
        model: Joi.string(),
        serialNumber: Joi.string(),
        description: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.createElevator(req, res, next),
  );

  //API PUT request - update data of a Building
  route.put(
    '/update',
    authorizeRole(config.permissions.elevator.put),
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        code: Joi.string(),
        location: {
          positionX: Joi.number(),
          positionY: Joi.number(),
          direction: Joi.string(),
        },
        buildingId: Joi.string(),
        floorList: Joi.array().items(Joi.string()),
        brand: Joi.string(),
        model: Joi.string(),
        serialNumber: Joi.string(),
        description: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.updateElevator(req, res, next),
  );

  //API GET request - list all Elevators
  route.get('/list', 
  authorizeRole(config.permissions.elevator.get),
  (req, res, next) => ctrl.listElevators(req, res, next));

  // API GET request - list floors served by an Elevator
  route.get(
    '/elevatorsByFloor',
    celebrate({
      params: Joi.object({
        elevatorId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.listAllFloorsServedByElevator(req, res, next),
  );

  route.get('/elevatorFromBuilding/:buildingId', 
  authorizeRole(config.permissions.elevator.get),
  (req, res, next) => ctrl.getElevatorByBuilding(req, res, next));

  route.get('/elevatorFromDescription/:description',
  authorizeRole(config.permissions.elevator.get), 
  (req, res, next) => ctrl.getElevatorByDescription(req, res, next));
};
