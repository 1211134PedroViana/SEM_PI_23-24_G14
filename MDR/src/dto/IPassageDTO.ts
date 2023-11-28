export default interface IPassageDTO {
  id: string;
  fromFloorId: string;
  toFloorId: string;
  location: {
    positionX: number;
    positionY: number;
    direction: string;
  };
  description: string;
}
