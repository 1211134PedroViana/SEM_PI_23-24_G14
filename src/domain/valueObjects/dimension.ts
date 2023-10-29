import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface DimensionProps {
    pos1: number;
    pos2: number;
    pos3: number;
    pos4: number;
}

export class Dimension extends ValueObject<DimensionProps> {
    get pos1 (): number {
        return this.props.pos1;
    }

    get pos2 (): number {
        return this.props.pos2;
    }

    get pos3 (): number {
        return this.props.pos3;
    }

    get pos4 (): number {
        return this.props.pos4;
    }

    private constructor (props: DimensionProps) {
        super(props);
    }

    public static create (props: DimensionProps): Result<Dimension> {
        const guardedProps = [
            { argument: props.pos1, argumentName: 'pos1' },
            { argument: props.pos2, argumentName: 'pos2' },
            { argument: props.pos3, argumentName: 'pos3' },
            { argument: props.pos4, argumentName: 'pos4' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if(!guardResult.succeeded) {
            return Result.fail<Dimension>('');
        } else{
            return Result.ok<Dimension>(new Dimension({...props}));
        }
    }
}