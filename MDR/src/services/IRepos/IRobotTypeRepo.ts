import { Repo } from "../../core/infra/Repo";
import { RobotType } from "../../domain/robotType";
import { RobotTypeCode } from "../../domain/valueObjects/robotTypeCode";
import { RobotTypeId } from "../../domain/valueObjects/robotTypeId";


export default interface IRobotTypeRepo extends Repo<RobotType> {
    save(robotType: RobotType): Promise<RobotType>;
    findByDomainId(robotTypeId: RobotTypeId | string): Promise<RobotType>;
    findByObjectId (robotTypeId: RobotTypeId | string): Promise<RobotType>;
    findByCode(code: RobotTypeCode | string): Promise<RobotType>;
    findAll(): Promise<RobotType[]>;
}