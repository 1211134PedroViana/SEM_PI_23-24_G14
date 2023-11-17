import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface LocationProps {
  positionX: number;
  positionY: number;
  direction: string;
}

export class Location extends ValueObject<LocationProps> {
  get positionX(): number {
    return this.props.positionX;
  }

  get positionY(): number {
    return this.props.positionY;
  }

  get direction(): string {
    return this.props.direction;
  }

  private constructor(props: LocationProps) {
    super(props);
  }

  //Checks if the text has only a char in the range of [A-Z]
  public static isValidPositions(num1: number, num2: number): boolean {
    return num1 >= 0 && num2 >= 0;
  }

  public static create(props: LocationProps): Result<Location> {
    const guardedProps = [
      { argument: props.positionX, argumentName: 'positionX' },
      { argument: props.positionY, argumentName: 'positionY' },
      { argument: props.direction, argumentName: 'direction' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Location>('Must provide Position-X, Position-Y and the Direction');
    } else if (!this.isValidPositions(props.positionX, props.positionY)) {
      return Result.fail<Location>('Invalid positions values');
    } else {
      return Result.ok<Location>(new Location({ ...props }));
    }
  }
}
