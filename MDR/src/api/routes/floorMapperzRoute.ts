import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import authorizeRole from '../middlewares/authorizeRole';

import config from "../../../config";
import IFloorMapperzController from '../../controllers/IControllers/IFloorMapperzController';
const path = require('path');

const route = Router();

export default( app: Router) => {
    app.use('/loadMap', route);

    //route.use(isAuth);
    //route.use(attachCurrentUser);

    const ctrl = Container.get(config.controllers.floorMapperz.name) as IFloorMapperzController;

    const projectRoot = path.join(__dirname, '..', '..', '..', '..'); 
    const MAZES_DESTINATION = path.join(projectRoot, 'SPA', 'src', 'assets', 'mazes');

    const diskStorage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, MAZES_DESTINATION);
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    });
    
    const upload = multer({ storage: diskStorage });

    //API PATCH request - create a new FloorMap of a existing Floor
    route.patch('', 
    upload.single('file'),
      (req, res, next) => ctrl.loadFloorMap(req, res, next) );

    //API GET request - get Floor Map
    route.get('/:floorId', 
    //authorizeRole(config.permissions.floorMapperz.get),
    (req, res, next) => ctrl.getFloorMap(req, res, next));

}