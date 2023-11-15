import { Request, Response, NextFunction } from 'express';

export default interface IFloorMapperzController  {
    loadFloorMap(req: Request, res: Response, next: NextFunction);
    getFloorMap(req: Request, res: Response, next: NextFunction);

}