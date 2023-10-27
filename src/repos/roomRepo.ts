import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';
import { Elevator } from '../domain/elevator';
import { ElevatorMap } from '../mappers/ElevatorMap';
import { Code } from 'mongodb';
import {BuildingId} from "../domain/buildingId";
import {Building} from "../domain/building";
import {IBuildingPersistence} from "../dataschema/IBuildingPersistence";
import {BuildingMap} from "../mappers/BuildingMap";
import {ElevatorCode} from "../domain/elevatorCode";
import IRoomRepo from "../services/IRepos/IRoomRepo";
import {IRoomPersistence} from "../dataschema/IRoomPersistence";
import {Room} from "../domain/room";
import {RoomMap} from "../mappers/RoomMap";


@Service()
export default class RoomRepo implements IRoomRepo {
    private models: any;

    constructor(
        @Inject('roomSchema') private roomSchema : Model<IRoomPersistence & Document>,
    ) {}

    private createBaseQuery (): any {
        return {
            where: {},
        }
    }

    public async exists(room: Room): Promise<boolean> {
        const idX = room.roomCode instanceof String ? (<String>room.roomCode) : room.roomCode;

        const query = { RoomId: idX};
        const roomDocument = await this.roomSchema.findOne( query as FilterQuery<IRoomPersistence & Document>);
        return !!roomDocument === true;
    }

    public async save(room: Room): Promise<Room> {
        const query = { domainId: room.id.toString()};

        const roomDocument = await this.roomSchema.findOne( query );

        try {
            if(roomDocument === null) {
                const rawRoom: any = RoomMap.toPersistence(room);

                const roomCreated = await this.roomSchema.create(rawRoom);

                return RoomMap.toDomain(roomCreated);
            }else{
                roomDocument.location.positionX = room.location.positionX;
                roomDocument.location.positionY = room.location.positionY;
                roomDocument.location.direction = room.location.direction;
                await roomDocument.save();

                return room;
            }

        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId (roomId: Code | string): Promise<Room> {
        const query = { domainId: roomId};
        const roomRecord = await this.roomSchema.findOne( query as FilterQuery<IRoomPersistence & Document> );

        if( roomRecord != null) {
            return RoomMap.toDomain(roomRecord);
        }
        else
            return null;
    }

    public async findAll(): Promise<Room[]> {
        const roomList = await this.roomSchema.find()
        return RoomMap.toDomainBulk(roomList);
    }
}