import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { TaskType } from "../domain/taskType";
import ITaskTypeDTO from "../dto/ITaskTypeDTO";
import { ITaskTypePersistence } from "../dataschema/ITaskTypePersistence";


export class TaskTypeMap extends Mapper<TaskType> {

    public static toDTO( taskType: TaskType): ITaskTypeDTO {
        return {
            id: taskType.id.toString(),
            name: taskType.name,
            description: taskType.description.value
        } as ITaskTypeDTO;
    }

    public static toDomain( taskType: any | Model<ITaskTypePersistence & Document> ): TaskType {

        const taskTypeOrError = TaskType.create(
            taskType,
            new UniqueEntityID(taskType._id)
        );

        taskTypeOrError.isFailure ? console.log(taskTypeOrError.error): '';
        return taskTypeOrError.isSuccess ? taskTypeOrError.getValue(): null;
    }

    public static toPersistence(taskType: TaskType): any {
        return {
            domainId: taskType.id.toString(),
            name: taskType.name,
            description: taskType.description.value
        }
    }
}