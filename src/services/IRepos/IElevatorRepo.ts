import { Code } from "mongodb";
import { Repo } from "../../core/infra/Repo";
import { Elevator } from "../../domain/elevator";

export default interface IElevatorRepo extends Repo<Elevator> {
    save(elevator: Elevator): Promise<Elevator>;
    findAll(): Promise<Elevator[]>;
    findByObjectId(elevatorId: string): Promise<Elevator>;
}