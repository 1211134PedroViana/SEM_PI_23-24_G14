import { Inject, Service } from "typedi";
import IRobotService from "./IServices/IRobotService";
import config from "../../config";
import IRobotRepo from "./IRepos/IRobotRepo";
import IRobotDTO from "../dto/IRobotDTO";
import { RobotCode } from "../domain/robotCode";
import { Result } from "../core/logic/Result";
import { Description } from "../domain/description";
import { Robot } from "../domain/robot";
import { RobotMap } from "../mappers/RobotMap";


@Service()
export default class RobotService implements IRobotService {
    constructor (
        @Inject(config.repos.robot.name) private robotRepo : IRobotRepo
    ) {}

    public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
        try {

            const robotCodeOrError = RobotCode.create(robotDTO.code);
            const descriptionOrError = Description.create(robotDTO.description);

            //verifies the code and description creation
            if(robotCodeOrError.isFailure) {
                return Result.fail<IRobotDTO>('Invalid robot code');
            }
            
            if (descriptionOrError.isFailure && robotDTO.description != undefined) {
                return Result.fail<IRobotDTO>('Invalid Description!');
            }
    
            // checks if theres already a robot with the code provided
            const robotDocument = await this.robotRepo.findByCode(robotDTO.code);
            const found = !!robotDocument;

            if (found) {
                return Result.fail<IRobotDTO>('Robot already exists with that code' + robotDTO.code);
            }

            const robotOrError = await Robot.create({
                code: robotCodeOrError.getValue(),
                nickname: robotDTO.nickname,
                robotType: robotDTO.robotType,
                serialNumber: robotDTO.serialNumber,
                description: descriptionOrError.getValue(),
                status: robotDTO.status,
            });

            if (robotOrError.isFailure) {
                return Result.fail<IRobotDTO>(robotOrError.errorValue());
            }

            const robotResult = robotOrError.getValue();

            //saves the new created robot and returns the robot DTO
            await this.robotRepo.save(robotResult);

            const robotDTOResult = RobotMap.toDTO( robotResult ) as IRobotDTO;
            return Result.ok<IRobotDTO>( robotDTOResult )

        } catch (e) {
            throw e;
        }    
    } 


    public async updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
        return null;
    }
}