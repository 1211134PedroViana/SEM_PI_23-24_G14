import { Inject, Service } from "typedi";
import IRobotController from "./IControllers/IRobotController";
import IRobotService from "../services/IServices/IRobotService";
import config from "../../config";
import IRobotDTO from '../dto/IRobotDTO';
import { NextFunction, Response } from "express-serve-static-core";
import { Result } from "../core/logic/Result";
import { Request } from "express-jwt";

@Service()
export default class RobotController implements IRobotController {
    constructor(
        @Inject(config.services.robot.name) private robotServiceInstance : IRobotService
    ) {}

    public async createRobot(req: Request, res: Response, next: NextFunction) {
        try {
            const robotOrError = await this.robotServiceInstance.createRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

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
            const robotOrError = await this.robotServiceInstance.updateRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

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
            const robotOrError = await this.robotServiceInstance.deactivateRobot(req.body as string) as Result<IRobotDTO>;

            if (robotOrError.isFailure) {
                return res.status(402).send(robotOrError.errorValue());
            }

            const robotDTO = robotOrError.getValue();
            return res.json(robotDTO).status(201);

        } catch (e) {
            return next(e);
        }
    }
}