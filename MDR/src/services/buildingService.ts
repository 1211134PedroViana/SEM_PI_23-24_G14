import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import { Building } from '../domain/building';
import { Floor } from '../domain/floor';
import IBuildingDTO from '../dto/IBuildingDTO';
import { BuildingMap } from '../mappers/BuildingMap';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IFloorRepo from './IRepos/IFloorRepo';
import IBuildingService from './IServices/IBuildingService';
import IFloorService from './IServices/IFloorService';
import { BuildingCode } from "../domain/valueObjects/buildingCode";
import { Description } from "../domain/valueObjects/description";
import IFloorDTO from '../dto/IFloorDTO';

@Service()
export default class BuildingService implements IBuildingService {
    constructor(
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo
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

    public async getBuildingById( buildingId: string): Promise<Result<IBuildingDTO>> {
      try {
        const building = await this.buildingRepo.findByDomainId(buildingId);
  
        if (building === null) {
          return Result.fail<IBuildingDTO>('Building with Building ID "' + buildingId + '" not found');
        }

        const buildingDTO = BuildingMap.toDTO( building ) as IBuildingDTO;
  
        return Result.ok(buildingDTO);
      } catch (e) {
        return Result.fail<IBuildingDTO>(e.message);
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

    public async getAllBuildingsWithMinAndMaxFloors(min: number, max: number): Promise<Result<IBuildingDTO[]>> {
        try {
          const buildingList: Building[] = await this.buildingRepo.findAll();
          let buildingListDto: IBuildingDTO[] = []; 
          let buildingListDtoWithMinAndMaxFloors: IBuildingDTO[] = [];
          let tempBuildingFloorList: Floor[] = [];

          if (isNaN(min) || isNaN(max)) {
            console.error('Invalid min or max values. Please provide valid numbers.');
            return Result.fail<IBuildingDTO[]>("Invalid min or max values. Please provide valid numbers.");
          }
          
          if (buildingList != null){
            for (let i = 0; i < buildingList.length; i++)
            buildingListDto.push(BuildingMap.toDTO(buildingList[i]));
          }

          if (buildingListDto != null) {
            for (let i = 0; i < buildingListDto.length; i++) {
              
              tempBuildingFloorList = await this.floorRepo.findByBuilding(buildingListDto[i].id);
              if (tempBuildingFloorList != null) {
                if (tempBuildingFloorList.length >= min && tempBuildingFloorList.length <= max) {
                  buildingListDtoWithMinAndMaxFloors.push(buildingListDto[i]);
                }
              }
              tempBuildingFloorList = [];
            }
            return Result.ok<IBuildingDTO[]>(buildingListDtoWithMinAndMaxFloors);
          }
          return Result.fail<IBuildingDTO[]>("There are no buildings to return.");
        } catch (e) {
          return Result.fail<IBuildingDTO[]>(e.message);
        }
    }
}