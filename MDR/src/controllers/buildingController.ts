import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import { Result } from '../core/logic/Result';
import IBuildingDTO from '../dto/IBuildingDTO';
import IBuildingService from '../services/IServices/IBuildingService';
import IBuildingController from './IControllers/IBuildingController';

@Service()
export default class BuildingController implements IBuildingController {
  constructor(@Inject(config.services.building.name) private buildingServiceInstance: IBuildingService) {}

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = (await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO)) as Result<
        IBuildingDTO
      >;

      if (buildingOrError.isFailure) {
        return res.status(402).send(buildingOrError.errorValue());
      }

      const buildingDTO = buildingOrError.getValue();
      return res.json(buildingDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updateBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = (await this.buildingServiceInstance.updateBuilding(req.body as IBuildingDTO)) as Result<
        IBuildingDTO
      >;

      if (buildingOrError.isFailure) {
        return res.status(402).send(buildingOrError.errorValue());
      }

      const buildingDTO = buildingOrError.getValue();
      return res.json(buildingDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async listBuildings(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingListOrError = (await this.buildingServiceInstance.getAllBuildings()) as Result<IBuildingDTO[]>;

      if (buildingListOrError.isFailure) {
        return res.status(402).send(buildingListOrError.errorValue());
      }

      const buildingListDTO = buildingListOrError.getValue();
      return res.json(buildingListDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async listBuildingsWithMinAndMaxFloors(req: Request, res: Response, next: NextFunction) {
    try {
      const min = parseInt(req.params.min, 10);
      const max = parseInt(req.params.max, 10);

      const buildingListOrError = (await this.buildingServiceInstance.getAllBuildingsWithMinAndMaxFloors(
        min,
        max,
      )) as Result<IBuildingDTO[]>;

      if (buildingListOrError.isFailure) {
        return res.status(402).send(buildingListOrError.errorValue());
      }

      const buildingListDTO = buildingListOrError.getValue();
      return res.json(buildingListDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
