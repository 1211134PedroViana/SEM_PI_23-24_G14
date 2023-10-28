import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { FloorId } from "./floorId";
import { Guard } from "../core/logic/Guard";
import { Description } from "./description";
import { Building } from "./building";
import { CellId } from "./cellId";
import { Cell } from "./cell";
import IBuildingDTO from "../dto/IBuildingDTO";
import IFloorDTO from "../dto/IFloorDTO";
import {BuildingCode} from "./buildingCode";
import {map} from "lodash";

interface FloorProps {
    buildingId: string;
    floorNumber: number;
    description: Description;
    //cell: Cell;
}

export class Floor extends AggregateRoot<FloorProps> {

    get id (): UniqueEntityID {
        return this._id;
    }
    
    get floorId (): FloorId {
        return new FloorId(this.floorId.toValue());
    }

    get buildingId (): string {
        return this.props.buildingId;
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

    /*get cell(): Cell {
        return this.props.cell;
    }

    set cell ( value: Cell ) {
        this.props.cell = value;
    }

     */

    private constructor (props: FloorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(floorDTO: IFloorDTO, id?: UniqueEntityID): Result<Floor> {

        const buildingId = floorDTO.buildingId;
        const floorNumber = floorDTO.floorNumber;
        const description = Description.create(floorDTO.description).getValue();

        const guardedProps = [
            { argument: floorDTO.buildingId, argumentName: 'buildingId' },
            { argument: floorDTO.floorNumber, argumentName: 'floorNumber' },
            { argument: floorDTO.description, argumentName: 'description' },
            //{ argument: floorDTO.map, argumentName: 'map' }
        ];

      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

      if (!guardResult.succeeded) {
        return Result.fail<Floor>('Must provide a Building ID and a Floor number');
      } else {
        const floor = new Floor({buildingId: buildingId, floorNumber: floorNumber, description: description}, id);
        return Result.ok<Floor>( floor );
      }
    }
}