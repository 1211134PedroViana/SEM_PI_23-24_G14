import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IFloorService from './IServices/IFloorService';
import IFloorRepo from './IRepos/IFloorRepo';
import IFloorDTO from '../dto/IFloorDTO';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { Description } from '../domain/valueObjects/description';
import { Floor } from '../domain/floor';
import { FloorMap } from '../mappers/FloorMap';
import IPassageDTO from '../dto/IPassageDTO';


@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo
    ) {}

    public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {          
         
          const building = await this.buildingRepo.findByDomainId(floorDTO.buildingId);
          const descriptionOrError = Description.create(floorDTO.description);
          
          if (building === null) {
            return Result.fail<IFloorDTO>('Building with ID "' + floorDTO.buildingId + '" not found');
          }

          if (descriptionOrError.isFailure && floorDTO.description != undefined) {
            return Result.fail<IFloorDTO>('Invalid Description!');
          }

          const floorOrError = await Floor.create(floorDTO);

          if (floorOrError.isFailure) {
            return Result.fail<IFloorDTO>(floorOrError.errorValue());
          }
      
          const floorResult = floorOrError.getValue();
      
          await this.floorRepo.save(floorResult);
      
          const floorDTOResult = FloorMap.toDTO( floorResult ) as IFloorDTO;
            return Result.ok<IFloorDTO>( floorDTOResult )
          } catch (e) {
            throw e;
        }
    }
    public async updateFloor(floorDTO:IFloorDTO): Promise<Result<IFloorDTO>> {
        try {

            const floor = await this.floorRepo.findByDomainId(floorDTO.id);

            const descriptionOrError = Description.create(floorDTO.description);

            if (floor === null) {
                return Result.fail<IFloorDTO>('Floor not found with id:' + floorDTO.id);
            }else{
                if (descriptionOrError.isFailure) {
                    return Result.fail<IFloorDTO>('Error updating floor -> Invalid Description!');
                }else{
                    floor.floorNumber = floorDTO.floorNumber;
                    floor.description = descriptionOrError.getValue();

                    await this.floorRepo.save(floor);
                    const floorDTOResult = FloorMap.toDTO( floor ) as IFloorDTO;
                    return Result.ok<IFloorDTO>( floorDTOResult );
                }
            }

        } catch (e) {
            throw e;
        }
    }

    public async getAllFloors(): Promise<Result<IFloorDTO[]>> {
        try {
            const floorList: Floor[] = await this.floorRepo.findAll();
            let floorListDto: IFloorDTO[] = [];

            if (floorList != null){
                for (let i = 0; i < floorList.length; i++)
                    floorListDto.push(FloorMap.toDTO(floorList[i]));
                return Result.ok<IFloorDTO[]>(floorListDto);
            }
            return Result.fail<IFloorDTO[]>("There are no floors to return.");
        } catch (e) {
            return Result.fail<IFloorDTO[]>(e.message);
        }
    }

    public async getFloorsWithPassage(passageDTO : IPassageDTO[]): Promise<Result<IFloorDTO[]>> {
        try {
            let floorListDto: IFloorDTO[] = [];
            if (passageDTO != null) {
                for (let index = 0; index < passageDTO.length; index++) {
                    const fromFloor = FloorMap.toDTO(await this.floorRepo.findByDomainId(passageDTO[index].fromFloorId));
                    if (!floorListDto.includes(fromFloor)) {
                        floorListDto.push(fromFloor);
                    }
                    const toFloor =FloorMap.toDTO(await this.floorRepo.findByDomainId(passageDTO[index].toFloorId));
                    if (!floorListDto.includes(toFloor)) {
                        floorListDto.push(toFloor);
                    }
                }
                return Result.ok<IFloorDTO[]>(floorListDto);
            }
            return Result.fail<IFloorDTO[]>("There are no floors to return.");
            
        } catch (error) {
            return Result.fail<IFloorDTO[]>(error.message);
        }
    }

    public async getFloorsFromBuilding(buildingId: string): Promise<Result<IFloorDTO[]>> {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingId);

            if (building === null) {
                return Result.fail<IFloorDTO[]>('Building with ID "' + buildingId + '" not found');
            }

            const floorList: Floor[] = await this.floorRepo.findByBuilding(building.id.toString());
            let floorListDto: IFloorDTO[] = [];

            if (floorList != null){
                for (let i = 0; i < floorList.length; i++)
                    floorListDto.push(FloorMap.toDTO(floorList[i]));
                return Result.ok<IFloorDTO[]>(floorListDto);
            }
            return Result.fail<IFloorDTO[]>("There are no floors to return.");
        } catch (e) {
            return Result.fail<IFloorDTO[]>(e.message);
        }
    }
}