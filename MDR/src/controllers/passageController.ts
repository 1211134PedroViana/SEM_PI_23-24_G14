import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IPassageController from './IControllers/IPassageController';
import IPassageService from '../services/IServices/IPassageService';
import IPassageDTO from '../dto/IPassageDTO';
import { STATUS_CODES } from 'http';
import { floor } from 'lodash';


@Service()
export default class PassageController implements IPassageController {
    constructor(
        @Inject(config.services.passage.name) private passageServiceInstance: IPassageService
    ) {}

    public async createPassage(req: Request, res: Response, next: NextFunction) {
        try {
            const passageOrError = await this.passageServiceInstance.createPassage(req.body as IPassageDTO) as Result<IPassageDTO>;

            if(passageOrError.isFailure) {
                return res.status(402).send(passageOrError.errorValue());
            }

            const passageDTO = passageOrError.getValue();
            
            return res.json( passageDTO ).status(201);

        } catch (e) {
            return next(e);
        }
    }

    public async listPassages(req: Request, res: Response, next: NextFunction) {
        try {
            const passagesListOrError = await this.passageServiceInstance.getAllPassages() as Result<IPassageDTO[]>;

            if(passagesListOrError.isFailure) {
                return res.status(402).send(passagesListOrError.errorValue());
            }

            const passageListDTO = passagesListOrError.getValue();
            return res.json( passageListDTO ).status(201);

        } catch (e) {
            return next(e);
        }
    }

    public async listPassagesBetweenBuildings(req: Request, res: Response, next: NextFunction) {
        try {
            const passagesListOrError = await this.passageServiceInstance.getAllPassages() as Result<IPassageDTO[]>;

            if(passagesListOrError.isFailure) {
                return res.status(402).send(passagesListOrError.errorValue());
            }

            const passagesList = await this.passageServiceInstance.allPassagesBetweenBuildings(req.body.FromBuildingID, req.body.ToBuildingID, passagesListOrError.getValue()) as Result<IPassageDTO[]>;
            return res.json(passagesList.getValue()).status(201);

        } catch (e) {
            return next(e);
        }
    }

    public async updatePassage(req: Request, res: Response, next: NextFunction) {
        try {
            const passageOrError = await this.passageServiceInstance.updatePassage(req.body as IPassageDTO) as Result<IPassageDTO>;
            
            if (passageOrError.isFailure) {
                return res.status(402).send(passageOrError.errorValue());
            }

            const passageDTO = passageOrError.getValue();
            
            return res.json(passageDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async getPassagesByFloor(req: Request, res: Response, next: NextFunction) {
        try {
          let floorId = req.params.floorId;
          const passagesOrError = await this.passageServiceInstance.getPassageByFloorId(floorId) as Result<IPassageDTO[]>;
      
          if (passagesOrError.isFailure) {
            return res.status(404).send(passagesOrError.errorValue());
          }
      
          const passages = passagesOrError.getValue();
          return res.json(passages).status(200);
        } catch (e) {
          return next(e);
        }
    }

    public async getPassageByDescription(req: Request, res: Response, next: NextFunction) {
        try {
          let description = req.params.description;
          const passagesOrError = await this.passageServiceInstance.getPassageByDescription(description) as Result<IPassageDTO>;
      
          if (passagesOrError.isFailure) {
            return res.status(404).send(passagesOrError.errorValue());
          }
      
          const passage = passagesOrError.getValue();
          return res.json(passage).status(200);
        } catch (e) {
          return next(e);
        }
    }
}