import { Result } from "../../core/logic/Result";
import { Building } from "../../domain/building";
import IBuildingDTO from "../../dto/IBuildingDTO";
import IFloorDTO from "../../dto/IFloorDTO";

export default interface IFloorService {

    createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
    //updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
    //getAllFloors(): Promise<Result<IFloorDTO[]>>;
}