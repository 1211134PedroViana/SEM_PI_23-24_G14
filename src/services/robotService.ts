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
import IRobotTypeRepo from "./IRepos/IRobotTypeRepo";


@Service()
export default class RobotService implements IRobotService {
    constructor (
        @Inject(config.repos.robot.name) private robotRepo : IRobotRepo,
        @Inject(config.repos.robotType.name) private robotTypeRepo : IRobotTypeRepo
    ) {}

    public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
        try {

            const robotCodeOrError = RobotCode.create(robotDTO.code);
            const descriptionOrError = Description.create(robotDTO.description);
            const robotType = await this.robotTypeRepo.findByObjectId(robotDTO.robotType);

            //verifies the code and description creation
            if(robotCodeOrError.isFailure) {
                return Result.fail<IRobotDTO>('Invalid robot code');
            }
            
            if (descriptionOrError.isFailure && robotDTO.description != undefined) {
                return Result.fail<IRobotDTO>('Invalid Description!');
            }

            if (robotType === null) {
                return Result.fail<IRobotDTO>("RobotType with id: '" + robotDTO.robotType + "' not found");
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
                isActive: true,
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

    public async deactivateRobot(robotId: string): Promise<Result<IRobotDTO>> {
        try {

            const robotDocument = await this.robotRepo.findByDomainId(robotId);
            const found = !!robotDocument;
  
            if (!found) {
              return Result.fail<IRobotDTO>("Robot with ID: '" + robotId + "' not found");
            }

            // sets the Robot isActive to false
            robotDocument.isActive = false;

            //saves the robot with the update and returns the robot DTO
            await this.robotRepo.save(robotDocument);

            const robotDTOResult = RobotMap.toDTO( robotDocument ) as IRobotDTO;
            return Result.ok<IRobotDTO>( robotDTOResult )

        } catch (e) {
            throw e;
        }    
    } 


    public async updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
        return null;
    }
}