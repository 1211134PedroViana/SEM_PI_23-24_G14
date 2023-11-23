import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Elevator } from '../domain/elevator';
import IElevatorDTO from '../dto/IElevatorDTO';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';

export class ElevatorMap extends Mapper<Elevator> {
  public static toDTO(elevator: Elevator): IElevatorDTO {
    return {
      id: elevator.id.toString(),
      code: elevator.code.value,
      location: {
        positionX: elevator.location.positionX,
        positionY: elevator.location.positionY,
        direction: elevator.location.direction,
      },
      buildingId: elevator.buildingId,
      floorList: elevator.floorList,
      brand: elevator.brand,
      model: elevator.model,
      serialNumber: elevator.serialNumber,
      description: elevator.description.value,
    } as IElevatorDTO;
  }

  public static toDomain(elevator: any | Model<IElevatorPersistence & Document>): Elevator {
    const elevatorOrError = Elevator.create(elevator, new UniqueEntityID(elevator.domainId));

    elevatorOrError.isFailure ? console.log(elevatorOrError.getValue()) : '';
    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
  }

  public static toDomainBulk(elevatorList: any[]): Elevator[] {
    const elevatorListDomain = [];
    let index = 0;

    for (let i = 0; i < elevatorList.length; i++) {
      const elevatorOrError = Elevator.create(
        {
          code: elevatorList[i].code,
          location: elevatorList[i].location,
          buildingId: elevatorList[i].buildingId,
          floorList: elevatorList[i].floorList,
          brand: elevatorList[i].brand,
          model: elevatorList[i].model,
          serialNumber: elevatorList[i].serialNumber,
          description: elevatorList[i].description,
        } as IElevatorDTO,
        new UniqueEntityID(elevatorList[i].domainId),
      );

      if (elevatorOrError.isSuccess) {
        elevatorListDomain[index] = elevatorOrError.getValue();
        index++;
      }
    }

    if (elevatorListDomain == undefined) return null;
    else return elevatorListDomain;
  }

  public static toPersistence(elevator: Elevator): any {
    return {
      domainId: elevator.id.toString(),
      code: elevator.code.value,
      location: {
        positionX: elevator.location.positionX,
        positionY: elevator.location.positionY,
        direction: elevator.location.direction,
      },
      buildingId: elevator.buildingId,
      floorList: elevator.floorList,
      brand: elevator.brand,
      model: elevator.model,
      serialNumber: elevator.serialNumber,
      description: elevator.description.value,
    };
  }
}
