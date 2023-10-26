import { Code } from "mongodb";
import { Repo } from "../../core/infra/Repo";
import { Elevator } from "../../domain/elevator";
import {BuildingId} from "../../domain/buildingId";
import {Building} from "../../domain/building";
import {ElevatorCode} from "../../domain/elevatorCode";
import {Room} from "../../domain/room";

export default interface IRoomRepo extends Repo<Room> {
    save(room: Room): Promise<Room>;
    findByDomainId(roomId: Code | string): Promise<Room>;
    findAll(): Promise<Room[]>;

}