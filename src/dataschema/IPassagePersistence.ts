export interface IPassagePersistence {
    domainId: string;
    fromFloor: string;
    toFloor: string;
    location: {
        positionX: number;
        positionY: number;
        direction: string;
    }
}