import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IPassageController from '../../controllers/IControllers/IPassageController';

const route = Router();

export default( app: Router) => {
    app.use('/passages', route);

    const ctrl = Container.get(config.controllers.passage.name) as IPassageController;

    //API POST request - create a new Floor of a existing Building
    route.post('/create',
      celebrate({
        body: Joi.object({
            fromFloorId: Joi.string().required(),
            toFloorId: Joi.string().required(),
            location: {
                positionX: Joi.number().required(),
                positionY: Joi.number().required(),
                direction: Joi.string().required()
            }
        })
      }),
      (req, res, next) => ctrl.createPassage(req, res, next) );

      //API GET request - list all Passages
    route.get('/list',
    (req, res, next) => ctrl.listPassages(req, res, next) );
    

}