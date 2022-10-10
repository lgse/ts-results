# ts-results

ts-results is a lightweight Javascript library developed to solve a common problem. It returns an object indicating success or failure of an operation instead of throwing/using exceptions. Inspired by [Fluent Results Library for C#](https://github.com/altmann/FluentResults)
# Install
```
npm install @lgse/ts-results
```

# Usage

**Result.Ok()**:
```typescript
const result = Result.Ok();

// result.IsOk() returns true
```

**Result\<T>.Ok()**:
```typescript
const result = Result<Array<number>>.Ok([1, 2, 3]);
const data = result.Data(); // [1,2,3]

// result.IsOk() returns true
```

**Result.Ok().WithData()**:
```typescript
const result = Result.Ok().WithData([1, 2, 3]);
```

**Result.Ok\<T>()**:
```typescript
const typedResult = Result.Ok<Array<number>>();

typedResult.WithData(['Joe', 'Bill']); // Wrong type, will throw error
typedResult.WithData([1, 2, 3]) // OK
```

**Result.Fail()**:
```typescript
const result = Result.Fail();

// With Error
const result2 = Result.Fail(new Error('Failed because X'));
```

**Result.FailIf()**:
```typescript
const result = Result.FailIf(1 + 1 === 2); // Fails with truthy condition

// With Error
const result2 = Result.FailIf(1 + 1 === 2, new Error('Failed because X'));
```

**Result.Try()**:
```typescript
const result = Result.Try(() => {
  throw new Error('An error occurred');
}); // Will fail

// With Optional Error Transformer
const result2 = Result.Try(() => {
  throw new Error('An error occurred');
}, (e: Error) => new CustomError('...'));
```

**Result.HasErrors()**:
```typescript
  const error = new Error();
  const result = Result.Ok().WithError(error);

  result.HasError(); // true
```

**Result.HasErrorType()**:
```typescript
  class CustomError extends Error {}

  const error = new CustomError();
  const result = Result.Ok().WithError(error);

  result.HasErrorType(CustomError); // true
```
