export default interface Passage {
    id: string;
    fromBuildingId: string;
    toBuildingId: string;
    fromFloorId: string;
    toFloorId: string;
    location: {
        positionX: number;
        positionY: number;
        direction: string;
    },
    description: string;
}
