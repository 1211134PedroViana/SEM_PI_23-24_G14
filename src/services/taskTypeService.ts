import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import ITaskTypeService from './IServices/ITaskTypeService';
import ITaskTypeRepo from './IRepos/ITaskTypeRepo';
import ITaskTypeDTO from '../dto/ITaskTypeDTO';
import { Description } from '../domain/description';
import { TaskType } from '../domain/taskType';
import { TaskTypeMap } from '../mappers/TaskTypeMap';



@Service()
export default class TaskTypeService implements ITaskTypeService {
    constructor(
        @Inject(config.repos.taskType.name) private taskTypeRepo : ITaskTypeRepo
    ) {}

    public async createTaskType(taskTypeDTO: ITaskTypeDTO): Promise<Result<ITaskTypeDTO>> {
        try {          
         
          const taskTypeDescriptionOrError = Description.create(taskTypeDTO.description);
          
          if (taskTypeDescriptionOrError.isFailure) {
            return Result.fail<ITaskTypeDTO>(taskTypeDescriptionOrError.errorValue());
          }

          // checks if theres already a RobotType with the code provided
          const taskTypeDocument = await this.taskTypeRepo.findByName(taskTypeDTO.name);
          const found = !!taskTypeDocument;
  
          if (found) {
            return Result.fail<ITaskTypeDTO>('TaskType already exists with code:' + taskTypeDTO.name);
          }

          const taskTypeOrError = await TaskType.create({
            name: taskTypeDTO.name,
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