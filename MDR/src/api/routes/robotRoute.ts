import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import authorizeRole from '../middlewares/authorizeRole';

import config from '../../../config';
import IRobotController from '../../controllers/IControllers/IRobotController';

const route = Router();

export default (app: Router) => {
  app.use('/robots', route);

  route.use(isAuth);
  route.use(attachCurrentUser);

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

  //API POST request - create a new Robot
  route.post(
    '/create',
    authorizeRole(config.permissions.robot.post),
    celebrate({
      body: Joi.object({
        code: Joi.string().required(),
        nickname: Joi.string().required(),
        robotType: Joi.string().required(),
        serialNumber: Joi.number().required(),
        description: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createRobot(req, res, next),
  );

  //API PATCH request - deactivate a Robot
  route.patch(
    '/deactivate',
    authorizeRole(config.permissions.robot.put),
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.deactivateRobot(req, res, next),
  );

  //API GET request - list all Robots
  route.get('/list', 
  authorizeRole(config.permissions.robot.get),
  (req, res, next) => ctrl.listRobots(req, res, next));

  //API GET request - find robot by nickname
  route.get(
    '/findByNickname',
    celebrate({
      body: Joi.object({
        nickname: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.findRobotByNickname(req, res, next),
  );

  // API GET request - retrieve robots by nickname or taskType
  route.get(
    '/retrieve',
    celebrate({
      query: Joi.object({
        nickname: Joi.string(),
        taskType: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.findRobotsByNicknameOrTaskType(req, res, next),
  );
};
