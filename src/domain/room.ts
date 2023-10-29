import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { Location } from "./valueObjects/location";
import {Dimension} from "./valueObjects/dimension";
import {RoomCode} from "./valueObjects/RoomCode";
import IRoomDTO from "../dto/IRoomDTO";
import { Description } from "./valueObjects/description";


interface RoomProps {
    code: RoomCode;
    name: string;
    description: Description;
    dimension: Dimension;
    location: Location;
    floorId: string;
}

export class Room extends AggregateRoot<RoomProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get code (): RoomCode {
        return this.props.code;
    }

    get name (): string {
        return this.props.name;
    }

    set name ( value: string ) {
        this.props.name = value;
    }

    get description (): Description {
        return this.props.description;
    }

    set description ( value: Description ) {
        this.props.description = value;
    }

    get dimension (): Dimension {
        return this.props.dimension;
    }

    get location (): Location {
        return this.props.location;
    }

    get floorId (): string {
        return this.props.floorId;
    }

    private constructor(props: RoomProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(roomDTO: IRoomDTO, id?: UniqueEntityID): Result<Room> {
        console.log('Creating Room:', roomDTO);
        
        const code = RoomCode.create(roomDTO.code);
        console.log('Code created:', code);
        
        const description = Description.create(roomDTO.description);
        console.log('Description created:', description);
        
        const dimension = Dimension.create({
            pos1: roomDTO.dimension.pos1,
            pos2: roomDTO.dimension.pos2,
            pos3: roomDTO.dimension.pos3,
            pos4: roomDTO.dimension.pos4,
        });
        console.log('Dimension created:', dimension);
        
        const location = Location.create({
            positionX: roomDTO.location.positionX,
            positionY: roomDTO.location.positionY,
            direction: roomDTO.location.direction,
        });
        console.log('Location created:', location);

        const guardedProps = [
            { argument: roomDTO.code, argumentName: 'code' },
            { argument: roomDTO.name, argumentName: 'name' },
            { argument: roomDTO.dimension, argumentName: 'dimension' },
            { argument: roomDTO.location, argumentName: 'location' },
            { argument: roomDTO.floorId, argumentName: 'floorId' },
        ];

        console.log('Guarding properties:', guardedProps);

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            console.error('Failed to create a Room: ' + guardResult.message);
            return Result.fail<Room>('Failed to create a Room: ' + guardResult.message);
        } else {
            console.log('Creating Room instance...');
            const room = new Room({
                code: code.getValue(),
                name: roomDTO.name,
                description: description.getValue(),
                dimension: dimension.getValue(),
                location: location.getValue(),
                floorId: roomDTO.floorId,
            }, id);
            console.log('Room created:', room);
            return Result.ok<Room>(room);
        }
    }
}