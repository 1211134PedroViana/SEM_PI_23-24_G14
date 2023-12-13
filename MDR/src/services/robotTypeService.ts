import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IRobotTypeService from './IServices/IRobotTypeService';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';
import { RobotTypeCode } from '../domain/valueObjects/robotTypeCode';
import { RobotTypeBrand } from '../domain/valueObjects/robotTypebrand';
import { RobotTypeModel } from '../domain/valueObjects/robotTypeModel';
import IRobotTypeRepo from './IRepos/IRobotTypeRepo';
import { RobotType } from '../domain/robotType';
import { RobotTypeMap } from '../mappers/RobotTypeMap';
import ITaskTypeRepo from './IRepos/ITaskTypeRepo';


@Service()
export default class RobotTypeService implements IRobotTypeService {
    constructor(
        @Inject(config.repos.robotType.name) private robotTypeRepo : IRobotTypeRepo,
        @Inject(config.repos.taskType.name) private taskTypeRepo : ITaskTypeRepo
    ) {}

    public async createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {
        try {          
         
          const robotTypeCodeOrError = RobotTypeCode.create(robotTypeDTO.code);
          const robotTypeBrandOrError = RobotTypeBrand.create(robotTypeDTO.brand);
          const robotTypeModelOrError = RobotTypeModel.create(robotTypeDTO.model);

          for (const item of robotTypeDTO.taskTypes) {
            const taskType = await this.taskTypeRepo.findByDomainId(item);
            if (taskType === null) {
              return Result.fail<IRobotTypeDTO>("TaskType with name: '" + item + "' not found");
            }
          }
          
          // verifies the code, brand and model creation
          if (robotTypeCodeOrError.isFailure) {
            return Result.fail<IRobotTypeDTO>(robotTypeCodeOrError.errorValue());
          }

          if (robotTypeBrandOrError.isFailure) {
            return Result.fail<IRobotTypeDTO>(robotTypeBrandOrError.errorValue());
          }

          if (robotTypeModelOrError.isFailure) {
            return Result.fail<IRobotTypeDTO>(robotTypeModelOrError.errorValue());
          }

          // checks if theres already a RobotType with the code provided
          const robotTypeDocument = await this.robotTypeRepo.findByCode(robotTypeDTO.code);
          const found = !!robotTypeDocument;
  
          if (found) {
            return Result.fail<IRobotTypeDTO>('RobotType already exists with code:' + robotTypeDTO.code);
          }

          const robotTypeOrError = await RobotType.create(robotTypeDTO);

          if (robotTypeOrError.isFailure) {
            return Result.fail<IRobotTypeDTO>(robotTypeOrError.errorValue());
          }
      
          const robotTypeResult = robotTypeOrError.getValue();
      
          // saves the new created building and returns the building DTO 
          await this.robotTypeRepo.save(robotTypeResult);
      
          const robotTypeDTOResult = RobotTypeMap.toDTO( robotTypeResult ) as IRobotTypeDTO;
            return Result.ok<IRobotTypeDTO>( robotTypeDTOResult )
          } catch (e) {
            throw e;
        }
    }

    public async getAllRobotTypes(): Promise<Result<IRobotTypeDTO[]>> {
      try {
        const robotTypeList: RobotType[] = await this.robotTypeRepo.findAll();
        let robotTypeDto: IRobotTypeDTO[] = [];
  
        if (robotTypeList != null){
          for (let i = 0; i < robotTypeList.length; i++)
          robotTypeDto.push(RobotTypeMap.toDTO(robotTypeList[i]));
          return Result.ok<IRobotTypeDTO[]>(robotTypeDto);
        }
        return Result.fail<IRobotTypeDTO[]>("There are no Robot Types to return.");
      } catch (e) {
        return Result.fail<IRobotTypeDTO[]>(e.message);
      }
    }
}