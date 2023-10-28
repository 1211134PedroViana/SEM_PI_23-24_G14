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
        @Inject(config.services.passage.name) private passageServiceInstance : IPassageService
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
}