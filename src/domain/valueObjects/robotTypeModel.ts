import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotTypeModelProps {
  value: string;
}

export class RobotTypeModel extends ValueObject<RobotTypeModelProps> {
    get value (): string {
      return this.props.value;
    }
    
    private constructor (props: RobotTypeModelProps) {
      super(props);
    }

    //Checks if the text has only alphanumerics and a max of 25 characters
    public static isValidModel (text: string): boolean {
        return new RegExp('^[a-zA-Z0-9 ]{1,100}$').test(text);
    }
  
    public static create (model: string): Result<RobotTypeModel> {
      const guardResult = Guard.againstNullOrUndefined(model, 'model');
      const isCodeValid = RobotTypeModel.isValidModel(model);

      if (!guardResult.succeeded) {
        return Result.fail<RobotTypeModel>('RobotType Model cannot be null or undefined');
      } else if (!isCodeValid) {
        return Result.fail<RobotTypeModel>('Invalid RobotType Model format');
      } else {
        return Result.ok<RobotTypeModel>(new RobotTypeModel({ value: model }));
      }
    }
}