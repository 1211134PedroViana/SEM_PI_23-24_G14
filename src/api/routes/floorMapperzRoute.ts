import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IFloorMapperzController from '../../controllers/IControllers/IFloorMapperzController';


const route = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default( app: Router) => {
    app.use('/loadMap', route);

    const ctrl = Container.get(config.controllers.floorMapperz.name) as IFloorMapperzController;

    /*
    const locationSchema = Joi.object({
        positionX: Joi.number().required(),
        positionY: Joi.number().required(),
        direction: Joi.string().required(),
      });
      
      const dimensionSchema = Joi.object({
        pos1: Joi.number().required(),
        pos2: Joi.number().required(),
        pos3: Joi.number().required(),
        pos4: Joi.number().required(),
      });
      
      const roomSchema = Joi.object({
        roomId: Joi.string().required(),
        dimension: dimensionSchema.required(),
        location: locationSchema.required(),
      });
      
      const elevatorSchema = Joi.object({
        elevatorId: Joi.string().required(),
        location: locationSchema.required(),
      });
      
      const passageSchema = Joi.object({
        passageId: Joi.string().required(),
        location: locationSchema.required(),
      });
      
      const floorMapSchema = Joi.object({
        floorId: Joi.string().required(),
        map: Joi.array().items(Joi.array().items(Joi.number())).required(),
        fMapRooms: Joi.array().items(roomSchema).required(),
        fMapElevator: elevatorSchema.required(),
        fMapPassages: Joi.array().items(passageSchema).required(),
      });
    */

    //API PATCH request - create a new FloorMap of a existing Floor
    route.patch('', upload.single('file'),
      (req, res, next) => ctrl.loadFloorMap(req, res, next) );

}