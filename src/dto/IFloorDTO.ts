import Cell from "./ICellDTO";

export default interface IFloorDTO {
    id: string;
    buildingId: string;
    floorNumber: number;
    description: string;
    /*
    //Mapa de cada piso
    /*map: {
        line: number;
        column: number;
        cells: Cell[][];
    }
    */

     */

}

