import { Robot } from "../../domain/robot"
import { Repo } from "../../core/infra/Repo";
import { RobotId } from "../../domain/robotId";
import { RobotCode } from "../../domain/valueObjects/robotCode";
import IRobotDTO from "../../dto/IRobotDTO";


export default interface IRobotRepo extends Repo<Robot> {
    save(robot: Robot): Promise<Robot>;
    findByDomainId(robotId: RobotId | string): Promise<Robot>;
    findByObjectId (robotId: string): Promise<Robot>;
    findByCode(robotCode: RobotCode | string): Promise<Robot>;
    findByNickname(robotNickname: IRobotDTO): Promise<Robot>;
    findAll(): Promise<Robot[]>;
    findByTaskType(taskType: string): Promise<Robot[]>;
    findByNicknameOrTaskType(robotNickname: IRobotDTO, taskType: string): Promise<Robot[]>;
}