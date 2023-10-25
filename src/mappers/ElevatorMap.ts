import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Elevator } from "../domain/elevator";
import IElevatorDTO from "../dto/IElevatorDTO";
import { IElevatorPersistence } from "../dataschema/IElevatorPersistence";


export class ElevatorMap extends Mapper<Elevator> {

    public static toDTO( elevator: Elevator): IElevatorDTO {
        return {
            code: elevator.id.toString(),
            location: {
                positionX: elevator.location.positionX,
                positionY: elevator.location.positionY,
                direction: elevator.location.direction,
            },
        } as IElevatorDTO;
    }

    public static toDomain( elevator: any | Model<IElevatorPersistence & Document> ): Elevator {

        const elevatorOrError = Elevator.create(
            elevator,
            new UniqueEntityID(elevator._id)
        );

        elevatorOrError.isFailure ? console.log(elevatorOrError.getValue()): '';
        return elevatorOrError.isSuccess ? elevatorOrError.getValue(): null;
    }

    public static toDomainBulk(elevatorList: any[]): Elevator[] {
        var elevatorListDomain = [];        
        var index = 0;
        
        for (let i = 0; i < elevatorList.length; i++) {
            const elevatorOrError = Elevator.create({
                location: elevatorList[i].location,
            }, new UniqueEntityID(elevatorList[i].domainId))

            if (elevatorOrError.isSuccess){
                elevatorListDomain[index] = elevatorOrError.getValue();
                index++;
            }
            
        }

        if (elevatorListDomain == undefined)
            return null;
        else
            return elevatorListDomain;
    }


    public static toPersistence(elevator: Elevator): any {
        return {
            domainId: elevator.id.toString(),
            location: {
                 positionX: elevator.location.
                 positionY: elevator.location.positionY,
                 direction: elevator.location.direction,
            }
        }
    }
}