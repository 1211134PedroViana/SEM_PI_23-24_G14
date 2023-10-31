import { Result } from "../../core/logic/Result";
import IRobotDTO from "../../dto/IRobotDTO";

export default interface IRobotService {
    createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
    updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
    deactivateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
    getAllRobots(): Promise<Result<IRobotDTO[]>>;
    getAllRobotsWithNickname(robotNickname: IRobotDTO): Promise<Result<IRobotDTO>>;
}