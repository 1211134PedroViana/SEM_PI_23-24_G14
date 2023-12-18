import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import IPassageRepo from '../services/IRepos/IPassageRepo';
import { IPassagePersistence } from '../dataschema/IPassagePersistence';
import { Passage } from '../domain/passage';
import { PassageId } from '../domain/passageId';
import { PassageMap } from '../mappers/PassageMap';


@Service()
export default class PassageRepo implements IPassageRepo {
    private models: any;

    constructor(
        @Inject('passageSchema') private passageSchema : Model<IPassagePersistence & Document>,
    ) {}

    private createBaseQuery (): any {
        return {
          where: {},
        }
    }

    public async exists(passage: Passage): Promise<boolean> {
        const idX = passage.passageId instanceof PassageId ? (<PassageId>passage.passageId).toValue() : passage.passageId;

        const query = { PassageId: idX}; 
        const passageDocument = await this.passageSchema.findOne( query as FilterQuery<IPassagePersistence & Document>);
        return !!passageDocument === true;
    }

    public async save(passage: Passage): Promise<Passage> {
        const query = { domainId: passage.id.toString()}; 

        const passageDocument = await this.passageSchema.findOne( query );

        try {
            if(passageDocument === null) {
                const rawPassage: any = PassageMap.toPersistence(passage);

                const passageCreated = await this.passageSchema.create(rawPassage);

                return PassageMap.toDomain(passageCreated);
            }else{
                passageDocument.fromBuildingId = passage.fromBuildingId;
                passageDocument.toBuildingId = passage.toBuildingId;
                passageDocument.fromFloorId = passage.fromFloorId;
                passageDocument.toFloorId = passage.toFloorId;
                passageDocument.location.positionX = passage.location.positionX;
                passageDocument.location.positionY = passage.location.positionY;
                passageDocument.location.direction = passage.location.direction;
                await passageDocument.save();

                return passage;
            }

        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId (passageId: PassageId | string): Promise<Passage> {
        const query = { domainId: passageId};
        const passageRecord = await this.passageSchema.findOne( query as FilterQuery<IPassagePersistence & Document> );
    
        if( passageRecord != null) {
          return PassageMap.toDomain(passageRecord);
        }
        else
          return null;
    }

    public async findByObjectId (passageId: string): Promise<Passage> {
        const query = { _id: passageId};
        const passageRecord = await this.passageSchema.findOne( query as FilterQuery<IPassagePersistence & Document> );
    
        if( passageRecord != null) {
          return PassageMap.toDomain(passageRecord);
        }
        else
          return null;
    }

    public async findAll(): Promise<Passage[]> {
        const passageList = await this.passageSchema.find()
        return PassageMap.toDomainBulk(passageList);
    }

    public async findByFloorId(floorId: string): Promise<Passage[]> {
        const passages: Passage[] = [];
        const query: FilterQuery<IPassagePersistence & Document> = { floorId };
    
        const passageRecords = await this.passageSchema.find(query);
    
        if (passageRecords.length > 0) {
            passageRecords.forEach(passageRecord => {
            const passage = PassageMap.toDomain(passageRecord);
            passages.push(passage);
          });
          return passages;
        } else {
          return null;
        }
    }

    public async findByDescription(description: string): Promise<Passage> {
        const query = { description: description};
        const passageRecord = await this.passageSchema.findOne( query as FilterQuery<IPassagePersistence & Document> );
    
        if( passageRecord != null) {
            return PassageMap.toDomain(passageRecord);
        }
        else
            return null;
    }
}