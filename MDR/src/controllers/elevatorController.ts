import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IElevatorController from './IControllers/IElevatorController';
import IElevatorService from '../services/IServices/IElevatorService';
import IElevatorDTO from '../dto/IElevatorDTO';

@Service()
export default class ElevatorController implements IElevatorController {
    constructor(
        @Inject(config.services.elevator.name) private elevatorServiceInstance: IElevatorService
    ) {}

    public async createElevator(req: Request, res: Response, next: NextFunction) {
        try {
            const elevatorOrError = await this.elevatorServiceInstance.createElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;

            if (elevatorOrError.isFailure) {
                return res.status(402).send(elevatorOrError.errorValue());
            }

            const elevatorDTO = elevatorOrError.getValue();
            return res.json(elevatorDTO).status(201);

        } catch (e) {
            return next(e);
        }
    }

    public async listElevators(req: Request, res: Response, next: NextFunction) {
        try {
            const elevatorListOrError = await this.elevatorServiceInstance.getAllElevators() as Result<IElevatorDTO[]>;

            if (elevatorListOrError.isFailure) {
                return res.status(402).send(elevatorListOrError.errorValue());
            }

            const passageListDTO = elevatorListOrError.getValue();
            return res.json(passageListDTO).status(201);

        } catch (e) {
            return next(e);
        }
    }

    public async listFloorsServedByElevatorInBuilding(req: Request, res: Response, next: NextFunction) {
        try {
          const buildingId = req.params.buildingId;
      
          const floorsServedOrError = await this.elevatorServiceInstance.getFloorsServedByElevatorInBuilding(buildingId);
      
          if (floorsServedOrError.isFailure) {
            return res.status(404).send(floorsServedOrError.errorValue());
          }
      
          const floorsServed = floorsServedOrError.getValue();
          return res.json(floorsServed).status(200);
        } catch (e) {
          return next(e);
        }
      }
}
