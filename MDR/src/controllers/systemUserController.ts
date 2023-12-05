import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';

import ISystemUserController from './IControllers/ISystemUserController';
import ISystemUserService from '../services/IServices/ISystemUserService';
import ISystemUserDTO from '../dto/ISystemUserDTO';

@Service()
export default class SystemUserController implements ISystemUserController {
  constructor(@Inject(config.services.systemUser.name) private systemUserServiceInstance: ISystemUserService) {}

  public async createSystemUser(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = (await this.systemUserServiceInstance.createSystemUser(
        req.body as ISystemUserDTO,
      )) as Result<ISystemUserDTO>;

      if (buildingOrError.isFailure) {
        return res.status(402).send(buildingOrError.errorValue());
      }

      const buildingDTO = buildingOrError.getValue();
      return res.json(buildingDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
