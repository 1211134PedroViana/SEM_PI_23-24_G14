import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building";
import { BuildingCode } from "../../domain/buildingCode";
import { BuildingId } from "../../domain/buildingId";

export default interface IBuildingRepo extends Repo<Building> {
    save(building: Building): Promise<Building>;
    findByDomainId(buildingId: BuildingId | string): Promise<Building>;
    findByCode(code: BuildingCode | string): Promise<Building>;
    findAll(): Promise<Building[]>;
}