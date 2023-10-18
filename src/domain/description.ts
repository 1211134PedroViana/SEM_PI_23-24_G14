import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface DescriptionProps {
    value: string;
}

export class Description extends ValueObject<DescriptionProps> {
    get value (): string {
      return this.props.value;
    }
    
    private constructor (props: DescriptionProps) {
      super(props);
    }

    //Checks if the text has only a char in the range of [A-Z]
    public static isValidDescription (text: string): boolean {
      return text.length <= 255;
    }
  
    public static create (description: string): Result<Description> {
      const guardResult = Guard.againstNullOrUndefined(description, 'description');
      if (!guardResult.succeeded) {
        return Result.fail<Description>('Description cant be null');
      } else if(!this.isValidDescription(description)) {
        return Result.fail<Description>('Description exceeds the maximum characters(255)');
      } else{
        return Result.ok<Description>(new Description({ value: description }));
      }
    }
}