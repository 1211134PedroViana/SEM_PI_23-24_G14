export interface IElevatorPersistence {
    code: string;
    location: {
        positionX: number;
        positionY: number;
        direction: string;
    }
    buildingId: string;
}