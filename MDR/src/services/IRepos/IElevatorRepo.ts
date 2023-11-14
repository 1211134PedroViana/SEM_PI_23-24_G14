import { Repo } from '../../core/infra/Repo';
import { Elevator } from '../../domain/elevator';
import {BuildingId} from "../../domain/buildingId";
import {Building} from "../../domain/building";

export default interface IElevatorRepo extends Repo<Elevator> {
  save(elevator: Elevator): Promise<Elevator>;
  findAll(): Promise<Elevator[]>;
  findByObjectId(elevatorId: string): Promise<Elevator>;
  findByDomainId(buildingId: BuildingId | string): Promise<Building>;
  findByBuildingId(buildingID: string): Promise<Elevator | null>;
}
