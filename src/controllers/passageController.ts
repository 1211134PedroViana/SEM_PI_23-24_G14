import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IPassageController from './IControllers/IPassageController';
import IPassageService from '../services/IServices/IPassageService';
import IPassageDTO from '../dto/IPassageDTO';


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
}