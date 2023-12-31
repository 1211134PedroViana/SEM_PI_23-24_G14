import { Repo } from "../../core/infra/Repo";
import { Passage } from "../../domain/passage";
import { PassageId } from "../../domain/passageId";

export default interface IPassageRepo extends Repo<Passage> {
    save(passage: Passage): Promise<Passage>;
    findByDomainId(passageId: PassageId | string): Promise<Passage>;
    findByObjectId(passageId: string): Promise<Passage>;
    findAll(): Promise<Passage[]>;
    findByFloorId (floorId: string): Promise<Passage[]>;
    findByDescription(description: string): Promise<Passage>;
}