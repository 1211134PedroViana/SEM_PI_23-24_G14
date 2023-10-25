import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';
import { Elevator } from '../domain/elevator';
import { ElevatorMap } from '../mappers/ElevatorMap';
import { Code } from 'mongodb';
import {BuildingId} from "../domain/buildingId";
import {Building} from "../domain/building";
import {IBuildingPersistence} from "../dataschema/IBuildingPersistence";
import {BuildingMap} from "../mappers/BuildingMap";
import {ElevatorCode} from "../domain/elevatorCode";


@Service()
export default class ElevatorRepo implements IElevatorRepo {
    private models: any;

    constructor(
        @Inject('elevatorSchema') private elevatorSchema : Model<IElevatorPersistence & Document>,
    ) {}

    private createBaseQuery (): any {
        return {
          where: {},
        }
    }

    public async exists(elevator: Elevator): Promise<boolean> {
        const idX = elevator.code instanceof String ? (<String>elevator.code) : elevator.code;

        const query = { PassageId: idX}; 
        const elevatorDocument = await this.elevatorSchema.findOne( query as FilterQuery<IElevatorPersistence & Document>);
        return !!elevatorDocument === true;
    }

    public async save(elevator: Elevator): Promise<Elevator> {
        const query = { domainId: elevator.id.toString()}; 

        const elevatorDocument = await this.elevatorSchema.findOne( query );

        try {
            if(elevatorDocument === null) {
                const rawPassage: any = ElevatorMap.toPersistence(elevator);

                const elevatorCreated = await this.elevatorSchema.create(rawPassage);

                return ElevatorMap.toDomain(elevatorCreated);
            }else{
                elevatorDocument.location.positionX = elevator.location.positionX;
                elevatorDocument.location.positionY = elevator.location.positionY;
                elevatorDocument.location.direction = elevator.location.direction;
                await elevatorDocument.save();

                return elevator;
            }

        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId (elevatorId: ElevatorCode | string): Promise<Elevator> {
        const query = { domainId: elevatorId};
        const elevatorRecord = await this.elevatorSchema.findOne( query as FilterQuery<IBuildingPersistence & Document> );

        if( elevatorRecord != null) {
            return ElevatorMap.toDomain(elevatorRecord);
        }
        else
            return null;
    }
    
    public async findAll(): Promise<Elevator[]> {
        const passageList = await this.elevatorSchema.find()
        return ElevatorMap.toDomainBulk(passageList);
    }
}