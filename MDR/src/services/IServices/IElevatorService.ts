import { Result } from '../../core/logic/Result';
import IElevatorDTO from '../../dto/IElevatorDTO';

export interface FloorsServedResponse {
  buildingId: string;
  floors: string[];
}

export default interface IElevatorService {
  createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  getAllElevators(): Promise<Result<IElevatorDTO[]>>;
  getAllFloorsServedByElevator(): Promise<Result<FloorsServedResponse[]>>;
}
