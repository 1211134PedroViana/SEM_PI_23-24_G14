import { Request, Response, NextFunction } from 'express';

export default interface IRobotController {
    createRobot(req: Request, res: Response, next: NextFunction);
    updateRobot(req: Request, res: Response, next: NextFunction);
    deactivateRobot(req: Request, res: Response, next: NextFunction);
    listRobots(req: Request, res: Response, next: NextFunction);
    findRobotByNickname(req: Request, res: Response, next: NextFunction);
    findRobotsByNicknameOrTaskType(req: Request, res: Response, next: NextFunction);
}