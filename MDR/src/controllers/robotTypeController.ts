import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IRobotTypeController from './IControllers/IRobotTypeController';
import IRobotTypeService from '../services/IServices/IRobotTypeService';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';

@Service()
export default class RobotTypeController implements IRobotTypeController {
    constructor(
        @Inject(config.services.robotType.name) private robotTypeServiceInstance : IRobotTypeService
    ) {}

    public async createRobotType(req: Request, res: Response, next: NextFunction) {
        try {
            const robotTypeOrError = await this.robotTypeServiceInstance.createRobotType(req.body as IRobotTypeDTO) as Result<IRobotTypeDTO>;

            if(robotTypeOrError.isFailure) {
                return res.status(402).send(robotTypeOrError.errorValue());
            }

            const robotTypeDTO = robotTypeOrError.getValue();
            return res.json( robotTypeDTO ).status(201);

        } catch (e) {
            return next(e);
        }
    }

    public async getAllRobotTypes(req: Request, res: Response, next: NextFunction) {
        try {
          const robotTypeListOrError = (await this.robotTypeServiceInstance.getAllRobotTypes()) as Result<IRobotTypeDTO[]>;
    
          if (robotTypeListOrError.isFailure) {
            return res.status(402).send(robotTypeListOrError.errorValue());
          }
    
          const robotTypeListDTO = robotTypeListOrError.getValue();
          return res.json(robotTypeListDTO).status(201);
        } catch (e) {
          return next(e);
        }
    }
}