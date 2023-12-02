import { Result } from "../../core/logic/Result";
import IRoomDTO from "../../dto/IRoomDTO";

export default interface IRoomService {

    createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
    updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
    getAllRooms(): Promise<Result<IRoomDTO[]>>;
    getRoomsByFloorId(floorId: string): Promise<Result<IRoomDTO[]>>;
    getRoomByDescription(description: string): Promise<Result<IRoomDTO>>;
}