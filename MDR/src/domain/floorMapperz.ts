import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { FloorMapperzId } from "./floorMapperzId";
import { FloorMapRoom } from "./valueObjects/fMapRoom";
import { FloorMapPassage } from "./valueObjects/fMapPassage";
import { FloorMapElevator } from "./valueObjects/fMapElevator";

interface FloorMapperzProps {
    floorId: string;
    fileUrl: string;
}

/*
 "map": [
            [3, 2, 2, 2, 2, 3, 2, 2, 1],
            [1, 0, 0, 0, 0, 2, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 2, 2, 2, 2, 2, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 2],
            [1, 0, 0, 0, 0, 0, 1, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2, 2]
        ],

        Walls of the Floor:
        0 -> no walls in the cell
        1 -> wall at west of the cell
        2 -> wall at north of the cell
        3 -> wall both at north and west of the cell

*/

// Class de Homenagem a 🔥'Ric Da Fazzerz' the one and only🔥
// #pinguins4ever
export class FloorMapperz extends AggregateRoot<FloorMapperzProps> {

    get id (): UniqueEntityID {
        return this._id;
    }
    
    get floorMapperzId (): FloorMapperzId {
        return new FloorMapperzId(this.floorMapperzId.toValue());
    }

    get floorId (): string {
        return this.props.floorId;
    }

    get fileUrl(): string {
        return this.props.fileUrl;
    }

    private constructor (props: FloorMapperzProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: FloorMapperzProps, id?: UniqueEntityID): Result<FloorMapperz> {
        const guardedProps = [
            { argument: props.fileUrl, argumentName: 'fileUrl' }
        ];

      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      
      if (!guardResult.succeeded) {
        return Result.fail<FloorMapperz>('Must provide the File URL');
      } else {
        const floorMapperz = new FloorMapperz({floorId: props.floorId, fileUrl: props.fileUrl}, id);
        return Result.ok<FloorMapperz>( floorMapperz );
      }
    }
}