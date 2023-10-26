import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { Location } from "./location";
import {Dimension} from "./dimension";
import {RoomCode} from "./RoomCode";


interface RoomProps {
    roomCode: RoomCode;
    dimension: Dimension;
    location: Location;
}

export class Room extends AggregateRoot<RoomProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get roomCode (): RoomCode {
        return this.props.roomCode;
    }

    get dimension (): Dimension {
        return this.props.dimension;
    }

    get location (): Location {
        return this.props.location;
    }

    private constructor(props: { roomCode: RoomCode; dimension: Dimension; location: Location }, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: {
        roomCode: RoomCode;
        dimension: Dimension;
        location: Location
    }, id?: UniqueEntityID): Result<Room> {
        const guardedProps = [
            { argument: props.roomCode, argumentName: 'code' },
            { argument: props.dimension, argumentName: 'dimension'},
            { argument: props.location, argumentName: 'location' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Room>(' ');
        } else {
            const room = new Room({...props}, id);
            return Result.ok<Room>( room );
        }
    }
}