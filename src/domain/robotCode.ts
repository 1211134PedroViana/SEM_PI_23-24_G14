import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface RobotCodeProps {
    value: string;
}

export class RobotCode extends ValueObject<RobotCodeProps> {
    get value (): string {
        return this.props.value;
    }

    private constructor (props: RobotCodeProps) {
        super(props);
    }

    //checks if the code has 30 characters maximum and if it is alfanumeric
    public static isValidCode (code: string): boolean {
        if (code.length > 30 || !/^[a-zA-Z0-9]+$/.test(code)) {
            return false;
        }
    }

    public static create (code: string): Result<RobotCode> {
        const guardResult = Guard.againstNullOrUndefined(code, 'code');
        const isCodeValid = RobotCode.isValidCode(code);

        if (!guardResult.succeeded) {
            return Result.fail<RobotCode>('Robot code cannot be null of undefined');
        } else if (!isCodeValid) {
            return Result.fail<RobotCode>('Invalid robot code format');
        } else {
            return Result.ok<RobotCode>(new RobotCode({ value: code}));
        }
    }
}