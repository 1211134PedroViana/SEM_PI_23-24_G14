import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface LocationProps {
    positionX: number;
    positionY: number;
    direction: string;
}

export class Location extends ValueObject<LocationProps> {
    get positionX (): number {
      return this.props.positionX;
    }

    get positionY (): number {
        return this.props.positionY;
    }

    get direction (): string {
        return this.props.direction;
    }
    
    private constructor (props: LocationProps) {
      super(props);
    }
  
    public static create (props: LocationProps): Result<Location> {
        const guardedProps = [
            { argument: props.positionX, argumentName: 'positionX' },
            { argument: props.positionY, argumentName: 'positionY' },
            { argument: props.direction, argumentName: 'direction' }
        ];

      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

      if(!guardResult.succeeded) {
        return Result.fail<Location>('');
      } else{
        return Result.ok<Location>(new Location({...props}));
      }
    }
}
