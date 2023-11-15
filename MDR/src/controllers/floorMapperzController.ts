import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import { readFile } from 'fs/promises';
import { Result } from "../core/logic/Result";
import IFloorMapperzController from './IControllers/IFloorMapperzController';
import IFloorMapperzService from '../services/IServices/IFloorMapperz';
import IFloorMapperzDTO from '../dto/IFloorMapperzDTO';


@Service()
export default class FloorMapperzController implements IFloorMapperzController {
    constructor(
        @Inject(config.services.floorMapperz.name) private floorMapServiceInstance : IFloorMapperzService
    ) {}

    public async loadFloorMap(req: Request, res: Response, next: NextFunction) {
        try {
            const filePath = req.file.path;
            const fileContent = await readFile(filePath, 'utf-8');
            const jsonContent = JSON.parse(fileContent);
            const floorMapOrError = await this.floorMapServiceInstance.loadFloorMap(req.file, jsonContent as IFloorMapperzDTO) as Result<IFloorMapperzDTO>;

            if(floorMapOrError.isFailure) {
                return res.status(402).send(floorMapOrError.errorValue());
            }

            const floorMapDTO = floorMapOrError.getValue();
            return res.json( floorMapDTO ).status(201);

        } catch (e) {
            return next(e);
        }
    }
}