import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IElevatorController from './IControllers/IElevatorController';
import IElevatorService from '../services/IServices/IElevatorService';
import IElevatorDTO from '../dto/IElevatorDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IBuildingDTO from "../dto/IBuildingDTO";
import IRoomController from "./IControllers/IRoomController";
import IRoomService from "../services/IServices/IRoomService";
import IRoomDTO from "../dto/IRoomDTO";


@Service()
export default class RoomController implements IRoomController {
    constructor(
        @Inject(config.services.room.name) private roomServiceInstance: IRoomService
    ) {
    }

    public async createRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const roomOrError = await this.roomServiceInstance.createRoom(req.body as IRoomDTO) as Result<IRoomDTO>;

            if(roomOrError.isFailure) {
                return res.status(402).send(roomOrError.errorValue());
            }

            const elevatorDTO = roomOrError.getValue();

            return res.json( elevatorDTO ).status(201);

        } catch (e) {
            return next(e);
        }
    }

    public async updateRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const roomOrError = await this.roomServiceInstance.updateRoom(req.body as IRoomDTO) as Result<IRoomDTO>;

            if(roomOrError.isFailure) {
                return res.status(402).send(roomOrError.errorValue());
            }

            const roomDTO = roomOrError.getValue();
            return res.json( roomDTO ).status(201);

        } catch (e) {
            return next(e);
        }
    }

    public async listRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const roomListOrError = await this.roomServiceInstance.getAllRooms() as Result<IRoomDTO[]>;

            if(roomListOrError.isFailure) {
                return res.status(402).send(roomListOrError.errorValue());
            }

            const roomListDTO = roomListOrError.getValue();
            return res.json( roomListDTO ).status(201);

        } catch (e) {
            return next(e);
        }
    }

    public async getRoomsByFloor(req: Request, res: Response, next: NextFunction) {
        try {
          let floorId = req.params.floorId;
          const roomsOrError = await this.roomServiceInstance.getRoomsByFloorId(floorId) as Result<IRoomDTO[]>;
      
          if (roomsOrError.isFailure) {
            return res.status(404).send(roomsOrError.errorValue());
          }
      
          const rooms = roomsOrError.getValue();
          return res.json(rooms).status(200);
        } catch (e) {
          return next(e);
        }
    }

    public async getRoomByDescription(req: Request, res: Response, next: NextFunction) {
        try {
          let description = req.params.description;
          const roomOrError = await this.roomServiceInstance.getRoomByDescription(description) as Result<IRoomDTO>;
      
          if (roomOrError.isFailure) {
            return res.status(404).send(roomOrError.errorValue());
          }
      
          const room = roomOrError.getValue();
          return res.json(room).status(200);
        } catch (e) {
          return next(e);
        }
    }
}