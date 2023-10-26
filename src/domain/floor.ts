import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { FloorId } from "./floorId";
import { Guard } from "../core/logic/Guard";
import { Description } from "./description";
import { Building } from "./building";
import { CellId } from "./cellId";
import { Cell } from "./cell";

interface FloorProps {
    building: Building;
    floorNumber: number;
    description: Description;
    cell: Cell;
}

export class Floor extends AggregateRoot<FloorProps> {

    get id (): UniqueEntityID {
        return this._id;
    }
    
    get floorId (): FloorId {
        return new FloorId(this.floorId.toValue());
    }

    get building (): Building {
        return this.props.building;
    }

    get floorNumber (): number {
        return this.props.floorNumber;
    }

    set floorNumber ( value: number ) {
        this.props.floorNumber = value;
    }

    get description (): Description {
        return this.props.description;
    }

    set description ( value: Description ) {
        this.props.description = value;
    }

    get cell(): Cell {
        return this.props.cell;
    }

    set cell ( value: Cell ) {
        this.props.cell = value;
    }

    private constructor (props: FloorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: FloorProps, id?: UniqueEntityID): Result<Floor> {
        const guardedProps = [
            { argument: props.building, argumentName: 'building' },
            { argument: props.floorNumber, argumentName: 'floorNumber' }
        ];

      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      
      if (!guardResult.succeeded) {
        return Result.fail<Floor>('Must provide a Building and a Floor number');
      } else {
        const floor = new Floor({...props}, id);
        return Result.ok<Floor>( floor );
      }
    }
}