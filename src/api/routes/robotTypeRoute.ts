import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IRobotTypeController from '../../controllers/IControllers/IRobotTypeController';

const route = Router();

export default( app: Router) => {
    app.use('/robotTypes', route);

    const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;

    //API POST request - create a new RobotType
    route.post('/create',
      celebrate({
        body: Joi.object({
            code: Joi.string().required(),
            brand: Joi.string().required(),
            model: Joi.string().required(),
            taskTypes: Joi.array().items(Joi.string().required()).required()
        })
      }),
      (req, res, next) => ctrl.createRobotType(req, res, next) );
      
}