import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { ElevatorCode } from "./elevatorCode";
import { Guard } from "../core/logic/Guard";
import { Location } from "./location";


interface ElevatorProps {
    code: ElevatorCode;
    location: Location;
}

export class Elevator extends AggregateRoot<ElevatorProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get code (): ElevatorCode {
        return this.props.code;
    }

    get location (): Location {
        return this.props.location;
    }

    private constructor (props: ElevatorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {
        const guardedProps = [
            { argument: props.code, argumentName: 'code' },
            { argument: props.location, argumentName: 'location' }
        ];

      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      
      if (!guardResult.succeeded) {
        return Result.fail<Elevator>(' ');
      } else {
        const elevator = new Elevator({...props}, id);
        return Result.ok<Elevator>( elevator );
      }
    }
}