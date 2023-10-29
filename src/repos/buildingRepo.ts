import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { Building } from '../domain/building';
import { BuildingCode } from '../domain/valueObjects/buildingCode';
import { BuildingMap } from '../mappers/BuildingMap';
import { BuildingId } from '../domain/buildingId';

@Service()
export default class BuildingRepo implements IBuildingRepo {
    private models: any;

    constructor(
        @Inject('buildingSchema') private buildingSchema : Model<IBuildingPersistence & Document>,
    ) {}

    private createBaseQuery (): any {
        return {
          where: {},
        }
    }

    public async exists(building: Building): Promise<boolean> {
        const idX = building.id instanceof BuildingId ? (<BuildingId>building.id).toValue() : building.id;

        const query = { domainId: idX}; 
        const buildingDocument = await this.buildingSchema.findOne( query as FilterQuery<IBuildingPersistence & Document>);
        return !!buildingDocument === true;
    }

    public async save(building: Building): Promise<Building> {
        const query = { domainId: building.id.toString()}; 

        const buildingDocument = await this.buildingSchema.findOne( query );

        try {
            if(buildingDocument === null) {
                const rawBuilding: any = BuildingMap.toPersistence(building);

                const buildingCreated = await this.buildingSchema.create(rawBuilding);

                return BuildingMap.toDomain(buildingCreated);
            }else{
                buildingDocument.description = building.description.value;
                buildingDocument.name = building.name;
                await buildingDocument.save();

                return building;
            }

        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId (buildingId: BuildingId | string): Promise<Building> {
        const query = { domainId: buildingId};
        const buildingRecord = await this.buildingSchema.findOne( query as FilterQuery<IBuildingPersistence & Document> );

        if( buildingRecord != null) {
          return BuildingMap.toDomain(buildingRecord);
        }
        else
          return null;
    }

    public async findByObjectId (buildingId: string | string): Promise<Building> {
        const query = { _id: buildingId};
        const buildingRecord = await this.buildingSchema.findOne( query as FilterQuery<IBuildingPersistence & Document> );
    
        if( buildingRecord != null) {
          return BuildingMap.toDomain(buildingRecord);
        }
        else
          return null;
    }

    public async findByCode (code: BuildingCode | string): Promise<Building> {
        const query = { code: code };
        const buildingRecord = await this.buildingSchema.findOne( query as FilterQuery<IBuildingPersistence & Document> );

        if( buildingRecord != null) {
          return BuildingMap.toDomain(buildingRecord);
        }
        else
          return null;
    }

    public async findAll(): Promise<Building[]> {
        const buildingsList = await this.buildingSchema.find()
        return BuildingMap.toDomainBulk(buildingsList);
    }
    
}