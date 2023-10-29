import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { Location } from "./location";
import { Dimension } from "./dimension";

interface FloorMapRoomProps {
  roomId: string;
  dimension: Dimension;
  location: Location;
}

export class FloorMapRoom extends ValueObject<FloorMapRoomProps> {

    get roomId (): string {
      return this.props.roomId;
    }

    get location (): Location {
        return this.props.location;
    }

    get dimension (): Dimension {
        return this.props.dimension;
    }
    
    private constructor (props: FloorMapRoomProps) {
      super(props);
    }
  
    public static create (props: FloorMapRoomProps): Result<FloorMapRoom> {

        const guardedProps = [
            { argument: props.roomId, argumentName: 'roomId' },
            { argument: props.location, argumentName: 'location' },
            { argument: props.dimension, argumentName: 'dimension' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    
      if (!guardResult.succeeded) {
        return Result.fail<FloorMapRoom>('');
      } else {
        return Result.ok<FloorMapRoom>(new FloorMapRoom({ roomId: props.roomId, dimension: props.dimension, location: props.location }));
      }
    }
}