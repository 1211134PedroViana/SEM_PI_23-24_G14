import { Result } from "../../core/logic/Result";
import IFloorMapperzDTO from "../../dto/IFloorMapperzDTO";


export default interface IFloorMapperzService {

    loadFloorMap(floorMapDTO: IFloorMapperzDTO): Promise<Result<IFloorMapperzDTO>>;
}