import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import IBuildingDTO from "../dto/IBuildingDTO";
import { BuildingId } from "./buildingId";
import { BuildingCode } from "./buildingCode";
import { Description } from "./description";
import { Guard } from "../core/logic/Guard";

interface BuildingProps {
    code: BuildingCode;
    name: string;
    description: Description;
}

export class Building extends AggregateRoot<BuildingProps> {

    get id (): UniqueEntityID {
        return this._id;
    }
    
    get buildingId (): BuildingId {
        return new BuildingId(this._id.toValue());
    }
    
    get code (): BuildingCode {
        return this.props.code;
    }

    get description (): Description {
        return this.props.description;
    }
    
    get name (): string {
        return this.props.name;
    }
    
    set name ( value: string ) {
        this.props.name = value;
    }

    private constructor (props: BuildingProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: BuildingProps, id?: UniqueEntityID): Result<Building> {

      const guardedProps = [
        { argument: props.code, argumentName: 'code' },
      ];

      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      
      if (!guardResult.succeeded) {
        return Result.fail<Building>('Must provide a building code');
      } else {
        const building = new Building({ ...props }, id);
        return Result.ok<Building>( building );
      }
    }
}