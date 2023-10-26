import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IElevatorService from './IServices/IElevatorService';
import IElevatorRepo from './IRepos/IElevatorRepo';
import IElevatorDTO from '../dto/IElevatorDTO';
import { Location } from '../domain/location';
import { Elevator } from '../domain/elevator';
import { ElevatorMap } from '../mappers/ElevatorMap';
import IBuildingDTO from "../dto/IBuildingDTO";
import {Description} from "../domain/description";
import {BuildingMap} from "../mappers/BuildingMap";
import {BuildingCode} from "../domain/buildingCode";

@Service()
export default class ElevatorService implements IElevatorService {
    constructor(
        @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo,
    ) {}

    public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try {

            const codeOrError = BuildingCode.create(elevatorDTO.code);
            const locationOrError = Location.create({
            positionX: elevatorDTO.location.positionX,
            positionY: elevatorDTO.location.positionY,
            direction: elevatorDTO.location.direction,
          });

          if (locationOrError.isFailure) {
            return Result.fail<IElevatorDTO>('Invalid Location');
          }

          const elevatorOrError = await Elevator.create({
              code: codeOrError.getValue(),
              location: locationOrError.getValue(),
          });

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

    public async updateElevator(elevatorDTO:IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try {

            const elevator = await this.elevatorRepo.findByDomainId(elevatorDTO.code);

            const codeOrError = Description.create(elevatorDTO.code);

            if (elevator === null) {
                return Result.fail<IElevatorDTO>('Elevator not found with code:' + elevatorDTO.code);
            }else{
                if (codeOrError.isFailure) {
                    return Result.fail<IElevatorDTO>('Error updating elevator -> Invalid Code!');
                }else{
                    await this.elevatorRepo.save(elevator);
                    const elevatorDTOTest = ElevatorMap.toDTO( elevator ) as IElevatorDTO;
                    return Result.ok<IElevatorDTO>( elevatorDTOTest );
                }
            }

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
