import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { FloorId } from "./floorId";
import { Building } from "./building";
import { CellId } from "./cellId";
import { BuildingId } from "./buildingId";
import { Floor } from "./floor";



export class Cell {

    get cellId (): CellId {
        return new CellId(this.cellId.toValue());
    }

    get buildingId (): BuildingId {
        return this.buildingId;
    }

    get floorId (): FloorId {
        return this.floorId;
    }

    public static create () {
        

    }
}