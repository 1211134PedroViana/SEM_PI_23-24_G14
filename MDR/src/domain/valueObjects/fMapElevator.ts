import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { Location } from "./location";

interface FloorMapElevatorProps {
  elevatorId: string;
  location: Location;
}

export class FloorMapElevator extends ValueObject<FloorMapElevatorProps> {

    get elevatorId (): string {
      return this.props.elevatorId;
    }

    get location (): Location {
        return this.props.location;
      }
    
    private constructor (props: FloorMapElevatorProps) {
      super(props);
    }
  
    public static create (props: FloorMapElevatorProps): Result<FloorMapElevator> {

        const guardedProps = [
            { argument: props.elevatorId, argumentName: 'elevatorId' },
            { argument: props.location, argumentName: 'location' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    
      if (!guardResult.succeeded) {
        return Result.fail<FloorMapElevator>('');
      } else {
        return Result.ok<FloorMapElevator>(new FloorMapElevator({ elevatorId: props.elevatorId, location: props.location }));
      }
    }
}