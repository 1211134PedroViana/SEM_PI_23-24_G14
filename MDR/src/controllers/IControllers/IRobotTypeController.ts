import { Request, Response, NextFunction } from 'express';

export default interface IRobotTypeController  {
    createRobotType(req: Request, res: Response, next: NextFunction);
    getAllRobotTypes(req: Request, res: Response, next: NextFunction);
}