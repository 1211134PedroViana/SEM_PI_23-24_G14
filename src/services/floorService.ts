import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IFloorService from './IServices/IFloorService';
import IFloorRepo from './IRepos/IFloorRepo';
import IFloorDTO from '../dto/IFloorDTO';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { Description } from '../domain/description';
import { Floor } from '../domain/floor';
import { FloorMap } from '../mappers/FloorMap';
import { Cell } from '../domain/cell';

@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
    ) {}

    public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {          
         
          const building = await this.buildingRepo.findByObjectId(floorDTO.buildingId);
          const descriptionOrError = Description.create(floorDTO.description);
          
          if (building === null) {
            return Result.fail<IFloorDTO>('Building with ID "' + floorDTO.buildingId + '" not found');
          }

          if (descriptionOrError.isFailure && floorDTO.description != undefined) {
            return Result.fail<IFloorDTO>('Invalid Description!');
          }

          const floorOrError = await Floor.create({
            buildingId: building.id.toString(),
            floorNumber: floorDTO.floorNumber,
            description: descriptionOrError.getValue(),
          });

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

}