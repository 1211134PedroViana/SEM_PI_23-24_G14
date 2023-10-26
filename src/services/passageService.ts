import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IPassageService from './IServices/IPassageService';
import IPassageRepo from './IRepos/IPassageRepo';
import IPassageDTO from '../dto/IPassageDTO';
import IFloorRepo from './IRepos/IFloorRepo';
import { Location } from '../domain/location';
import { Passage } from '../domain/passage';
import { PassageMap } from '../mappers/PassageMap';

@Service()
export default class PassageService implements IPassageService {
    constructor(
        @Inject(config.repos.passage.name) private passageRepo : IPassageRepo,
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
    ) {}

    public async createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
        try {          
        
          const fromFloor = await this.floorRepo.findByObjectId(passageDTO.fromFloorId);
          const toFloor = await this.floorRepo.findByObjectId(passageDTO.toFloorId);
          const locationOrError = Location.create({
            positionX: passageDTO.location.positionX,
            positionY: passageDTO.location.positionY,
            direction: passageDTO.location.direction,
          });
          
          if (fromFloor === null) {
            return Result.fail<IPassageDTO>('Floor with ID "' + passageDTO.fromFloorId + '" not found');
          }

          if (toFloor === null) {
            return Result.fail<IPassageDTO>('Floor with ID "' + passageDTO.toFloorId + '" not found');
          }

          if (locationOrError.isFailure) {
            return Result.fail<IPassageDTO>('Invalid Location');
          }

          const passageOrError = await Passage.create({
            fromFloorId: fromFloor.id.toString(),
            toFloorId: toFloor.id.toString(),
            location: locationOrError.getValue(),
          });

          if (passageOrError.isFailure) {
            return Result.fail<IPassageDTO>(passageOrError.errorValue());
          }
      
          const passageResult = passageOrError.getValue();
      
          await this.passageRepo.save(passageResult);
      
          const passageDTOResult = PassageMap.toDTO( passageResult ) as IPassageDTO;
            return Result.ok<IPassageDTO>( passageDTOResult )
          } catch (e) {
            throw e;
        }
    }

    public async getAllPassages(): Promise<Result<IPassageDTO[]>> {
      try {
        const passageList: Passage[] = await this.passageRepo.findAll();
        let passageListDto: IPassageDTO[] = [];
  
        if (passageList != null){
          for (let i = 0; i < passageList.length; i++)
          passageListDto.push(PassageMap.toDTO(passageList[i]));
          return Result.ok<IPassageDTO[]>(passageListDto);
        }
        return Result.fail<IPassageDTO[]>("There are no passages to return.");
      } catch (e) {
        return Result.fail<IPassageDTO[]>(e.message);
      }
    }
}
