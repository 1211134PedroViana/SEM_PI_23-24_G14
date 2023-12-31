import { Inject, Service } from "typedi";
import IRobotRepo from "../services/IRepos/IRobotRepo";
import { IRobotPersistence } from "../dataschema/IRobotPersistence";
import { Document, FilterQuery, Model } from "mongoose";
import { Robot } from "../domain/robot";
import { RobotId } from "../domain/robotId";
import { RobotMap } from '../mappers/RobotMap';
import { RobotCode } from "../domain/valueObjects/robotCode";
import IRobotDTO from "../dto/IRobotDTO";

@Service()
export default class RobotRepo implements IRobotRepo {
    private models: any;

    constructor(
        @Inject('robotSchema') private robotSchema : Model<IRobotPersistence & Document>,
    ) {}

    private createBaseQuery (): any {
        return {
            where: {},
        }
    }

    
    public async exists(robot: Robot): Promise<boolean> {
        const idX = robot.id instanceof RobotId ? (<RobotId>robot.id).toValue() : robot.id;

        const query = { domainId: idX}; 
        const robotDocument = await this.robotSchema.findOne( query as FilterQuery<IRobotPersistence & Document>);
        return !!robotDocument === true;
    }

    public async save(robot: Robot): Promise<Robot> {
        const query = { domainId: robot.id.toString()};

        const robotDocument = await this.robotSchema.findOne( query );

        try {
            if (robotDocument === null) {
                
                const rawRobot: any = RobotMap.toPersistence(robot);

                const robotCreated = await this.robotSchema.create(rawRobot);

                return RobotMap.toDomain(robotCreated);
            } else {
                robotDocument.isActive = robot.isActive;
                
                await robotDocument.save();

                return robot;
            } 
        } catch (e) {
            throw e;
        }
    }

    public async findByDomainId(robotId: RobotId | string): Promise<Robot> {
        const query = { domainId: robotId };
        const robotRecord = await this.robotSchema.findOne( query as FilterQuery<IRobotPersistence & Document> );

        if (robotRecord != null) {
            return RobotMap.toDomain(robotRecord);
        } else {
            return null;
        }
    }

    public async findByObjectId (robotId: string): Promise<Robot> {
        const query = { _id: robotId };
        const robotRecord = await this.robotSchema.findOne( query as FilterQuery<IRobotPersistence & Document> );

        if (robotRecord != null) {
            return RobotMap.toDomain(robotRecord);
        } else {
            return null;
        }
    }

    public async findByCode (code: RobotCode | string): Promise<Robot> {
        const query = { code: code };
        const robotRecord = await this.robotSchema.findOne( query as FilterQuery<IRobotPersistence & Document> );

        if( robotRecord != null) {
          return RobotMap.toDomain(robotRecord);
        } else { 
          return null;
        }
    }

    public async findByNickname (robotNickname: IRobotDTO): Promise<Robot> {
        const query = { nickname: robotNickname.nickname };
        const robotRecord = await this.robotSchema.findOne( query as FilterQuery<IRobotPersistence & Document> );
        
        if (robotRecord != null)  {
            return RobotMap.toDomain(robotRecord);
        } else {
            return null;
        }
    }

    public async findAll(): Promise<Robot[]> {
        const robotList = await this.robotSchema.find()
        return RobotMap.toDomainBulk(robotList);
    }
    
    public async findByTaskType(taskType: string): Promise<Robot[]> {
        const query = { taskType: taskType };
        const robotList = await this.robotSchema.find(query as FilterQuery<IRobotPersistence & Document>);
        return RobotMap.toDomainBulk(robotList);
    }

    public async findByNicknameOrTaskType(robotNickname: IRobotDTO, taskType: string): Promise<Robot[]> {
        const query = {
            $or: [
                { nickname: robotNickname },
                { taskTypes: taskType } // Assuming taskTypes is an array in your Robot schema
            ]
        };

        const robotRecords = await this.robotSchema.find(query);

        return RobotMap.toDomainBulk(robotRecords);
    }
}