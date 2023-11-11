import { Result } from "../../core/logic/Result";
import IFloorDTO from "../../dto/IFloorDTO";
import IPassageDTO from "../../dto/IPassageDTO";

export default interface IFloorService {

    createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
    updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
    getAllFloors(): Promise<Result<IFloorDTO[]>>;
    getFloorsWithPassage(passageDTO: IPassageDTO[]): Promise<Result<IFloorDTO[]>>;
    getFloorsFromBuilding(buildingId: string): Promise<Result<IFloorDTO[]>>;
}