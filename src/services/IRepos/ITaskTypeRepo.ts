import { Repo } from "../../core/infra/Repo";
import { TaskType } from "../../domain/taskType";
import { TaskTypeCode } from "../../domain/valueObjects/taskTypeCode";
import { TaskTypeId } from "../../domain/valueObjects/taskTypeId";


export default interface ITaskTypeRepo extends Repo<TaskType> {
    save(taskType: TaskType): Promise<TaskType>;
    findByDomainId(taskTypeId: TaskTypeId | string): Promise<TaskType>;
    findByObjectId (taskTypeId: TaskTypeId | string): Promise<TaskType>;
    findByCode(code: TaskTypeCode | string): Promise<TaskType>;
}