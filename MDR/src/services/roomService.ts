import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import { Location } from '../domain/valueObjects/location';
import { Room } from '../domain/room';
import {Description} from "../domain/valueObjects/description";
import IRoomDTO from "../dto/IRoomDTO";
import IRoomService from "./IServices/IRoomService";
import {RoomCode} from "../domain/valueObjects/RoomCode";
import {Dimension} from "../domain/valueObjects/dimension";
import {RoomMap} from "../mappers/RoomMap";
import IRoomRepo from "./IRepos/IRoomRepo";
import IFloorRepo from './IRepos/IFloorRepo';

@Service()
export default class RoomService implements IRoomService {
    constructor(
        @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo
    ) {}

    public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
        try {

            const floor = await this.floorRepo.findByDomainId(roomDTO.floorId);

            if (floor === null) {
                return Result.fail<IRoomDTO>('Floor with ID "' + roomDTO.floorId + '" not found');
            }

            const codeOrError = RoomCode.create(roomDTO.code);
            const description = Description.create(roomDTO.description);

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

            if (codeOrError.isFailure) {
                return Result.fail<IRoomDTO>('Invalid Room Code');
            }

            if (description.isFailure) {
                return Result.fail<IRoomDTO>('Invalid Room Description');
            }

            if (dimensionOrError.isFailure) {
                return Result.fail<IRoomDTO>('Invalid Dimensions');
            }

            if (locationOrError.isFailure) {
                return Result.fail<IRoomDTO>('Invalid Location');
            }

            const roomOrError = await Room.create(roomDTO);

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

    public async updateRoom(roomDTO:IRoomDTO): Promise<Result<IRoomDTO>> {
        try {

            const room = await this.roomRepo.findByDomainId(roomDTO.id);

            const codeOrError = Description.create(roomDTO.code);

            if (room === null) {
                return Result.fail<IRoomDTO>('Room not found with id:' + roomDTO.id);
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

    public async getRoomsByFloorId(floorId: string): Promise<Result<IRoomDTO[]>> {
        try {
          const roomList: Room[] = await this.roomRepo.findByFloorId(floorId);
          const roomListDto: IRoomDTO[] = [];
    
          if (roomList != null) {
            for (let i = 0; i < roomList.length; i++) roomListDto.push(RoomMap.toDTO(roomList[i]));
            return Result.ok<IRoomDTO[]>(roomListDto);
          }
          return Result.fail<IRoomDTO[]>('There are no rooms to return.');
          
        } catch (error) {
          return Result.fail<IRoomDTO[]>(error.message);
        }
      }
}