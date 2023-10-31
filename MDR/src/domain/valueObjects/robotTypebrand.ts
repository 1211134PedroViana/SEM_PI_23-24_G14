import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotTypeBrandProps {
  value: string;
}

export class RobotTypeBrand extends ValueObject<RobotTypeBrandProps> {
    get value (): string {
      return this.props.value;
    }
    
    private constructor (props: RobotTypeBrandProps) {
      super(props);
    }

    //Checks if the text has only alphanumerics and a max of 25 characters
    public static isValidBrand (text: string): boolean {
        return new RegExp('^[a-zA-Z0-9 ]{1,50}$').test(text);
    }
  
    public static create (brand: string): Result<RobotTypeBrand> {
      const guardResult = Guard.againstNullOrUndefined(brand, 'brand');
      const isCodeValid = RobotTypeBrand.isValidBrand(brand);

      if (!guardResult.succeeded) {
        return Result.fail<RobotTypeBrand>('RobotType Brand cannot be null or undefined');
      } else if (!isCodeValid) {
        return Result.fail<RobotTypeBrand>('Invalid RobotType Brand format');
      } else {
        return Result.ok<RobotTypeBrand>(new RobotTypeBrand({ value: brand }));
      }
    }
}