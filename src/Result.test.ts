import { Result } from './Result';

test('Result.ok() returns a success result object', () => {
  const result = Result.ok();
  expect(result.isOk()).toBe(true);
});

test('Result.ok([1,2,3]) returns a success result object with data', () => {
  const result = Result.ok<Array<number>>([1, 2, 3]);
  expect(result.isOk()).toBe(true);
  expect(result.data()).toEqual([1, 2, 3]);
});

test('Result.okIf() returns a success result object with a passing condition', () => {
  const result = Result.okIf(1 + 1 === 2);
  expect(result.isOk()).toBe(true);
});

test('Result.fail() returns a failure result object', () => {
  const result = Result.fail();
  expect(result.isOk()).toBe(false);
});

test('Result.failIf() returns a failure result object with a failing condition', () => {
  const result = Result.failIf(1 + 1 == 2);
  expect(result.isOk()).toBe(false);
});

test('Result.failIf() returns a success result object with no errors if condition is false', () => {
  const result = Result.failIf(1 + 1 == 4, new Error('failure'));
  expect(result.isOk()).toBe(true);
  expect(result.hasErrors()).toBe(false);
});

test('Result.try() returns a success object with a passing try statement', () => {
  const result = Result.try(() => {});
  expect(result.isOk()).toBe(true);
});

test('Result.try() returns a success object with data', () => {
  const result = Result.try(() => 1 + 1);
  expect(result.isOk()).toBe(true);
  expect(result.data()).toBe(2);
});

test('Result.try() returns a failure object with a failing try statement', () => {
  const result = Result.try(() => {
    throw new Error('An error occurred');
  });
  expect(result.isOk()).toBe(false);
});

test('Result.try() returns a failure object with a formatted error', () => {
  const result = Result.try(
    () => {
      throw new Error('An error occurred');
    },
    (e) => e as Error
  );
  expect(result.isOk()).toBe(false);
  expect(result.hasErrors()).toBe(true);
});

test('Result.withData() adds data', () => {
  const data = [1, 2, 3];
  const result = Result.ok().withData(data);
  expect(result.data()).toBe(data);
});

test('Result.withError() adds an error', () => {
  const error = new Error('An error occurred');
  const result = Result.ok().withError(error);
  expect(result.errors()[0]).toBe(error);
});

test('Result.hasErrors() returns true if there is an error', () => {
  const error = new Error();
  const result = Result.ok().withError(error);
  expect(result.hasErrors()).toBe(true);
});

test('Result.hasErrorType() tells if an error of a certain type exists', () => {
  class CustomError extends Error {}

  const error = new CustomError();
  const result = Result.ok().withError(error);
  expect(result.hasErrorType(CustomError)).toBe(true);
});
