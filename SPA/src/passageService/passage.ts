export default interface Passage {
    id: string;
    fromFloorId: string;
    toFloorId: string;
    location: {
        positionX: number;
        positionY: number;
        direction: string;
    }
}