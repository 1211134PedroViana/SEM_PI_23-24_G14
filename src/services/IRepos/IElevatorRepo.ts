import { Code } from "mongodb";
import { Repo } from "../../core/infra/Repo";
import { Elevator } from "../../domain/elevator";
import {BuildingId} from "../../domain/buildingId";
import {Building} from "../../domain/building";
import {ElevatorCode} from "../../domain/elevatorCode";

export default interface IElevatorRepo extends Repo<Elevator> {
    save(elevator: Elevator): Promise<Elevator>;
    findByDomainId(elevatorId: ElevatorCode | string): Promise<Elevator>;
    findAll(): Promise<Elevator[]>;

}