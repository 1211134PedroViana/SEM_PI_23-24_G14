import { Result } from "../../core/logic/Result";
import { Building } from "../../domain/building";
import IBuildingDTO from "../../dto/IBuildingDTO";
import IFloorDTO from "../../dto/IFloorDTO";
import IPassageDTO from "../../dto/IPassageDTO";

export default interface IFloorService {

    createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
    updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
    getAllFloors(): Promise<Result<IFloorDTO[]>>;
    getFloorsWithPassage(passageDTO: IPassageDTO[]): Promise<Result<IFloorDTO[]>>;
}