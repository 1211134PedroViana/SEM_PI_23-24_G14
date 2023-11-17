import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface DescriptionProps {
  value: string;
}

export class Description extends ValueObject<DescriptionProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: DescriptionProps) {
    super(props);
  }

  //Checks if the text has only a char in the range of [A-Z]
  public static isValidDescription(text: string): boolean {
    if (text === undefined) {
      return true;
    }
    return text.length <= 255;
  }

  public static create(description: string): Result<Description> {
    if (!this.isValidDescription(description)) {
      return Result.fail<Description>('Description exceeds the maximum characters(255)');
    } else {
      return Result.ok<Description>(new Description({ value: description }));
    }
  }
}
