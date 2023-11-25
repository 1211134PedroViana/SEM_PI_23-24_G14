import { Inject, Service } from 'typedi';
import IRobotController from './IControllers/IRobotController';
import IRobotService from '../services/IServices/IRobotService';
import config from '../../config';
import IRobotDTO from '../dto/IRobotDTO';
import { NextFunction, Response } from 'express-serve-static-core';
import { Result } from '../core/logic/Result';
import { Request } from 'express-jwt';

@Service()
export default class RobotController implements IRobotController {
  constructor(@Inject(config.services.robot.name) private robotServiceInstance: IRobotService) {}

  public async createRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = (await this.robotServiceInstance.createRobot(req.body as IRobotDTO)) as Result<IRobotDTO>;

      if (robotOrError.isFailure) {
        return res.status(402).send(robotOrError.errorValue());
      }

      const robotDTO = robotOrError.getValue();
      return res.json(robotDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updateRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = (await this.robotServiceInstance.updateRobot(req.body as IRobotDTO)) as Result<IRobotDTO>;

      if (robotOrError.isFailure) {
        return res.status(402).send(robotOrError.errorValue());
      }

      const robotDTO = robotOrError.getValue();
      return res.json(robotDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async deactivateRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = (await this.robotServiceInstance.deactivateRobot(req.body as IRobotDTO)) as Result<
        IRobotDTO
      >;

      if (robotOrError.isFailure) {
        return res.status(402).send(robotOrError.errorValue());
      }

      const robotDTO = robotOrError.getValue();
      return res.json(robotDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async listRobots(req: Request, res: Response, next: NextFunction) {
    try {
      const robotListOrError = (await this.robotServiceInstance.getAllRobots()) as Result<IRobotDTO[]>;

      if (robotListOrError.isFailure) {
        return res.status(402).send(robotListOrError.errorValue());
      }

      const robotListDTO = robotListOrError.getValue();
      return res.json(robotListDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async findRobotByNickname(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = (await this.robotServiceInstance.getAllRobotsWithNickname(req.body as IRobotDTO)) as Result<
        IRobotDTO
      >;

      if (robotOrError.isFailure) {
        return res.status(402).send(robotOrError.errorValue());
      }

      const robotDTO = robotOrError.getValue();
      return res.json(robotDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async findRobotsByNicknameOrTaskType(req: Request, res: Response, next: NextFunction) {
    try {
      const { nickname, taskType } = req.body as { nickname: IRobotDTO; taskType?: string };

      // Ensure at least one of the parameters is provided
      if (!nickname && !taskType) {
        return res.status(400).send('Please provide a nickname or a taskType.');
      }

      const robotsOrError = (await this.robotServiceInstance.getRobotsByNicknameOrTaskType(
        nickname,
        taskType,
      )) as Result<IRobotDTO[]>;

      if (robotsOrError.isFailure) {
        return res.status(402).send(robotsOrError.errorValue());
      }

      const robotDTOs = robotsOrError.getValue();
      return res.json(robotDTOs).status(200);
    } catch (e) {
      return next(e);
    }
  }
}
