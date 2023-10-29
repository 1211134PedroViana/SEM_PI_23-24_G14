export interface IElevatorPersistence {
    domainId: string;
    code: string;
    location: {
        positionX: number;
        positionY: number;
        direction: string;
    }
    buildingId: string;
}