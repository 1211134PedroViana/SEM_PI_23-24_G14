import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Result } from '../core/logic/Result';
import { Guard } from '../core/logic/Guard';
import { Location } from './valueObjects/location';
import { PassageId } from './passageId';
import IPassageDTO from '../dto/IPassageDTO';

interface PassageProps {
  fromFloorId: string;
  toFloorId: string;
  location: Location;
}

export class Passage extends AggregateRoot<PassageProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get passageId(): PassageId {
    return new PassageId(this.passageId.toValue());
  }

  get fromFloorId(): string {
    return this.props.fromFloorId;
  }

  get toFloorId(): string {
    return this.props.toFloorId;
  }

  get location(): Location {
    return this.props.location;
  }

  set fromFloorId(value: string) {
    this.fromFloorId = value;
  }

  set toFloorId(value: string) {
    this.toFloorId = value;
  }

  set location(value: Location) {
    this.location = value;
  }

  private constructor(props: PassageProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(passageDTO: IPassageDTO, id?: UniqueEntityID): Result<Passage> {
    const location = Location.create({
      positionX: passageDTO.location.positionX,
      positionY: passageDTO.location.positionY,
      direction: passageDTO.location.direction,
    });

    const guardedProps = [
      { argument: passageDTO.fromFloorId, argumentName: 'fromFloorId' },
      { argument: passageDTO.toFloorId, argumentName: 'toFloorId' },
      { argument: passageDTO.location, argumentName: 'location' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Passage>('Must provide the Floor IDs and the Location');
    } else {
      const passage = new Passage(
        { fromFloorId: passageDTO.fromFloorId, toFloorId: passageDTO.toFloorId, location: location.getValue() },
        id,
      );
      return Result.ok<Passage>(passage);
    }
  }
}
