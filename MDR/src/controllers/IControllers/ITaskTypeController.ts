import { Request, Response, NextFunction } from 'express';

export default interface ITaskTypeController  {
    createTaskType(req: Request, res: Response, next: NextFunction);
    getTaskType(req: Request, res: Response, next: NextFunction);
    getTaskTypeById(req: Request, res: Response, next: NextFunction);
}