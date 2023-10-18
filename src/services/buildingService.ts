import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import { Building } from '../domain/building';
import IBuildingDTO from '../dto/IBuildingDTO';
import { BuildingMap } from '../mappers/BuildingMap';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IBuildingService from './IServices/IBuildingService';
import { BuildingCode } from "../domain/buildingCode";
import { Description } from "../domain/description";

@Service()
export default class BuildingService implements IBuildingService {
    constructor(
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
    ) {}

    public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try {          
          const buildingCodeOrError = BuildingCode.create(buildingDTO.code);
          const descriptionOrError = Description.create(buildingDTO.description);
          
          if (buildingCodeOrError.isFailure) {
            return Result.fail<IBuildingDTO>('Invalid Building Code!');
          }

          if (descriptionOrError.isFailure) {
            return Result.fail<IBuildingDTO>('Invalid Description!');
          }

          const buildingOrError = await Building.create({
            code: buildingCodeOrError.getValue(),
            description: descriptionOrError.getValue(),
            name: buildingDTO.name,
          });


          if (buildingOrError.isFailure) {
            return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
          }
      
          const buildingResult = buildingOrError.getValue();
      
          await this.buildingRepo.save(buildingResult);
      
          const buildingDTOResult = BuildingMap.toDTO( buildingResult ) as IBuildingDTO;
            return Result.ok<IBuildingDTO>( buildingDTOResult )
          } catch (e) {
            throw e;
        }
    }
}