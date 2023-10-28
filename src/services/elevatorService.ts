import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IElevatorService from './IServices/IElevatorService';
import IElevatorRepo from './IRepos/IElevatorRepo';
import IElevatorDTO from '../dto/IElevatorDTO';
import { Location } from '../domain/location';
import { Elevator } from '../domain/elevator';
import { ElevatorMap } from '../mappers/ElevatorMap';
import { ElevatorCode } from '../domain/elevatorCode';
import IBuildingRepo from './IRepos/IBuildingRepo';

@Service()
export default class ElevatorService implements IElevatorService {
    constructor(
        @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo,
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
    ) {}

    public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try {       
          
          const building = await this.buildingRepo.findByObjectId(elevatorDTO.buildingId);
          
          const codeOrError = ElevatorCode.create(elevatorDTO.code);
        
          const locationOrError = Location.create({
            positionX: elevatorDTO.location.positionX,
            positionY: elevatorDTO.location.positionY,
            direction: elevatorDTO.location.direction,
          });

          if (building === null) {
            return Result.fail<IElevatorDTO>('Building with ID "' + elevatorDTO.buildingId + '" not found');
          }

          if (codeOrError.isFailure) {
            return Result.fail<IElevatorDTO>('Invalid Code');
          }

          if (locationOrError.isFailure) {
            return Result.fail<IElevatorDTO>('Invalid Location');
          }

          const elevatorOrError = await Elevator.create(elevatorDTO);

          if (elevatorOrError.isFailure) {
            return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
          }
      
          const elevatorResult = elevatorOrError.getValue();
      
          await this.elevatorRepo.save(elevatorResult);
      
          const elevatorDTOResult = ElevatorMap.toDTO( elevatorResult ) as IElevatorDTO;
            return Result.ok<IElevatorDTO>( elevatorDTOResult )
          } catch (e) {
            throw e;
        }
    }

    public async getAllElevators(): Promise<Result<IElevatorDTO[]>> {
      try {
        const elevatorList: Elevator[] = await this.elevatorRepo.findAll();
        let elevatorListDto: IElevatorDTO[] = [];
  
        if (elevatorList != null){
          for (let i = 0; i < elevatorList.length; i++)
          elevatorListDto.push(ElevatorMap.toDTO(elevatorList[i]));
          return Result.ok<IElevatorDTO[]>(elevatorListDto);
        }
        return Result.fail<IElevatorDTO[]>("There are no elevators to return.");
      } catch (e) {
        return Result.fail<IElevatorDTO[]>(e.message);
      }
    }
}
