import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface ElevatorCodeProps {
  value: string;
}

export class ElevatorCode extends ValueObject<ElevatorCodeProps> {
    get value (): string {
      return this.props.value;
    }
    
    private constructor (props: ElevatorCodeProps) {
      super(props);
    }

    //Checks if the text has only a char in the range of [A-Z]
    public static isValidCode (text: string): boolean {
        return new RegExp('^[a-zA-Z0-9 ]{1,5}$').test(text);
    }
  
    public static create (code: string): Result<ElevatorCode> {
      const guardResult = Guard.againstNullOrUndefined(code, 'code');
      const isCodeValid = ElevatorCode.isValidCode(code);

      if (!guardResult.succeeded) {
        return Result.fail<ElevatorCode>('Elevator Code cannot be null or undefined');
      } else if (!isCodeValid) {
        return Result.fail<ElevatorCode>('Invalid Elevator Code format');
      } else {
        return Result.ok<ElevatorCode>(new ElevatorCode({ value: code }));
      }
    }
}