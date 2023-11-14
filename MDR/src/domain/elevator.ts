import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Result } from '../core/logic/Result';
import { ElevatorCode } from './valueObjects/elevatorCode';
import { Guard } from '../core/logic/Guard';
import { Location } from './valueObjects/location';
import IElevatorDTO from '../dto/IElevatorDTO';
import { Description } from './valueObjects/description';

interface ElevatorProps {
  code: ElevatorCode;
  location: Location;
  buildingId: string;
  floorList: string[];
  brand: string;
  model: string;
  serialNumber: string;
  description: Description;
}

export class Elevator extends AggregateRoot<ElevatorProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get code(): ElevatorCode {
    return this.props.code;
  }

  get location(): Location {
    return this.props.location;
  }

  get buildingId(): string {
    return this.props.buildingId;
  }

  get floorList(): string[] {
    return this.props.floorList;
  }

  get brand(): string {
    return this.props.brand;
  }

  get model(): string {
    return this.props.model;
  }

  get serialNumber(): string {
    return this.props.serialNumber;
  }

  get description(): Description {
    return this.props.description;
  }

  set description(value: Description) {
    this.props.description = value;
  }

  set code(value: ElevatorCode) {
    this.props.code = value;
  }

  set location(value: Location) {
    this.props.location = value;
  }

  set buildingId(value: string) {
    this.props.buildingId = value;
  }

  set brand(value: string) {
    this.props.brand = value;
  }

  set model(value: string) {
    this.props.model = value;
  }

  set serialNumber(value: string) {
    this.props.serialNumber = value;
  }

  private constructor(props: ElevatorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(elevatorDTO: IElevatorDTO, id?: UniqueEntityID): Result<Elevator> {
    const code = ElevatorCode.create(elevatorDTO.code);
    const location = Location.create({
      positionX: elevatorDTO.location.positionX,
      positionY: elevatorDTO.location.positionY,
      direction: elevatorDTO.location.direction,
    });
    const description = Description.create(elevatorDTO.description);

    const guardedProps = [
      { argument: elevatorDTO.code, argumentName: 'code' },
      { argument: elevatorDTO.location, argumentName: 'location' },
      { argument: elevatorDTO.buildingId, argumentName: 'buildingId' },
      { argument: elevatorDTO.floorList, argumentName: 'floorList' },
      { argument: elevatorDTO.brand, argumentName: 'brand' },
      { argument: elevatorDTO.model, argumentName: 'model' },
      { argument: elevatorDTO.serialNumber, argumentName: 'serialNumber' },
      { argument: elevatorDTO.description, argumentName: 'description' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Elevator>(' ');
    } else {
      const elevator = new Elevator(
        {
          code: code.getValue(),
          location: location.getValue(),
          buildingId: elevatorDTO.buildingId,
          floorList: elevatorDTO.floorList,
          brand: elevatorDTO.brand,
          model: elevatorDTO.model,
          serialNumber: elevatorDTO.serialNumber,
          description: description.getValue(),
        },
        id,
      );
      return Result.ok<Elevator>(elevator);
    }
  }
}
