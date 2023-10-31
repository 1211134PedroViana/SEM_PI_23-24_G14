import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { RobotId } from "./robotId";
import { Description } from "./valueObjects/description";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { RobotCode } from "./valueObjects/robotCode";
import IRobotDTO from "../dto/IRobotDTO";

interface RobotProps {
    code: RobotCode;
    nickname: string;
    robotType: string;
    serialNumber: number;
    description: Description;
    isActive: boolean;
}

export class Robot extends AggregateRoot<RobotProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get robotId (): RobotId {
        return new RobotId(this.robotId.toValue());
    }

    get code (): RobotCode {
        return this.props.code;
    }

    get nickname (): string {
        return this.props.nickname;
    }

    get robotType (): string {
        return this.props.robotType;
    }

    get serialNumber (): number {
        return this.props.serialNumber;
    }

    get description (): Description {
        return this.props.description;
    }

    get isActive (): boolean {
        return this.props.isActive;
    }  

    set robotType ( value: string ) {
        this.props.robotType = value;
    }

    set serialNumber ( value: number) {
        this.props.serialNumber = value;
    }

    set description ( value: Description ) {
        this.props.description = value;
    }

    set isActive ( value: boolean ) {
        this.props.isActive = value;
    }

    private constructor(props: RobotProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(robotDTO: IRobotDTO, id?: UniqueEntityID): Result<Robot> {

        const code = RobotCode.create(robotDTO.code).getValue();
        const description = Description.create(robotDTO.description).getValue();
    
        const guardedProps = [
            { argument: robotDTO.code, argumentName: 'code' },
            { argument: robotDTO.nickname, argumentName: 'nickname' },
            { argument: robotDTO.robotType, argumentName: 'robotType'},
            { argument: robotDTO.serialNumber, argumentName: 'serialNumber'},
            { argument: robotDTO.description, argumentName: 'description'},
            { argument: robotDTO.isActive, argumentName: 'isActive'},
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Robot>('Robot data cant be null or undefined');
        } else {
            const robot = new Robot({code: code, nickname: robotDTO.nickname, robotType:robotDTO.robotType, serialNumber:robotDTO.serialNumber, description:description, isActive:robotDTO.isActive}, id);
            return Result.ok<Robot>( robot );
        }
    }
}