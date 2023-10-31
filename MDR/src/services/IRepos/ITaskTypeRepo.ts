import { Repo } from "../../core/infra/Repo";
import { TaskType } from "../../domain/taskType";
import { TaskTypeId } from "../../domain/valueObjects/taskTypeId";


export default interface ITaskTypeRepo extends Repo<TaskType> {
    save(taskType: TaskType): Promise<TaskType>;
    findByDomainId(taskTypeId: TaskTypeId | string): Promise<TaskType>;
    findByObjectId (taskTypeId: TaskTypeId | string): Promise<TaskType>;
    findByName(code: string): Promise<TaskType>;
}