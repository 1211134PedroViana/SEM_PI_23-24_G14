export default interface IFloorMapperzDTO {
    id: string;
    floor: string;
    map: number[][];
    fMapRooms: {
        roomId: string;
        startX: number;
        startY: number;
        endX: number;
        endY: number;

    }[];
    fMapElevator: {
        elevatorId: string;
        positionX: number;
        positionY: number;
        direction: string; 
    };
    fMapPassages: {
        passageId: string;
        positionX: number;
        positionY: number;
        direction: string;
    }[];
}