import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import { Building } from '../domain/building';
import IBuildingDTO from '../dto/IBuildingDTO';
import { BuildingMap } from '../mappers/BuildingMap';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IBuildingService from './IServices/IBuildingService';
import { BuildingCode } from "../domain/valueObjects/buildingCode";
import { Description } from "../domain/valueObjects/description";

@Service()
export default class BuildingService implements IBuildingService {
    constructor(
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
    ) {}

    public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try {          
         
          const buildingCodeOrError = BuildingCode.create(buildingDTO.code);
          const descriptionOrError = Description.create(buildingDTO.description);
          
          // verifies the code and description creation
          if (buildingCodeOrError.isFailure) {
            return Result.fail<IBuildingDTO>('Invalid Building Code!');
          }

          if (descriptionOrError.isFailure && buildingDTO.description != undefined) {
            return Result.fail<IBuildingDTO>('Invalid Description!');
          }

          // checks if theres already a Building with the code provided
          const buildingDocument = await this.buildingRepo.findByCode(buildingDTO.code);
          const found = !!buildingDocument;
  
          if (found) {
            return Result.fail<IBuildingDTO>('Building already exists with code:' + buildingDTO.code);
          }

          const buildingOrError = await Building.create(buildingDTO);

          if (buildingOrError.isFailure) {
            return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
          }
      
          const buildingResult = buildingOrError.getValue();
      
          // saves the new created building and returns the building DTO 
          await this.buildingRepo.save(buildingResult);
      
          const buildingDTOResult = BuildingMap.toDTO( buildingResult ) as IBuildingDTO;
            return Result.ok<IBuildingDTO>( buildingDTOResult )
          } catch (e) {
            throw e;
        }
    }

    public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
      
      try {

        const building = await this.buildingRepo.findByDomainId(buildingDTO.id);
        
        const descriptionOrError = Description.create(buildingDTO.description);
          
        if (building === null) {
          return Result.fail<IBuildingDTO>('Building not found with id:' + buildingDTO.id);
        }else{
          if (descriptionOrError.isFailure) {
            return Result.fail<IBuildingDTO>('Error updating building -> Invalid Description!');
          }else{
            building.description = descriptionOrError.getValue();
            building.name = buildingDTO.name;

            await this.buildingRepo.save(building);
            const buildingDTOResult = BuildingMap.toDTO( building ) as IBuildingDTO;
            return Result.ok<IBuildingDTO>( buildingDTOResult );
          }
        }

      } catch (e) {
        throw e;
      }
    }

    public async getAllBuildings(): Promise<Result<IBuildingDTO[]>> {
      try {
        const buildingList: Building[] = await this.buildingRepo.findAll();
        let buildingListDto: IBuildingDTO[] = [];
  
        if (buildingList != null){
          for (let i = 0; i < buildingList.length; i++)
          buildingListDto.push(BuildingMap.toDTO(buildingList[i]));
          return Result.ok<IBuildingDTO[]>(buildingListDto);
        }
        return Result.fail<IBuildingDTO[]>("There are no buildings to return.");
      } catch (e) {
        return Result.fail<IBuildingDTO[]>(e.message);
      }
    }

    
}