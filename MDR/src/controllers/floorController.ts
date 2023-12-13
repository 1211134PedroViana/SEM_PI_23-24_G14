import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IFloorController from './IControllers/IFloorController';
import IFloorService from '../services/IServices/IFloorService';
import IFloorDTO from '../dto/IFloorDTO';
import IPassageService from '../services/IServices/IPassageService';
import IPassageDTO from '../dto/IPassageDTO';

@Service()
export default class FloorController implements IFloorController {
    constructor(
        @Inject(config.services.floor.name) private floorServiceInstance: IFloorService,
        @Inject(config.services.passage.name) private passageServiceInstance: IPassageService
    ) {}

    public async createFloor(req: Request, res: Response, next: NextFunction) {
        try {
            const floorOrError = await this.floorServiceInstance.createFloor(req.body as IFloorDTO) as Result<IFloorDTO>;

            if(floorOrError.isFailure) {
                return res.status(402).send(floorOrError.errorValue());
            }

            const floorDTO = floorOrError.getValue();
            return res.json( floorDTO ).status(201);

        } catch (e) {
            return next(e);
        }
    }

    public async updateFloor(req: Request, res: Response, next: NextFunction) {
        try {
            const floorOrError = await this.floorServiceInstance.updateFloor(req.body as IFloorDTO) as Result<IFloorDTO>;

            if(floorOrError.isFailure) {
                return res.status(402).send(floorOrError.errorValue());
            }

            const floorDTO = floorOrError.getValue();
            return res.json(floorDTO).status(201);

        } catch (e) {
            return next(e);     
        }
    }

    public async listFloors(req: Request, res: Response, next: NextFunction) {
        try {
            const floorListOrError = await this.floorServiceInstance.getAllFloors() as Result<IFloorDTO[]>;

            if(floorListOrError.isFailure) {
                return res.status(402).send(floorListOrError.errorValue());
            }

            const floorListDTO = floorListOrError.getValue();
            return res.json(floorListDTO).status(201);

        } catch (e) {
            return next(e);
        }
    }

    public async listFloorsWithPassage(req: Request, res: Response, next: NextFunction) {
        try {
            const passageListOrError = await this.passageServiceInstance.getAllPassages() as Result<IPassageDTO[]>;
            if(passageListOrError.isFailure) {
                return res.status(402).send(passageListOrError.errorValue());
            }
            const resultList = await this.floorServiceInstance.getFloorsWithPassage(passageListOrError.getValue()) as Result<IFloorDTO[]>;

            const floorListDTO = resultList.getValue();
            return res.json(floorListDTO).status(201);

        } catch (e) {
            return next(e);
        }
    }

    public async listFloorsFromBuilding(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingId = req.params.buildingId;
            const floorListOrError = await this.floorServiceInstance.getFloorsFromBuilding(buildingId) as Result<IFloorDTO[]>;

            if(floorListOrError.isFailure) {
                return res.status(402).send(floorListOrError.errorValue());
            }

            const floorListDTO = floorListOrError.getValue();
            return res.json(floorListDTO).status(201);

        } catch (e) {
            return next(e);
        }
    }

    public async getFloorById(req: Request, res: Response, next: NextFunction) {
        try {
          let floorId = req.params.floorId;
    
          const floorOrError = (await this.floorServiceInstance.getFloorById(floorId)) as Result<IFloorDTO>;
    
          if (floorOrError.isFailure) {
            return res.status(402).send(floorOrError.errorValue());
          }
    
          const floorDTO = floorOrError.getValue();
          return res.json(floorDTO).status(201);
        } catch (e) {
          return next(e);
        }
      }
}