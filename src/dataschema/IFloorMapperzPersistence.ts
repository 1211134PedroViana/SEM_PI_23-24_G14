export interface IFloorMapperzPersistence {
    domainId: string;
    floor: string;
    map: number[][];
    fMapRooms: string[];
    fMapElevator: string;
    fMapPassages: string[];
}