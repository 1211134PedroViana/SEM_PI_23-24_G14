export default interface IElevatorDTO {
    id: string;
    code: string;
    location: {
        positionX: number;
        positionY: number;
        direction: string;
    }
    buildingId: string;
}