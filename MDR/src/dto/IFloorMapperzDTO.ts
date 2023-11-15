export default interface IFloorMapperzDTO {
    id: string;
    floorId: string;
    fileUrl: string;

    room: {
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

    floorElevator: {
        elevatorId: string;
        location: {
            positionX: number;
            positionY: number;
            direction: string;
        } 
    };

    passage: {
        passageId: string;
        location: {
            positionX: number;
            positionY: number;
            direction: string;
        }
    }[];
}