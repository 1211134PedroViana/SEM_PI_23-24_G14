import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Passage } from "../domain/passage";
import IPassageDTO from "../dto/IPassageDTO";
import { IPassagePersistence } from "../dataschema/IPassagePersistence";

export class PassageMap extends Mapper<Passage> {

    public static toDTO( passage: Passage): IPassageDTO {
        return {
            id: passage.id.toString(),
            fromFloorId: passage.fromFloor.id.toString(),
            toFloorId: passage.toFloor.id.toString(),
            location: {
                positionX: passage.location.positionX,
                positionY: passage.location.positionY,
                direction: passage.location.direction,
            },
        } as IPassageDTO;
    }

    public static toDomain( passage: any | Model<IPassagePersistence & Document> ): Passage {

        const passageOrError = Passage.create(
            passage,
            new UniqueEntityID(passage._id)
        );

        passageOrError.isFailure ? console.log(passageOrError.getValue()): '';
        return passageOrError.isSuccess ? passageOrError.getValue(): null;
    }

    public static toPersistence(passage: Passage): any {
        return {
            domainId: passage.id.toString(),
            fromFloor: passage.fromFloor.id.toString(),
            toFloor: passage.toFloor.id.toString(),
            location: {
                 positionX: passage.location.positionX,
                 positionY: passage.location.positionY,
                 direction: passage.location.direction,
            }
        }
    }
}