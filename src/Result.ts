export class Result<TDataType = {}> {
  protected readonly success: boolean;
  protected data: TDataType | null = null;
  private errors: Array<Error> = [];

  protected constructor(success: boolean) {
    this.success = success;
  }

  public IsOk(): boolean {
    return this.success;
  }

  public Data(): TDataType | null {
    return this.data;
  }

  public WithData(data: TDataType): Result<TDataType> {
    this.data = data;
    return this;
  }

  public Errors(): Array<Error> {
    return this.errors;
  }

  public WithError(error: Error): Result<TDataType> {
    this.errors.push(error);
    return this;
  }

  public HasErrors(): boolean {
    return this.errors.length > 0;
  }

  public HasErrorType(errorType: any): boolean {
    for (let i = 0; i < this.errors.length; i += 1) {
      if (this.errors[i] instanceof errorType) {
        return true;
      }
    }
    return false;
  }

  public static Ok<T = {}>(): Result<T> {
    return new Result<T>(true);
  }

  public static OkIf<T = {}>(condition: boolean): Result<T> {
    return new Result<T>(condition);
  }

  public static Fail<T>(error?: Error | null): Result<T> {
    const result = new Result<T>(false);
    return error ? result.WithError(error) : result;
  }

  public static FailIf<T>(condition: boolean, error?: Error | null): Result<T> {
    return condition ? this.Fail(error) : this.Ok();
  }

  public static Try<T = {}>(
    callback: (...args: unknown[]) => any,
    errorTransformer?: (e: unknown) => Error | null
  ): Result<T> {
    try {
      callback();
      return new Result<T>(true);
    } catch (e) {
      const error =
        typeof errorTransformer === 'function' ? errorTransformer(e) : null;
      return Result.Fail<T>(error);
    }
  }
}
