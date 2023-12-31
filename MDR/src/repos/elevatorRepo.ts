import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';
import { Elevator } from '../domain/elevator';
import { ElevatorMap } from '../mappers/ElevatorMap';
import { ElevatorCode } from '../domain/valueObjects/elevatorCode';

@Service()
export default class ElevatorRepo implements IElevatorRepo {
  private models: any;

  constructor(@Inject('elevatorSchema') private elevatorSchema: Model<IElevatorPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(elevator: Elevator): Promise<boolean> {
    const idX = elevator.code instanceof String ? <ElevatorCode>elevator.code : elevator.code;

    const query = { PassageId: idX };
    const elevatorDocument = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);
    return !!elevatorDocument === true;
  }

  public async save(elevator: Elevator): Promise<Elevator> {
    try {
      const query = { domainId: elevator.id.toString() };
      const elevatorDocument = await this.elevatorSchema.findOne(query);

      if (!elevatorDocument) {
        const rawElevator: any = ElevatorMap.toPersistence(elevator);
        const elevatorCreated = await this.elevatorSchema.create(rawElevator);
        return ElevatorMap.toDomain(elevatorCreated);
      } else {
        if (elevator.description && elevator.description.value !== undefined && elevator.description.value !== '') {
          elevatorDocument.description = elevator.description.value;
        }

        if (elevator.serialNumber) {
          elevatorDocument.serialNumber = elevator.serialNumber;
        }
        if (elevator.model) {
          elevatorDocument.model = elevator.model;
        }
        if (elevator.brand) {
          elevatorDocument.brand = elevator.brand;
        }
        if (elevator.buildingId) {
          elevatorDocument.buildingId = elevator.buildingId;
        }

        if (elevator.code && elevator.code.value !== undefined) {
          elevatorDocument.code = elevator.code.value;
        }

        await elevatorDocument.save();
        return ElevatorMap.toDomain(elevatorDocument);
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByObjectId(elevatorId: string): Promise<Elevator> {
    const query = { _id: elevatorId };
    const elevatorRecord = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);

    if (elevatorRecord != null) {
      return ElevatorMap.toDomain(elevatorRecord);
    } else return null;
  }

  public async findByDomainId(elevatorCode: ElevatorCode | string): Promise<Elevator> {
    const query = { domainId: elevatorCode };
    const elevatorRecord = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);

    if (elevatorRecord != null) {
      return ElevatorMap.toDomain(elevatorRecord);
    } else return null;
  }

  public async findAll(): Promise<Elevator[]> {
    const elevatorList = await this.elevatorSchema.find();
    return ElevatorMap.toDomainBulk(elevatorList);
  }

  public async findByElevatorId(elevatorId: string): Promise<Elevator> {
    const query = { _id: elevatorId };
    const elevatorRecord = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);

    if (elevatorRecord != null) {
      return ElevatorMap.toDomain(elevatorRecord);
    } else {
      return null;
    }
  }

  public async findByBuildingId(buildingId: string): Promise<Elevator> {
    const query = { buildingId: buildingId };
    const elevatorRecord = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);

    if (elevatorRecord != null) {
      return ElevatorMap.toDomain(elevatorRecord);
    } else {
      return null;
    }
  }

  public async findByDescription(description: string): Promise<Elevator> {
    const query = { description: description};
    const elevatorRecord = await this.elevatorSchema.findOne( query as FilterQuery<IElevatorPersistence & Document> );

    if( elevatorRecord != null) {
        return ElevatorMap.toDomain(elevatorRecord);
    }
    else
        return null;
  }
}
