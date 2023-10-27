import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotTypeCodeProps {
  value: string;
}

export class RobotTypeCode extends ValueObject<RobotTypeCodeProps> {
    get value (): string {
      return this.props.value;
    }
    
    private constructor (props: RobotTypeCodeProps) {
      super(props);
    }

    //Checks if the text has only alphanumerics and a max of 25 characters
    public static isValidCode (text: string): boolean {
        return new RegExp('^[a-zA-Z0-9]{1,25}$').test(text);
    }
  
    public static create (code: string): Result<RobotTypeCode> {
      const guardResult = Guard.againstNullOrUndefined(code, 'code');
      const isCodeValid = RobotTypeCode.isValidCode(code);

      if (!guardResult.succeeded) {
        return Result.fail<RobotTypeCode>('RobotType Code cannot be null or undefined');
      } else if (!isCodeValid) {
        return Result.fail<RobotTypeCode>('Invalid RobotType Code format');
      } else {
        return Result.ok<RobotTypeCode>(new RobotTypeCode({ value: code }));
      }
    }
}