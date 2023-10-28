import { Code } from "mongodb";
import { Repo } from "../../core/infra/Repo";
import {Room} from "../../domain/room";

export default interface IRoomRepo extends Repo<Room> {
    save(room: Room): Promise<Room>;
    findByDomainId(roomId: Code | string): Promise<Room>;
    findByObjectId(roomId: string): Promise<Room>;
    findAll(): Promise<Room[]>;

}