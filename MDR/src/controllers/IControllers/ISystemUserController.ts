import { Request, Response, NextFunction } from 'express';

export default interface ISystemUserController {
  createSystemUser(req: Request, res: Response, next: NextFunction);
}
