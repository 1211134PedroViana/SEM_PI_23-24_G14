import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IElevatorService from './IServices/IElevatorService';
import IElevatorRepo from './IRepos/IElevatorRepo';
import IElevatorDTO from '../dto/IElevatorDTO';
import { Location } from '../domain/location';
import { Room } from '../domain/room';
import { ElevatorMap } from '../mappers/ElevatorMap';
import IBuildingDTO from "../dto/IBuildingDTO";
import {Description} from "../domain/description";
import {BuildingMap} from "../mappers/BuildingMap";
import {BuildingCode} from "../domain/buildingCode";
import IRoomDTO from "../dto/IRoomDTO";
import IRoomService from "./IServices/IRoomService";
import {RoomCode} from "../domain/RoomCode";
import {Dimension} from "../domain/dimension";
import {RoomMap} from "../mappers/RoomMap";
import IRoomRepo from "./IRepos/IRoomRepo";

@Service()
export default class RoomService implements IRoomService {
    constructor(
        @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
    ) {}

    public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
        try {

            const codeOrError = RoomCode.create(roomDTO.code);
            const dimensionOrError = Dimension.create({
                pos1: roomDTO.dimension.pos1,
                pos2: roomDTO.dimension.pos2,
                pos3: roomDTO.dimension.pos3,
                pos4: roomDTO.dimension.pos4,
            });
            const locationOrError = Location.create({
                positionX: roomDTO.location.positionX,
                positionY: roomDTO.location.positionY,
                direction: roomDTO.location.direction,
            });

            if (locationOrError.isFailure) {
                return Result.fail<IRoomDTO>('Invalid Location');
            }

            const roomOrError = await Room.create({
                roomCode: codeOrError.getValue(),
                dimension: dimensionOrError.getValue(),
                location: locationOrError.getValue(),
            });

            if (roomOrError.isFailure) {
                return Result.fail<IRoomDTO>(roomOrError.errorValue());
            }

            const roomResult = roomOrError.getValue();

            await this.roomRepo.save(roomResult);

            const roomDTOResult = RoomMap.toDTO( roomResult ) as IRoomDTO;
            return Result.ok<IRoomDTO>( roomDTOResult )
        } catch (e) {
            throw e;
        }
    }

    public async updateRoom(roomDTO:IElevatorDTO): Promise<Result<IRoomDTO>> {
        try {

            const room = await this.roomRepo.findByDomainId(roomDTO.code);

            const codeOrError = Description.create(roomDTO.code);

            if (room === null) {
                return Result.fail<IRoomDTO>('Elevator not found with code:' + roomDTO.code);
            }else{
                if (codeOrError.isFailure) {
                    return Result.fail<IRoomDTO>('Error updating room -> Invalid Code!');
                }else{
                    await this.roomRepo.save(room);
                    const roomDTOTest = RoomMap.toDTO( room ) as IRoomDTO;
                    return Result.ok<IRoomDTO>( roomDTOTest );
                }
            }

        } catch (e) {
            throw e;
        }
    }

    public async getAllRooms(): Promise<Result<IRoomDTO[]>> {
        try {
            const roomsList: Room[] = await this.roomRepo.findAll();
            let roomListDto: IRoomDTO[] = [];

            if (roomsList != null){
                for (let i = 0; i < roomsList.length; i++)
                    roomListDto.push(RoomMap.toDTO(roomsList[i]));
                return Result.ok<IRoomDTO[]>(roomListDto);
            }
            return Result.fail<IRoomDTO[]>("There are no rooms to return.");
        } catch (e) {
            return Result.fail<IRoomDTO[]>(e.message);
        }
    }
}