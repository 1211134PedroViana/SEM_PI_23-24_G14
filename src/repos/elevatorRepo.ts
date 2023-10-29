import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';
import { Elevator } from '../domain/elevator';
import { ElevatorMap } from '../mappers/ElevatorMap';


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
                const rawElevator: any = ElevatorMap.toPersistence(elevator);

                const elevatorCreated = await this.elevatorSchema.create(rawElevator);

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

    public async findByObjectId (elevatorId: string): Promise<Elevator> {
        const query = { _id: elevatorId};
        const elevatorRecord = await this.elevatorSchema.findOne( query as FilterQuery<IElevatorPersistence & Document> );
    
        if( elevatorRecord != null) {
          return ElevatorMap.toDomain(elevatorRecord);
        }
        else
          return null;
    }
    
    public async findAll(): Promise<Elevator[]> {
        const elevatorList = await this.elevatorSchema.find()
        return ElevatorMap.toDomainBulk(elevatorList);
    }
}