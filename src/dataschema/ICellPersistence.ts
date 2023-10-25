import Cell from "../dto/ICellDTO";

export interface ICellPersistence {
    domainId: string;
    building: string;
    floorNumber: number;
    walls: Cell;
}