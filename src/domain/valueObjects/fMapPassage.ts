import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { Location } from "../location";

interface FloorMapPassageProps {
  passageId: string;
  location: Location;
}

export class FloorMapPassage extends ValueObject<FloorMapPassageProps> {

    get passageId (): string {
      return this.props.passageId;
    }

    get location (): Location {
        return this.props.location;
      }
    
    private constructor (props: FloorMapPassageProps) {
      super(props);
    }
  
    public static create (props: FloorMapPassageProps): Result<FloorMapPassage> {

        const guardedProps = [
            { argument: props.passageId, argumentName: 'passageId' },
            { argument: props.location, argumentName: 'location' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    
      if (!guardResult.succeeded) {
        return Result.fail<FloorMapPassage>('');
      } else {
        return Result.ok<FloorMapPassage>(new FloorMapPassage({ passageId: props.passageId, location: props.location }));
      }
    }
}