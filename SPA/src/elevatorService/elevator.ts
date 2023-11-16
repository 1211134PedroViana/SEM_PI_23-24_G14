export default interface Elevator {
  id: string;
  code: string;
  location: {
    positionX: number;
    positionY: number;
    direction: string;
  };
  buildingId: string;
  floorList: string[];
  brand: string;
  model: string;
  serialNumber: string;
  description: string;
}
