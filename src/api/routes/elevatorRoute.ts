import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IElevatorController from '../../controllers/IControllers/IElevatorController';

const route = Router();

export default( app: Router) => {
    app.use('/elevators', route);

    const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;

    //API POST request - create a new Elevator
    route.post('/create',
      celebrate({
        body: Joi.object({
            code: Joi.string().required(),
            location: {
                positionX: Joi.number().required(),
                positionY: Joi.number().required(),
                direction: Joi.string().required()
            },
            buildingId: Joi.string().required()
        })
      }),
      (req, res, next) => ctrl.createElevator(req, res, next) );

      //API GET request - list all Elevators
    route.get('/list',
    (req, res, next) => ctrl.listElevators(req, res, next) );
    

}