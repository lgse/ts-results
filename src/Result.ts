export class Result<TDataType = {}> {
  protected readonly success: boolean;
  protected _data: TDataType | null = null;
  private _errors: Array<Error> = [];

  protected constructor(success: boolean, data: TDataType | null = null) {
    this.success = success;
    this._data = data;
  }

  public isOk(): boolean {
    return this.success;
  }

  public IsOk(): boolean {
    return this.isOk();
  }

  public data(): TDataType | null {
    return this._data;
  }

  public Data(): TDataType | null {
    return this.data();
  }

  public withData(data: TDataType | null): Result<TDataType> {
    this._data = data;
    return this;
  }

  public WithData(data: TDataType | null): Result<TDataType> {
    return this.withData(data);
  }

  public errors(): Array<Error> {
    return this._errors;
  }

  public Errors(): Array<Error> {
    return this.errors();
  }

  public withError(error: Error): Result<TDataType> {
    this._errors.push(error);
    return this;
  }

  public WithError(error: Error): Result<TDataType> {
    return this.withError(error);
  }

  public hasErrors(): boolean {
    return this._errors.length > 0;
  }

  public HasErrors(): boolean {
    return this.hasErrors();
  }

  public hasErrorType(errorType: any): boolean {
    for (let i = 0; i < this._errors.length; i += 1) {
      if (this._errors[i] instanceof errorType) {
        return true;
      }
    }
    return false;
  }

  public HasErrorType(errorType: any): boolean {
    return this.hasErrorType(errorType);
  }

  public static ok<T = {}>(data: T | null = null): Result<T> {
    return new Result<T>(true, data);
  }

  public static Ok<T = {}>(data: T | null = null): Result<T> {
    return this.ok(data);
  }

  public static okIf<T = {}>(condition: boolean): Result<T> {
    return new Result<T>(condition);
  }

  public static OkIf<T = {}>(condition: boolean): Result<T> {
    return this.okIf(condition);
  }

  public static fail<T>(error?: Error | null): Result<T> {
    const result = new Result<T>(false);
    return error ? result.withError(error) : result;
  }

  public static Fail<T>(error?: Error | null): Result<T> {
    return this.fail(error);
  }

  public static failIf<T>(condition: boolean, error?: Error | null): Result<T> {
    return condition ? Result.fail(error) : Result.Ok();
  }

  public static FailIf<T>(condition: boolean, error?: Error | null): Result<T> {
    return this.failIf(condition, error);
  }

  public static try<T = {}>(
    callback: (...args: unknown[]) => T | null,
    errorTransformer?: (e: unknown) => Error | null
  ): Result<T> {
    try {
      const data = callback();
      return Result.ok(data);
    } catch (e) {
      const error =
        typeof errorTransformer === 'function' ? errorTransformer(e) : null;
      return Result.fail<T>(error);
    }
  }

  public static Try<T = {}>(
    callback: (...args: unknown[]) => T | null,
    errorTransformer?: (e: unknown) => Error | null
  ): Result<T> {
    return this.try<T>(callback, errorTransformer);
  }
}
