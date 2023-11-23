import { Repo } from '../../core/infra/Repo';
import { Floor } from '../../domain/floor';
import { FloorId } from '../../domain/floorId';
import { Building } from '../../domain/building';

export default interface IFloorRepo extends Repo<Floor> {
  save(floor: Floor): Promise<Floor>;
  findByDomainId(floorId: FloorId | string): Promise<Floor>;
  findByObjectId(floorId: FloorId | string): Promise<Floor>;
  findAll(): Promise<Floor[]>;
  findByBuilding(buildingId: string): Promise<Floor[]>;
  findByFloorNumber(floorNumber: number | number): Promise<Floor>;
}
