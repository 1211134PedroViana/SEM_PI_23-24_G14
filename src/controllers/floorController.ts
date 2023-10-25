import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IFloorController from './IControllers/IFloorController';
import IFloorService from '../services/IServices/IFloorService';
import IFloorDTO from '../dto/IFloorDTO';

@Service()
export default class FloorController implements IFloorController {
    constructor(
        @Inject(config.services.floor.name) private floorServiceInstance : IFloorService
    ) {}
    updateFloor() {
        throw new Error('Method not implemented.');
    }

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

    public async updpateFloor(req: Request, res: Response, next: NextFunction) {
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
}