export default interface IRoomDTO {
    code: string;
    dimension: {
        pos1: number;
        pos2: number;
        pos3: number;
        pos4: number;
    }
    location: {
        positionX: number;
        positionY: number;
        direction: string;
    }
}