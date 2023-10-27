import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { Description } from "./description";
import { TaskTypeId } from "./valueObjects/taskTypeId";


interface TaskTypeProps {
    name: string;
    description: Description;
}

export class TaskType extends AggregateRoot<TaskTypeProps> {
    get id (): UniqueEntityID {
        return this._id;
    }
    
    get taskTypeId (): TaskTypeId {
        return new TaskTypeId(this.taskTypeId.toValue());
    }
    
    get name (): string {
        return this.props.name;
    }

    get description (): Description {
        return this.props.description;
    }
    
    set description ( value: Description ) {
        this.props.description = value;
    }


    private constructor (props: TaskTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: TaskTypeProps, id?: UniqueEntityID): Result<TaskType> {

      const guardedProps = [
        { argument: props.name, argumentName: 'name' },
        { argument: props.description, argumentName: 'brand' }
      ];

      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      
      if (!guardResult.succeeded) {
        return Result.fail<TaskType>('Must provide a TaskType name and a description');
      } else {
        const taskType = new TaskType({ ...props }, id);
        return Result.ok<TaskType>( taskType );
      }
    }
}