import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import IFloorRepo from '../services/IRepos/IFloorRepo';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import { Floor } from '../domain/floor';
import { FloorId } from '../domain/floorId';
import { FloorMap } from '../mappers/FloorMap';
import {Building} from "../domain/building";
import {BuildingMap} from "../mappers/BuildingMap";

@Service()
export default class FloorRepo implements IFloorRepo {
    private models: any;

    constructor(
        @Inject('floorSchema') private floorSchema : Model<IFloorPersistence & Document>,
    ) {}

    private createBaseQuery (): any {
        return {
          where: {},
        }
    }

    public async exists(floor: Floor): Promise<boolean> {
        const idX = floor.floorId instanceof FloorId ? (<FloorId>floor.floorId).toValue() : floor.floorId;

        const query = { FloorId: idX}; 
        const floorDocument = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document>);
        return !!floorDocument === true;
    }

    public async save(floor: Floor): Promise<Floor> {
        const query = { domainId: floor.id.toString()}; 

        const floorDocument = await this.floorSchema.findOne( query );

        try {
            if(floorDocument === null) {
                const rawFloor: any = FloorMap.toPersistence(floor);

                const floorCreated = await this.floorSchema.create(rawFloor);

                return FloorMap.toDomain(floorCreated);
            }else{
                floorDocument.floorNumber = floor.floorNumber;
                floorDocument.description = floor.description.value;
                await floorDocument.save();

                return floor;
            }

        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId (floorId: FloorId | string): Promise<Floor> {
        const query = { domainId: floorId};
        const floorRecord = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document> );
    
        if( floorRecord != null) {
          return FloorMap.toDomain(floorRecord);
        }
        else
          return null;
    }

    public async findByObjectId (floorId: string | string): Promise<Floor> {
        const query = { _id: floorId};
        const floorRecord = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document> );

        if( floorRecord != null) {
          return FloorMap.toDomain(floorRecord);
        }
        else
          return null;
    }

    public async findByBuilding (buildingId: string | string): Promise<Floor[]> {
        const floors: Floor[] = [];
        const query: FilterQuery<IFloorPersistence & Document> = { buildingId };
        
        const floorRecords = await this.floorSchema.find(query);
        
        if (floorRecords.length > 0) {
            floorRecords.forEach((floorRecord) => {
                const floor = FloorMap.toDomain(floorRecord);
                floors.push(floor);
            });
            return floors;
        } else {
            return null;
        }
    }

    public async findAll(): Promise<Floor[]> {
        const floorList = await this.floorSchema.find()
        return FloorMap.toDomainBulk(floorList);
    }

}