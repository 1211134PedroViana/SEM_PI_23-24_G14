import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import ITaskTypeController from './IControllers/ITaskTypeController';
import ITaskTypeService from '../services/IServices/ITaskTypeService';
import ITaskTypeDTO from '../dto/ITaskTypeDTO';


@Service()
export default class TaskTypeController implements ITaskTypeController {
    constructor(
        @Inject(config.services.taskType.name) private taskTypeServiceInstance : ITaskTypeService
    ) {}

    public async createTaskType(req: Request, res: Response, next: NextFunction) {
        try {
            const taskTypeOrError = await this.taskTypeServiceInstance.createTaskType(req.body as ITaskTypeDTO) as Result<ITaskTypeDTO>;

            if(taskTypeOrError.isFailure) {
                return res.status(402).send(taskTypeOrError.errorValue());
            }

            const taskTypeDTO = taskTypeOrError.getValue();
            return res.json( taskTypeDTO ).status(201);

        } catch (e) {
            return next(e);
        }
    }
}