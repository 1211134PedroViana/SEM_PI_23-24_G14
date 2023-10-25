export default interface Cell {
    id: string;
    buildingId: string;
    floorNumber: number;
    walls: {
        top: boolean;
        bottom: boolean;
        right: boolean;
        left: boolean;
    };
}