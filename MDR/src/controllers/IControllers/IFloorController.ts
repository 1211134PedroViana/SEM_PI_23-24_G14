import { Request, Response, NextFunction } from 'express';

export default interface IFloorController  {
    createFloor(req: Request, res: Response, next: NextFunction);
    updateFloor(req: Request, res: Response, next: NextFunction);
    listFloors(req: Request, res: Response, next: NextFunction);
    listFloorsWithPassage(req: Request, res: Response, next: NextFunction);
    listFloorsFromBuilding(req: Request, res: Response, next: NextFunction);
    getFloorById(req: Request, res: Response, next: NextFunction);
}