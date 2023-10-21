import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IBuildingController from '../../controllers/IControllers/IBuildingController';

const route = Router();

export default( app: Router) => {
    app.use('/buildings', route);

    console.log(config.controllers.building.name);
    const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

    route.post('',
      celebrate({
        body: Joi.object({
            code: Joi.string().required(),
            description: Joi.string(),
            name: Joi.string()
        })
      }),
      (req, res, next) => ctrl.createBuilding(req, res, next) );

    route.put('/editDescription',
      celebrate({
        body: Joi.object({
            id: Joi.string().required(),
            description: Joi.string()
        })
      }),
      (req, res, next) => ctrl.updateBuildingDescription(req, res, next) );
      
}