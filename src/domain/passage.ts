import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { FloorId } from "./floorId";
import { Guard } from "../core/logic/Guard";
import { Description } from "./description";
import { Building } from "./building";
import { Location } from "./location";
import { PassageId } from "./passageId";
import { Floor } from "./floor";

interface PassageProps {
    
    fromFloorId: string;
    toFloorId: string;
    location: Location;
}

export class Passage extends AggregateRoot<PassageProps> {

    get id (): UniqueEntityID {
        return this._id;
    }
    
    get passageId (): PassageId {
        return new PassageId(this.passageId.toValue());
    }

    get fromFloorId (): string {
        return this.props.fromFloorId;
    }

    get toFloorId (): string {
        return this.props.toFloorId;
    }

    get location (): Location {
        return this.props.location;
    }

    private constructor (props: PassageProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: PassageProps, id?: UniqueEntityID): Result<Passage> {
        const guardedProps = [
            { argument: props.fromFloorId, argumentName: 'fromFloorId' },
            { argument: props.toFloorId, argumentName: 'toFloorId' },
            { argument: props.location, argumentName: 'location' }
        ];

      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      
      if (!guardResult.succeeded) {
        return Result.fail<Passage>(' ');
      } else {
        const passage = new Passage({...props}, id);
        return Result.ok<Passage>( passage );
      }
    }
}