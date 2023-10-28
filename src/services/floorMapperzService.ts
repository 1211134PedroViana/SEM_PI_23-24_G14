import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IFloorMapperzService from './IServices/IFloorMapperz';
import IFloorMapperzRepo from './IRepos/IFloorMapperzRepo';
import IFloorMapperzDTO from '../dto/IFloorMapperzDTO';
import IPassageRepo from './IRepos/IPassageRepo';
import IRoomRepo from './IRepos/IRoomRepo';
import IElevatorRepo from './IRepos/IElevatorRepo';
import { FloorMapElevator } from '../domain/valueObjects/fMapElevator';
import { Location } from '../domain/location';
import { FloorMapRoom } from '../domain/valueObjects/fMapRoom';
import { FloorMapPassage } from '../domain/valueObjects/fMapPassage';
import { Dimension } from '../domain/dimension';
import { FloorMapperz } from '../domain/floorMapperz';
import { FloorMapperzMap } from '../mappers/FloorMapperzMap';
import IFloorRepo from './IRepos/IFloorRepo';

@Service()
export default class FloorMapperzService implements IFloorMapperzService {
    constructor(
        @Inject(config.repos.floorMapperz.name) private floorMapperzRepo : IFloorMapperzRepo,
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
        @Inject(config.repos.passage.name) private passageRepo : IPassageRepo,
        @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
        @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo
    ) {}

    public async loadFloorMap(floorMapperzDTO: IFloorMapperzDTO): Promise<Result<IFloorMapperzDTO>> {
        try {   

            const fMapRooms = [];
            const fMapPassages = [];

            const floor = await this.floorRepo.findByObjectId(floorMapperzDTO.floorId);
            const elevator = await this.elevatorRepo.findByObjectId(floorMapperzDTO.fMapElevator.elevatorId);

            if (floor === null) {
                return Result.fail<IFloorMapperzDTO>('Floor with ID "' + floorMapperzDTO.floorId + '" not found');
            }

            if (elevator === null) {
                return Result.fail<IFloorMapperzDTO>('Elevator with ID "' + floorMapperzDTO.fMapElevator.elevatorId + '" not found');
            }

            for (let i = 0; i < floorMapperzDTO.fMapRooms.length; i++) {
                let room = await this.elevatorRepo.findByObjectId(floorMapperzDTO.fMapRooms[i].roomId);
                if(room === null) {
                    return Result.fail<IFloorMapperzDTO>('Room with ID "' + floorMapperzDTO.fMapRooms[i].roomId + '" not found')
                }
            }

            for (let i = 0; i < floorMapperzDTO.fMapPassages.length; i++) {
                let passage = await this.passageRepo.findByObjectId(floorMapperzDTO.fMapPassages[i].passageId);
                if(passage === null) {
                    return Result.fail<IFloorMapperzDTO>('Passage with ID "' + floorMapperzDTO.fMapPassages[i].passageId + '" not found')
                }
            }

            const elevatorLocation = Location.create({
                positionX: floorMapperzDTO.fMapElevator.location.positionX,
                positionY: floorMapperzDTO.fMapElevator.location.positionY,
                direction: floorMapperzDTO.fMapElevator.location.direction
            });

        
            const fMapElevator = FloorMapElevator.create({
                elevatorId: floorMapperzDTO.fMapElevator.elevatorId,
                location: elevatorLocation.getValue()
            });

            for (let i = 0; i < floorMapperzDTO.fMapRooms.length; i++) {
                const roomDimension = Dimension.create({
                    pos1: floorMapperzDTO.fMapRooms[i].dimension.pos1,
                    pos2: floorMapperzDTO.fMapRooms[i].dimension.pos2,
                    pos3: floorMapperzDTO.fMapRooms[i].dimension.pos3,
                    pos4: floorMapperzDTO.fMapRooms[i].dimension.pos4
                });
                const roomLocation = Location.create({
                    positionX: floorMapperzDTO.fMapRooms[i].location.positionX,
                    positionY: floorMapperzDTO.fMapRooms[i].location.positionY,
                    direction: floorMapperzDTO.fMapRooms[i].location.direction
                });
                let room = FloorMapRoom.create({
                    roomId: floorMapperzDTO.fMapRooms[i].roomId,
                    dimension: roomDimension.getValue(),
                    location: roomLocation.getValue()
                });
                fMapRooms.push(room.getValue());
            }


            for (let i = 0; i < floorMapperzDTO.fMapPassages.length; i++) {
                const passageLocation = Location.create({
                    positionX: floorMapperzDTO.fMapPassages[i].location.positionX,
                    positionY: floorMapperzDTO.fMapPassages[i].location.positionY,
                    direction: floorMapperzDTO.fMapPassages[i].location.direction
                });
                let passage = FloorMapPassage.create({
                    passageId: floorMapperzDTO.fMapPassages[i].passageId,
                    location: passageLocation.getValue()
                });
                fMapPassages.push(passage.getValue());
            }

            const floorMapperzOrError = FloorMapperz.create({
                floorId: floorMapperzDTO.floorId,
                map: floorMapperzDTO.map,
                fMapRooms: fMapRooms,
                fMapPassages: fMapPassages,
                fMapElevator: fMapElevator.getValue()
            });

            if (floorMapperzOrError.isFailure) {
                return Result.fail<IFloorMapperzDTO>('Failed to load Floor Map');
            }
        
          await this.floorMapperzRepo.save(floorMapperzOrError.getValue());
      
          const floorMapDTOResult = FloorMapperzMap.toDTO( floorMapperzOrError.getValue() ) as IFloorMapperzDTO;
            return Result.ok<IFloorMapperzDTO>( floorMapDTOResult )
        } catch (e) {
            throw e;
        }
    }
}