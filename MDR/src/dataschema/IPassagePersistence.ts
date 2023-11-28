export interface IPassagePersistence {
    domainId: string;
    fromFloorId: string;
    toFloorId: string;
    location: {
        positionX: number;
        positionY: number;
        direction: string;
    }
    description: string;
}