import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface RoomCodeProps {
    value: string;
}

export class RoomCode extends ValueObject<RoomCodeProps> {
    get value (): string {
        return this.props.value;
    }

    private constructor (props: RoomCodeProps) {
        super(props);
    }

    //Checks if the text has only a char in the range of [A-Z]
    public static isValidCode (text: string): boolean {
        return new RegExp('^[a-zA-Z]\\d{1,3}$').test(text);
    }

    public static create (code: string): Result<RoomCode> {
        const guardResult = Guard.againstNullOrUndefined(code, 'code');
        const isCodeValid = RoomCode.isValidCode(code);

        if (!guardResult.succeeded) {
            return Result.fail<RoomCode>('Room Code cannot be null or undefined');
        } else if (!isCodeValid) {
            return Result.fail<RoomCode>('Invalid Room Code format');
        } else {
            return Result.ok<RoomCode>(new RoomCode({ value: code }));
        }
    }
}