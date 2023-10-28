export default interface IElevatorDTO {
    code: string;
    location: {
        positionX: number;
        positionY: number;
        direction: string;
    }
    buildingId: string;
}