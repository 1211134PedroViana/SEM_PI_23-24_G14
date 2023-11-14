import { Result } from "../../core/logic/Result";
import IFloorMapperzDTO from "../../dto/IFloorMapperzDTO";


export default interface IFloorMapperzService {

    loadFloorMap(file: Express.Multer.File, floorMapDTO: IFloorMapperzDTO): Promise<Result<IFloorMapperzDTO>>;
}