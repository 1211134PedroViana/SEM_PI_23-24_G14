export interface IFloorMapperzPersistence {
    domainId: string;
    floorId: string;
    map: number[][];
    fMapRooms: string[];
    fMapElevator: string;
    fMapPassages: string[];
}