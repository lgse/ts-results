export declare class Result<TDataType = {}> {
  protected readonly success: boolean;
  protected data: TDataType | null;
  private errors;
  protected constructor(success: boolean, data?: TDataType | null);
  IsOk(): boolean;
  Data(): TDataType | null;
  WithData(data: TDataType | null): Result<TDataType>;
  Errors(): Array<Error>;
  WithError(error: Error): Result<TDataType>;
  HasErrors(): boolean;
  HasErrorType(errorType: any): boolean;
  static Ok<T = {}>(data?: T | null): Result<T>;
  static OkIf<T = {}>(condition: boolean): Result<T>;
  static Fail<T>(error?: Error | null): Result<T>;
  static FailIf<T>(condition: boolean, error?: Error | null): Result<T>;
  static Try<T = {}>(callback: (...args: unknown[]) => T | null, errorTransformer?: (e: unknown) => Error | null): Result<T>;
}
