import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorMapperzPersistence } from '../dataschema/IFloorMapperzPersistence';
import IFloorMapperzRepo from '../services/IRepos/IFloorMapperzRepo';
import { FloorMapperz } from '../domain/floorMapperz';
import { FloorMapperzId } from '../domain/floorMapperzId';
import { FloorMapperzMap } from '../mappers/FloorMapperzMap';

@Service()
export default class FloorMapperzRepo implements IFloorMapperzRepo {
    private models: any;

    constructor(
        @Inject('floorMapperzSchema') private floorMapperzSchema : Model<IFloorMapperzPersistence & Document>,
    ) {}

    private createBaseQuery (): any {
        return {
          where: {},
        }
    }

    public async exists(floorMapperz: FloorMapperz): Promise<boolean> {
        const idX = floorMapperz.floorMapperzId instanceof FloorMapperzId ? (<FloorMapperzId>floorMapperz.floorMapperzId).toValue() : floorMapperz.floorMapperzId;

        const query = { FloorMapperzId: idX}; 
        const floorMapperzDocument = await this.floorMapperzSchema.findOne( query as FilterQuery<IFloorMapperzPersistence & Document>);
        return !!floorMapperzDocument === true;
    }

    public async save(floorMapperz: FloorMapperz): Promise<FloorMapperz> {
        const query = { domainId: floorMapperz.id.toString()}; 

        const floorMapperzDocument = await this.floorMapperzSchema.findOne( query );

        try {
            if(floorMapperzDocument === null) {
                const rawFloorMap: any = FloorMapperzMap.toPersistence(floorMapperz);

                const floorMapCreated = await this.floorMapperzSchema.create(rawFloorMap);

                return FloorMapperzMap.toDomain(floorMapCreated);
            }else{
               
                await floorMapperzDocument.save();

                return floorMapperz;
            }

        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId (floorMapId: FloorMapperzId | string): Promise<FloorMapperz> {
        const query = { domainId: floorMapId};
        const floorMapRecord = await this.floorMapperzSchema.findOne( query as FilterQuery<IFloorMapperzPersistence & Document> );
    
        if( floorMapRecord != null) {
          return FloorMapperzMap.toDomain(floorMapRecord);
        }
        else
          return null;
    }
}