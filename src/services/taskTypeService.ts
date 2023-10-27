import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import ITaskTypeService from './IServices/ITaskTypeService';
import ITaskTypeRepo from './IRepos/ITaskTypeRepo';
import ITaskTypeDTO from '../dto/ITaskTypeDTO';
import { Description } from '../domain/description';
import { TaskTypeCode } from '../domain/valueObjects/taskTypeCode';
import { TaskType } from '../domain/taskType';
import { TaskTypeMap } from '../mappers/TaskTypeMap';



@Service()
export default class TaskTypeService implements ITaskTypeService {
    constructor(
        @Inject(config.repos.taskType.name) private taskTypeRepo : ITaskTypeRepo
    ) {}

    public async createTaskType(taskTypeDTO: ITaskTypeDTO): Promise<Result<ITaskTypeDTO>> {
        try {          
         
          const taskTypeCodeOrError = TaskTypeCode.create(taskTypeDTO.code);
          const taskTypeDescriptionOrError = Description.create(taskTypeDTO.description);
          
          // verifies the code, brand and model creation
          if (taskTypeCodeOrError.isFailure) {
            return Result.fail<ITaskTypeDTO>(taskTypeCodeOrError.errorValue());
          }

          if (taskTypeDescriptionOrError.isFailure) {
            return Result.fail<ITaskTypeDTO>(taskTypeDescriptionOrError.errorValue());
          }

          // checks if theres already a RobotType with the code provided
          const taskTypeDocument = await this.taskTypeRepo.findByCode(taskTypeDTO.code);
          const found = !!taskTypeDocument;
  
          if (found) {
            return Result.fail<ITaskTypeDTO>('TaskType already exists with code:' + taskTypeDTO.code);
          }

          const taskTypeOrError = await TaskType.create({
            code: taskTypeCodeOrError.getValue(),
            description: taskTypeDescriptionOrError.getValue()
          });

          if (taskTypeOrError.isFailure) {
            return Result.fail<ITaskTypeDTO>(taskTypeOrError.errorValue());
          }
      
          const taskTypeResult = taskTypeOrError.getValue();
      
          // saves the new created building and returns the building DTO 
          await this.taskTypeRepo.save(taskTypeResult);
      
          const taskTypeDTOResult = TaskTypeMap.toDTO( taskTypeResult ) as ITaskTypeDTO;
            return Result.ok<ITaskTypeDTO>( taskTypeDTOResult )
          } catch (e) {
            throw e;
        }
    }
}