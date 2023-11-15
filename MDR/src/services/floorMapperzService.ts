import { Service, Inject } from 'typedi';
import multer from 'multer';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IFloorMapperzService from './IServices/IFloorMapperz';
import IFloorMapperzRepo from './IRepos/IFloorMapperzRepo';
import IFloorMapperzDTO from '../dto/IFloorMapperzDTO';
import IPassageRepo from './IRepos/IPassageRepo';
import IRoomRepo from './IRepos/IRoomRepo';
import IElevatorRepo from './IRepos/IElevatorRepo';
import { FloorMapElevator } from '../domain/valueObjects/fMapElevator';
import { Location } from '../domain/valueObjects/location';
import { FloorMapRoom } from '../domain/valueObjects/fMapRoom';
import { FloorMapPassage } from '../domain/valueObjects/fMapPassage';
import { Dimension } from '../domain/valueObjects/dimension';
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

    public async loadFloorMap(file: Express.Multer.File, floorMapperzDTO: IFloorMapperzDTO): Promise<Result<IFloorMapperzDTO>> {
        try {   

            const fileUrl = "assets/mazes/" + file.originalname;
            floorMapperzDTO.fileUrl = fileUrl;

            const floor = await this.floorRepo.findByDomainId(floorMapperzDTO.floorId);
            const elevator = await this.elevatorRepo.findByDomainId(floorMapperzDTO.floorElevator.elevatorId);

            if (floor === null) {
                return Result.fail<IFloorMapperzDTO>('Floor with ID "' + floorMapperzDTO.floorId + '" not found');
            }

            if (elevator === null) {
                return Result.fail<IFloorMapperzDTO>('Elevator with ID "' + floorMapperzDTO.floorElevator.elevatorId + '" not found');
            }

            for (let i = 0; i < floorMapperzDTO.room.length; i++) {
                let room = await this.roomRepo.findByDomainId(floorMapperzDTO.room[i].roomId);
                if(room === null) {
                    return Result.fail<IFloorMapperzDTO>('Room with ID "' + floorMapperzDTO.room[i].roomId + '" not found')
                }
            }

            if(floorMapperzDTO.passage != undefined) {
                for (let i = 0; i < floorMapperzDTO.passage.length; i++) {
                    let passage = await this.passageRepo.findByDomainId(floorMapperzDTO.passage[i].passageId);
                    if(passage === null) {
                        return Result.fail<IFloorMapperzDTO>('Passage with ID "' + floorMapperzDTO.passage[i].passageId + '" not found')
                    }
                }
            }

            const floorMapperzOrError = FloorMapperz.create({
                floorId: floorMapperzDTO.floorId,
                fileUrl: floorMapperzDTO.fileUrl
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

    public async getFloorMap(floorId: string): Promise<Result<IFloorMapperzDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorId);

            if (floor === null) {
                return Result.fail<IFloorMapperzDTO>('Floor with ID "' + floorId + '" not found');
            }

            const floorMap = await this.floorMapperzRepo.findByFloorId(floorId);
            
            if(floorMap != null) {
                const floorMapDto = FloorMapperzMap.toDTO(floorMap);
                return Result.ok<IFloorMapperzDTO>(floorMapDto);
            } else {
                return Result.fail<IFloorMapperzDTO>('Floor Map with Floor ID "' + floorId + '" not found');
            }
            
        } catch (e) {
            return Result.fail<IFloorMapperzDTO>(e.message);
        }
    }
}