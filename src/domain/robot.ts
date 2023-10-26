import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { RobotId } from "./robotId";
import { Description } from "./description";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface RobotProps {
    code: string;
    nickname: string;
    robotType: string;
    serialNumber: Number;
    description: Description;
    status: string;
}

export class Robot extends AggregateRoot<RobotProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get robotId (): RobotId {
        return new RobotId(this.robotId.toValue());
    }

    get code (): string {
        return this.props.code;
    }

    get nickname (): string {
        return this.props.nickname;
    }

    get robotType (): string {
        return this.props.robotType;
    }

    get serialNumber (): Number {
        return this.props.serialNumber;
    }

    get description (): Description {
        return this.props.description;
    }

    get status (): string {
        return this.props.status;
    }  

    set robotType ( value: string ) {
        this.props.robotType = value;
    }

    set serialNumber ( value: Number) {
        this.props.serialNumber = value;
    }

    set description ( value: Description ) {
        this.props.description = value;
    }

    set status ( value: string ) {
        this.props.status = value;
    }

    private constructor(props: RobotProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: RobotProps, id?: UniqueEntityID): Result<Robot> {

        const guardedProps = [
            { argument: props.code, argumentName: 'code' },
            { argument: props.nickname, argumentName: 'nickname' },
            { argument: props.robotType, argumentName: 'type'},
            { argument: props.serialNumber, argumentName: 'serialNumber'},
            { argument: props.description, argumentName: 'description'},
            { argument: props.status, argumentName: 'status'},
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Robot>(' ');
        } else {
            const robot = new Robot({...props}, id);
            return Result.ok<Robot>( robot );
        }
    }
}