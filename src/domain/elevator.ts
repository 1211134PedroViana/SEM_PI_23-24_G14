import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { ElevatorCode } from "./elevatorCode";
import { Guard } from "../core/logic/Guard";
import { Location } from "./location";
import IElevatorDTO from "../dto/IElevatorDTO";


interface ElevatorProps {
    code: ElevatorCode;
    location: Location;
    buildingId: string;
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

    get buildingId (): string {
        return this.props.buildingId;
    }

    private constructor (props: ElevatorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(elevatorDTO: IElevatorDTO, id?: UniqueEntityID): Result<Elevator> {
        const code = ElevatorCode.create(elevatorDTO.code);
        const location = Location.create({positionX: elevatorDTO.location.positionX, positionY: elevatorDTO.location.positionY, direction: elevatorDTO.location.direction})

        const guardedProps = [
            { argument: elevatorDTO.code, argumentName: 'code' },
            { argument: elevatorDTO.location, argumentName: 'location' },
            { argument: elevatorDTO.buildingId, argumentName: 'buildingId' }
        ];

      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      
      if (!guardResult.succeeded) {
        return Result.fail<Elevator>(' ');
      } else {
        const elevator = new Elevator({code: code.getValue(), location: location.getValue(), buildingId: elevatorDTO.buildingId}, id);
        return Result.ok<Elevator>( elevator );
      }
    }
}