import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from "../../../config";
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import authorizeRole from '../middlewares/authorizeRole';
import ITaskTypeController from '../../controllers/IControllers/ITaskTypeController';


const route = Router();

export default( app: Router) => {
    app.use('/taskTypes', route);

    route.use(isAuth);
    route.use(attachCurrentUser);

    const ctrl = Container.get(config.controllers.taskType.name) as ITaskTypeController;

    //API POST request - create a new TaskType
    route.post('/create',
      celebrate({
        body: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required()
        })
      }),
      (req, res, next) => ctrl.createTaskType(req, res, next) );

      //API GET request - get TaskType by name
      route.get('/getTaskType/:name', (req, res, next) => ctrl.getTaskType(req, res, next));

      //API GET request - get TaskType by ID
      route.get('/getTaskTypeById/:taskTypeId', (req, res, next) => ctrl.getTaskTypeById(req, res, next));
    
}