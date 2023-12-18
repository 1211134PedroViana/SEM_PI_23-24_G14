import { Result } from "../../core/logic/Result";
import IBuildingDTO from "../../dto/IBuildingDTO";
import IPassageDTO from "../../dto/IPassageDTO";

export default interface IPassageService {

    createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;
    getAllPassages(): Promise<Result<IPassageDTO[]>>;
    updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;
    allPassagesBetweenBuildings(fromBuildingID: string, toBuildingID: string, passageDTO: IPassageDTO[]): Promise<Result<IPassageDTO[]>>;
    getPassageByFloorId(floorId: string): Promise<Result<IPassageDTO[]>>;
    getPassageByDescription(description: string): Promise<Result<IPassageDTO>>;
}