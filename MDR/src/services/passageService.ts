import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IPassageService from './IServices/IPassageService';
import IPassageRepo from './IRepos/IPassageRepo';
import IPassageDTO from '../dto/IPassageDTO';
import IFloorRepo from './IRepos/IFloorRepo';
import { Location } from '../domain/valueObjects/location';
import { Passage } from '../domain/passage';
import { PassageMap } from '../mappers/PassageMap';
import { Description } from '../domain/valueObjects/description';
import IBuildingRepo from "./IRepos/IBuildingRepo";
import { forEach } from 'lodash';

@Service()
export default class PassageService implements IPassageService {
  constructor(
    @Inject(config.repos.passage.name) private passageRepo: IPassageRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
  ) {}

  public async createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    try {
      const fromBuilding = await this.buildingRepo.findByDomainId(passageDTO.fromBuildingId);
      const toBuilding = await this.buildingRepo.findByDomainId(passageDTO.toBuildingId);
      const fromFloor = await this.floorRepo.findByDomainId(passageDTO.fromFloorId);
      const toFloor = await this.floorRepo.findByDomainId(passageDTO.toFloorId);

      const locationOrError = Location.create({
        positionX: passageDTO.location.positionX,
        positionY: passageDTO.location.positionY,
        direction: passageDTO.location.direction,
      });

      const description = Description.create(passageDTO.description);

      if (fromBuilding === null || fromBuilding === undefined) {
        return Result.fail<IPassageDTO>('Building with ID "' + passageDTO.fromBuildingId + '" not found');
      }

      if (toBuilding === null || toBuilding === undefined) {
        return Result.fail<IPassageDTO>('Building with ID "' + passageDTO.toBuildingId + '" not found');
      }

      if (fromFloor === null || fromFloor === undefined) {
        return Result.fail<IPassageDTO>('Floor with ID "' + passageDTO.fromFloorId + '" not found');
      }

      if (toFloor === null || toFloor === undefined) {
        return Result.fail<IPassageDTO>('Floor with ID "' + passageDTO.toFloorId + '" not found');
      }

      if (locationOrError.isFailure) {
        return Result.fail<IPassageDTO>('Invalid Location');
      }

      const passageOrError = await Passage.create(passageDTO);

      if (passageOrError.isFailure) {
        return Result.fail<IPassageDTO>(passageOrError.errorValue());
      }

      const passageResult = passageOrError.getValue();

      await this.passageRepo.save(passageResult);

      const passageDTOResult = PassageMap.toDTO(passageResult) as IPassageDTO;
      return Result.ok<IPassageDTO>(passageDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getAllPassages(): Promise<Result<IPassageDTO[]>> {
    try {
      const passageList: Passage[] = await this.passageRepo.findAll();
      const passageListDto: IPassageDTO[] = [];

      if (passageList != null) {
        for (let i = 0; i < passageList.length; i++) passageListDto.push(PassageMap.toDTO(passageList[i]));
        return Result.ok<IPassageDTO[]>(passageListDto);
      }
      return Result.fail<IPassageDTO[]>('There are no passages to return.');
    } catch (e) {
      return Result.fail<IPassageDTO[]>(e.message);
    }
  }

  public async updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    try {
      const passage = await this.passageRepo.findByDomainId(passageDTO.id);
      const fromFloor = await this.floorRepo.findByObjectId(passageDTO.fromFloorId);
      const toFloor = await this.floorRepo.findByObjectId(passageDTO.toFloorId);
      const location = Location.create({
        positionX: passageDTO.location.positionX,
        positionY: passageDTO.location.positionY,
        direction: passageDTO.location.direction,
      });

      if (passage === null) {
        return Result.fail<IPassageDTO>('Passage not found with id:' + passageDTO.id);
      } else {
        if (fromFloor === null || fromFloor === undefined) {
          return Result.fail<IPassageDTO>('Floor with ID "' + passageDTO.fromFloorId + '" not found');
        } else if (toFloor === null || toFloor === undefined) {
          return Result.fail<IPassageDTO>('Floor with ID "' + passageDTO.toFloorId + '" not found');
        } else {
          passage.fromFloorId = passageDTO.fromFloorId;
          passage.toFloorId = passageDTO.toFloorId;
          passage.location = location.getValue();

          await this.passageRepo.save(passage);
          const passageDTOResult = PassageMap.toDTO(passage) as IPassageDTO;
          return Result.ok<IPassageDTO>(passageDTOResult);
        }
      }
    } catch (e) {
      throw e;
    }
  }

  public async allPassagesBetweenBuildings(
    fromBuildingID: string,
    toBuildingID: string,
    passageDTO: IPassageDTO[],
  ): Promise<Result<IPassageDTO[]>> {
    try {
      const passageListDto: IPassageDTO[] = [];
      if (passageDTO != null) {
        for (let index = 0; index < passageDTO.length; index++) {
          const fromFloor = await this.floorRepo.findByDomainId(passageDTO[index].fromFloorId);
          const toFloor = await this.floorRepo.findByDomainId(passageDTO[index].toFloorId);
          if (
            (fromFloor.buildingId == fromBuildingID && toFloor.buildingId == toBuildingID) ||
            (fromFloor.buildingId == toBuildingID && toFloor.buildingId == fromBuildingID)
          ) {
            passageListDto.push(passageDTO[index]);
          }
        }
        return Result.ok<IPassageDTO[]>(passageListDto);
      }
      return Result.fail<IPassageDTO[]>('There are no passages to return.');
    } catch (error) {
      return Result.fail<IPassageDTO[]>(error.message);
    }
  }

  public async getPassageByFloorId(floorId: string): Promise<Result<IPassageDTO[]>> {
    try {
      const passageList: Passage[] = await this.passageRepo.findByFloorId(floorId);
      const passageListDto: IPassageDTO[] = [];

      if (passageList != null) {
        for (let i = 0; i < passageList.length; i++) passageListDto.push(PassageMap.toDTO(passageList[i]));
        return Result.ok<IPassageDTO[]>(passageListDto);
      }
      return Result.fail<IPassageDTO[]>('There are no passages to return.');
      
    } catch (error) {
      return Result.fail<IPassageDTO[]>(error.message);
    }
  }
}
