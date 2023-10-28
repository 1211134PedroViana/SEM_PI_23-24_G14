import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IRobotController from '../../controllers/IControllers/IRobotController';

const route = Router();

export default( app: Router) => {
    app.use('/robots', route);

    const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

    //API POST request - create a new Robot
    route.post('/create',
      celebrate({
        body: Joi.object({
            code: Joi.string().required(),
            nickname: Joi.string().required(),
            robotType: Joi.string().required(),
            serialNumber: Joi.number().required(),
            description: Joi.string().required()
        })
      }),
      (req, res, next) => ctrl.createRobot(req, res, next) );


    //API PATCH request - deactivate a Robot
    route.patch('/deactivate',
      celebrate({
        body: Joi.object({
          id: Joi.string().required()
        })
      }),
      (req, res, next) => ctrl.deactivateRobot(req, res, next) );
    
      
    //API GET request - list all Robots
    route.get('/list',
      (req, res, next) => ctrl.listRobots(req, res, next) );
}