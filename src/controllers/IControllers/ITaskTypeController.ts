import { Request, Response, NextFunction } from 'express';

export default interface ITaskTypeController  {
    createTaskType(req: Request, res: Response, next: NextFunction);
}