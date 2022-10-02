import { Result } from './Result';

test('Result.Ok() returns a success result object', () => {
  const result = Result.Ok();
  expect(result.IsOk()).toBe(true);
});

test('Result.OkIf() returns a success result object with a passing condition', () => {
  const result = Result.OkIf(1 + 1 === 2);
  expect(result.IsOk()).toBe(true);
});

test('Result.Fail() returns a failure result object', () => {
  const result = Result.Fail();
  expect(result.IsOk()).toBe(false);
});

test('Result.FailIf() returns a failure result object with a failing condition', () => {
  const result = Result.FailIf(1 + 1 == 2);
  expect(result.IsOk()).toBe(false);
});

test('Result.FailIf() returns a success result object with no errors if condition is false', () => {
  const result = Result.FailIf(1 + 1 == 4, new Error("failure"));
  expect(result.IsOk()).toBe(true);
  expect(result.HasErrors()).toBeFalsy();
});

test('Result.Try() returns a success object with a passing try statement', () => {
  const result = Result.Try(() => {});
  expect(result.IsOk()).toBe(true);
});

test('Result.Try() returns a failure object with a failing try statement', () => {
  const result = Result.Try(() => {
    throw new Error('An error occurred');
  });
  expect(result.IsOk()).toBe(false);
});

test('Result.Try() returns a failure object with a formatted error', () => {
  const result = Result.Try(
    () => {
      throw new Error('An error occurred');
    },
    (e) => e as Error
  );
  expect(result.IsOk()).toBe(false);
  expect(result.HasErrors()).toBe(true);
});

test('Result.WithData() adds data', () => {
  const data = [1, 2, 3];
  const result = Result.Ok().WithData(data);
  expect(result.Data()).toBe(data);
});

test('Result.WithError() adds an error', () => {
  const error = new Error('An error occurred');
  const result = Result.Ok().WithError(error);
  expect(result.Errors()[0]).toBe(error);
});

test('Result.HasErrors() returns true if there is an error', () => {
  const error = new Error();
  const result = Result.Ok().WithError(error);
  expect(result.HasErrors()).toBe(true);
});

test('Result.HasErrorType() tells if an error of a certain type exists', () => {
  class CustomError extends Error {}

  const error = new CustomError();
  const result = Result.Ok().WithError(error);
  expect(result.HasErrorType(CustomError)).toBe(true);
});
