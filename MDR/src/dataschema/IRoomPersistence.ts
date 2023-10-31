export interface IRoomPersistence {
    domainId: string;
    code: string;
    name: string;
    description: string;
    Dimension: {
        pos1: number;
        pos2: number;
        pos3: number;
        pos4: number;
    };
    location: {
        positionX: number;
        positionY: number;
        direction: string;
    };
    floorId: string;
}