export default interface IFloorMapperzDTO {
    id: string;
    floorId: string;
    map: number[][];

    fMapRooms: {
        roomId: string;
        dimension: {
            pos1: number;
            pos2: number;
            pos3: number;
            pos4: number;
        };
        location: {
            positionX: number;
            positionY: number;
            direction: string;
        }
    }[];

    fMapElevator: {
        elevatorId: string;
        location: {
            positionX: number;
            positionY: number;
            direction: string;
        } 
    };

    fMapPassages: {
        passageId: string;
        location: {
            positionX: number;
            positionY: number;
            direction: string;
        }
    }[];
}