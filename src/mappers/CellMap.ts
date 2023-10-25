import { Document, Model } from "mongoose";
import { Mapper } from "../core/infra/Mapper";
import ICellDTO from "../dto/ICellDTO";
import { ICellPersistence } from "../dataschema/ICellPersistence";
import { Cell } from "../domain/cell";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class CellMap extends Mapper<Cell> {
 
    public static toDTO ( cell: Cell): ICellDTO {
        return {
            id: cell.id.toString(),
            buildingId: cell.buildingId.toString(),
            floorNumber: cell.floorNumber,
            walls: cell.walls,
        } as ICellDTO;
    } 


    public static toDomain( cell: any | Model<ICellPersistence & Document> ): Cell {

        const cellOrError = Cell.create(
            cell,
            new UniqueEntityID(cell._id)
        );
    }
}