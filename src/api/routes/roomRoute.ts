import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IRoomController from "../../controllers/IControllers/IRoomController";

const route = Router();

export default( app: Router) => {
    app.use('/rooms', route);

    const ctrl = Container.get(config.controllers.room.name) as IRoomController;

    //API POST request - create a new Floor of a existing Building
    route.post('/create',
        celebrate({
            body: Joi.object({
                code: Joi.string().required(),
                dimension: {
                    pos1: Joi.number().required(),
                    pos2: Joi.number().required(),
                    pos3: Joi.number().required(),
                    pos4: Joi.number().required(),
                },
                location: {
                    positionX: Joi.number().required(),
                    positionY: Joi.number().required(),
                    direction: Joi.string().required()
                }
            })
        }),
        (req, res, next) => ctrl.createRoom(req, res, next) );

    //API PUT request - update data of a Building
    route.put('/update',
        celebrate({
            body: Joi.object({
                code: Joi.string().required(),
                dimension: Joi.string(),
                location: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.updateRoom(req, res, next) );

    //API GET request - list all Passages
    route.get('/list',
        (req, res, next) => ctrl.listRoom(req, res, next) );


}