import { Request, Response, NextFunction } from 'express';

export default interface IElevatorController {
  createElevator(req: Request, res: Response, next: NextFunction);
  updateElevator(req: Request, res: Response, next: NextFunction);
  listElevators(req: Request, res: Response, next: NextFunction);
  listAllFloorsServedByElevator(req: Request, res: Response, next: NextFunction);
  getElevatorByBuilding(req: Request, res: Response, next: NextFunction);
  getElevatorByDescription(req: Request, res: Response, next: NextFunction);
}
