import { Result } from "../../core/logic/Result";
import IBuildingDTO from "../../dto/IBuildingDTO";

export default interface IBuildingService {

    createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
    updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
    getAllBuildings(): Promise<Result<IBuildingDTO[]>>;
    getBuildingById( buildingId: string): Promise<Result<IBuildingDTO>>;
    getAllBuildingsWithMinAndMaxFloors(min: number, max: number): Promise<Result<IBuildingDTO[]>>;
}