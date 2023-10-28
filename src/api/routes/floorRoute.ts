import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IFloorController from '../../controllers/IControllers/IFloorController';

const route = Router();

export default( app: Router) => {
    app.use('/floors', route);

    const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

    //API POST request - create a new Floor of a existing Building
    route.post('/create',
      celebrate({
        body: Joi.object({
            buildingId: Joi.string().required(),
            floorNumber: Joi.number().required(),
            description: Joi.string()
        })
      }),
      (req, res, next) => ctrl.createFloor(req, res, next) );

    //API PUT request - update data of a Building
    route.put('/update',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                floorNumber: Joi.number().required(),
                description: Joi.string()
            })
        }),
        (req, res, next) => ctrl.updateFloor(req, res, next) );

    //API GET request - list all Buildings
    route.get('/list',
        (req, res, next) => ctrl.listFloors(req, res, next) );

    route.get('/list',
        (req, res, next) => ctrl.listFloorsWithPassage(req, res, next) );
}