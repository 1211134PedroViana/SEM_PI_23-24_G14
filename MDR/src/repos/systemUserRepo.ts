import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import ISystemUserRepo from '../services/IRepos/ISystemUserRepo';
import { SystemUser } from '../domain/systemUser';
import { SystemUserMap } from '../mappers/SystemUserMap';
import { ISystemUserPersistence } from '../dataschema/ISystemUserPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

@Service()
export default class SystemUserRepo implements ISystemUserRepo {
  private models: any;

  constructor(@Inject('buildingSchema') private systemUserSchema: Model<ISystemUserPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(systemUser: SystemUser): Promise<boolean> {
    try {
      const idX = systemUser.id instanceof UniqueEntityID ? systemUser.id.toValue() : systemUser.id;

      const query: FilterQuery<ISystemUserPersistence & Document> = { domainId: idX };
      const systemUserDocument = await this.systemUserSchema.findOne(query);

      return !!systemUserDocument;
    } catch (error) {
      console.error('Error checking existence of SystemUser:', error);
      return false;
    }
  }

  public async save(systemUser: SystemUser): Promise<SystemUser> {
    const query = { domainId: systemUser.id };

    const systemUserDocument = await this.systemUserSchema.findOne(query);

    try {
      if (systemUserDocument === null) {
        const rawBuilding: any = SystemUserMap.toPersistence(systemUser);

        const systemUserCreated = await this.systemUserSchema.create(rawBuilding);

        return SystemUserMap.toDomain(systemUserCreated);
      } else {
        if (systemUser.role === undefined || systemUser.role === '') {
          systemUserDocument.email = systemUser.email;
        } else if (systemUser.email === undefined || systemUser.email === '') {
          systemUserDocument.role = systemUser.role;
        } else {
          systemUserDocument.role = systemUser.role;
          systemUserDocument.email = systemUser.email;
        }

        await systemUserDocument.save();

        return systemUser;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(systemUserId: string): Promise<SystemUser | null> {
    try {
      const query: FilterQuery<ISystemUserPersistence & Document> = { domainId: systemUserId };
      const systemUserRecord = await this.systemUserSchema.findOne(query);

      return systemUserRecord ? SystemUserMap.toDomain(systemUserRecord) : null;
    } catch (error) {
      console.error('Error finding Building by domainId:', error);
      throw error; // ou retorne null ou outro valor padrão dependendo da sua lógica
    }
  }

  public async findByEmail(email: string): Promise<SystemUser | null> {
    try {
      const query: FilterQuery<ISystemUserPersistence & Document> = { email: email };
      const systemUserRecord = await this.systemUserSchema.findOne(query);

      return systemUserRecord ? SystemUserMap.toDomain(systemUserRecord) : null;
    } catch (error) {
      console.error('Error finding SystemUser by email:', error);
      throw error; // ou retorne null ou outro valor padrão dependendo da sua lógica
    }
  }
}
