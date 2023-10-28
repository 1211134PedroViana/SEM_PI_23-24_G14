import { Repo } from "../../core/infra/Repo";
import { FloorMapperz } from "../../domain/floorMapperz";
import { FloorMapperzId } from "../../domain/floorMapperzId";


export default interface IFloorMapperzRepo extends Repo<FloorMapperz> {
    save(floorMap: FloorMapperz): Promise<FloorMapperz>;
    findByDomainId(floorMapId: FloorMapperzId | string): Promise<FloorMapperz>;
}