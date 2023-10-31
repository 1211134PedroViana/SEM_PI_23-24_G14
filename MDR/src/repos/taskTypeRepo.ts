import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import ITaskTypeRepo from '../services/IRepos/ITaskTypeRepo';
import { ITaskTypePersistence } from '../dataschema/ITaskTypePersistence';
import { TaskTypeId } from '../domain/valueObjects/taskTypeId';
import { TaskType } from '../domain/taskType';
import { TaskTypeMap } from '../mappers/TaskTypeMap';


@Service()
export default class TaskTypeRepo implements ITaskTypeRepo {
    private models: any;

    constructor(
        @Inject('taskTypeSchema') private taskTypeSchema : Model<ITaskTypePersistence & Document>,
    ) {}

    private createBaseQuery (): any {
        return {
          where: {},
        }
    }

    public async exists(taskType: TaskType): Promise<boolean> {
        const idX = taskType.id instanceof TaskTypeId ? (<TaskTypeId>taskType.id).toValue() : taskType.id;

        const query = { domainId: idX}; 
        const taskTypeDocument = await this.taskTypeSchema.findOne( query as FilterQuery<ITaskTypePersistence & Document>);
        return !!taskTypeDocument === true;
    }

    public async save(taskType: TaskType): Promise<TaskType> {
        const query = { domainId: taskType.id.toString()}; 

        const taskTypeDocument = await this.taskTypeSchema.findOne( query );

        try {
            if(taskTypeDocument === null) {
                const rawTaskType: any = TaskTypeMap.toPersistence(taskType);

                const taskTypeCreated = await this.taskTypeSchema.create(rawTaskType);

                return TaskTypeMap.toDomain(taskTypeCreated);
            }else{

                await taskTypeDocument.save();

                return taskType;
            }

        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId (taskTypeId: TaskTypeId | string): Promise<TaskType> {
        const query = { domainId: taskTypeId};
        const taskTypeRecord = await this.taskTypeSchema.findOne( query as FilterQuery<ITaskTypePersistence & Document> );

        if( taskTypeRecord != null) {
          return TaskTypeMap.toDomain(taskTypeRecord);
        }
        else
          return null;
    }

    public async findByObjectId (taskTypeId: string | string): Promise<TaskType> {
        const query = { _id: taskTypeId};
        const taskTypeRecord = await this.taskTypeSchema.findOne( query as FilterQuery<ITaskTypePersistence & Document> );
    
        if( taskTypeRecord != null) {
          return TaskTypeMap.toDomain(taskTypeRecord);
        }
        else
          return null;
    }

    public async findByName (name: string): Promise<TaskType> {
        const query = { name: name };
        const taskTypeRecord = await this.taskTypeSchema.findOne( query as FilterQuery<ITaskTypePersistence & Document> );

        if( taskTypeRecord != null) {
          return TaskTypeMap.toDomain(taskTypeRecord);
        }
        else
          return null;
    }
}