import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface TaskTypeCodeProps {
  value: string;
}

export class TaskTypeCode extends ValueObject<TaskTypeCodeProps> {
    get value (): string {
      return this.props.value;
    }
    
    private constructor (props: TaskTypeCodeProps) {
      super(props);
    }

    //Checks if the text has only alphanumerics and a max of 25 characters
    public static isValidCode (text: string): boolean {
        return new RegExp('^[a-zA-Z0-9]{1,25}$').test(text);
    }
  
    public static create (code: string): Result<TaskTypeCode> {
      const guardResult = Guard.againstNullOrUndefined(code, 'code');
      const isCodeValid = TaskTypeCode.isValidCode(code);

      if (!guardResult.succeeded) {
        return Result.fail<TaskTypeCode>('TaskType Code cannot be null or undefined');
      } else if (!isCodeValid) {
        return Result.fail<TaskTypeCode>('Invalid TaskType Code format');
      } else {
        return Result.ok<TaskTypeCode>(new TaskTypeCode({ value: code }));
      }
    }
}