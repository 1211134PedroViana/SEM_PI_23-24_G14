import { Request, Response, NextFunction } from 'express';

export default interface IPassageController {
  createPassage(req: Request, res: Response, next: NextFunction);
  listPassages(req: Request, res: Response, next: NextFunction);
  listPassagesBetweenBuildings(req: Request, res: Response, next: NextFunction);
  updatePassage(req: Request, res: Response, next: NextFunction);
  getPassagesByFloor(req: Request, res: Response, next: NextFunction);
  getPassageByDescription(req: Request, res: Response, next: NextFunction);
}
