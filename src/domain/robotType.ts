import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { RobotTypeCode } from "./valueObjects/robotTypeCode";
import { RobotTypeBrand } from "./valueObjects/robotTypebrand";
import { RobotTypeModel } from "./valueObjects/robotTypeModel";
import { RobotTypeId } from "./valueObjects/robotTypeId";
import { TaskTypeId } from "./valueObjects/taskTypeId";

interface RobotTypeProps {
    code: RobotTypeCode;
    brand: RobotTypeBrand;
    model: RobotTypeModel;
    taskTypes: string[];
}

export class RobotType extends AggregateRoot<RobotTypeProps> {
    get id (): UniqueEntityID {
        return this._id;
    }
    
    get robotTypeId (): RobotTypeId {
        return new RobotTypeId(this.robotTypeId.toValue());
    }
    
    get code (): RobotTypeCode {
        return this.props.code;
    }

    get brand (): RobotTypeBrand {
        return this.props.brand;
    }
    
    set brand ( value: RobotTypeBrand ) {
        this.props.brand = value;
    }
    
    get model (): RobotTypeModel {
        return this.props.model;
    }
    
    set model ( value: RobotTypeModel ) {
        this.props.model = value;
    }

    get taskTypes (): string[] {
        return this.props.taskTypes;
    }


    private constructor (props: RobotTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: RobotTypeProps, id?: UniqueEntityID): Result<RobotType> {

      const guardedProps = [
        { argument: props.code, argumentName: 'code' },
        { argument: props.brand, argumentName: 'brand' },
        { argument: props.model, argumentName: 'model' },
        { argument: props.taskTypes, argumentName: 'taskTypes' }
      ];

      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      
      if (!guardResult.succeeded) {
        return Result.fail<RobotType>('Must provide a RobotType code, brand, model and a list of type of tasks');
      } else {
        const robotType = new RobotType({ ...props }, id);
        return Result.ok<RobotType>( robotType );
      }
    }
}