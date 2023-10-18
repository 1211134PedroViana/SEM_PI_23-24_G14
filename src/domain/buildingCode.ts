import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface BuildingCodeProps {
  value: string;
}

export class BuildingCode extends ValueObject<BuildingCodeProps> {
    get value (): string {
      return this.props.value;
    }
    
    private constructor (props: BuildingCodeProps) {
      super(props);
    }

    //Checks if the text has only a char in the range of [A-Z]
    public static isValidCode (text: string): boolean {
        return new RegExp('^[a-zA-Z0-9 ]{1,5}$').test(text);
    }
  
    public static create (code: string): Result<BuildingCode> {
      const guardResult = Guard.againstNullOrUndefined(code, 'code');
      const isCodeValid = BuildingCode.isValidCode(code);

      if (!guardResult.succeeded) {
        return Result.fail<BuildingCode>('Building Code cannot be null or undefined');
      } else if (!isCodeValid) {
        return Result.fail<BuildingCode>('Invalid Building Code format');
      } else {
        return Result.ok<BuildingCode>(new BuildingCode({ value: code }));
      }
    }
}