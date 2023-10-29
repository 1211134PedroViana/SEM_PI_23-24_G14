import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value;
}

  private constructor(props: UserEmailProps) {
    super(props);
  }

  public static create(email: string | null | undefined): Result<UserEmail> {
    if (email === null || email === undefined) {
      return Result.fail<UserEmail>('Email cannot be null or undefined');
    }
    
    const guardResult = Guard.againstNullOrUndefined(email, 'email');
    if (!guardResult.succeeded) {
      return Result.fail<UserEmail>(guardResult.message);
    } else {
      return Result.ok<UserEmail>(new UserEmail({ value: email }));
    }
  }
}
