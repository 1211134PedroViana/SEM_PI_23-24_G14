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
    fromFloor: Floor;
    toFloor: Floor;
    location: Location;
}

export class Passage extends AggregateRoot<PassageProps> {

    get id (): UniqueEntityID {
        return this._id;
    }
    
    get passageId (): PassageId {
        return new PassageId(this.passageId.toValue());
    }

    get fromFloor (): Floor {
        return this.props.fromFloor;
    }

    get toFloor (): Floor {
        return this.props.toFloor;
    }

    get location (): Location {
        return this.props.location;
    }

    private constructor (props: PassageProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: PassageProps, id?: UniqueEntityID): Result<Passage> {
        const guardedProps = [
            { argument: props.fromFloor, argumentName: 'fromFloor' },
            { argument: props.toFloor, argumentName: 'toFloor' },
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