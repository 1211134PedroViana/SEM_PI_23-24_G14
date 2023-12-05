import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { SystemUser } from '../domain/systemUser';
import ISystemUserDTO from '../dto/ISystemUserDTO';
import { ISystemUserPersistence } from '../dataschema/ISystemUserPersistence';

export class SystemUserMap extends Mapper<SystemUser> {
  public static toDTO(systemUser: SystemUser): ISystemUserDTO {
    return {
      id: systemUser.id.toString(),
      email: systemUser.email,
      password: systemUser.password,
      role: systemUser.role,
    } as ISystemUserDTO;
  }

  public static toDomain(building: any | Model<ISystemUserPersistence & Document>): SystemUser {
    const buildingOrError = SystemUser.create(building, new UniqueEntityID(building.domainId));

    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toDomainBulk(buildingList: any[]): SystemUser[] {
    const buildingListDomain = [];
    let index = 0;

    for (let i = 0; i < buildingList.length; i++) {
      const buildingOrError = SystemUser.create(
        {
          email: buildingList[i].email,
          password: buildingList[i].password,
          role: buildingList[i].role,
        } as ISystemUserDTO,
        new UniqueEntityID(buildingList[i].domainId),
      );

      if (buildingOrError.isSuccess) {
        buildingListDomain[index] = buildingOrError.getValue();
        index++;
      }
    }

    if (buildingListDomain == undefined) return null;
    else return buildingListDomain;
  }

  public static toPersistence(building: SystemUser): any {
    return {
      domainId: building.id.toString(),
      code: building.email,
      description: building.password,
      name: building.role,
    };
  }
}
