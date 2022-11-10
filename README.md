# ts-results

ts-results is a lightweight Javascript library developed to solve a common problem. It returns an object indicating success or failure of an operation instead of throwing/using exceptions. Inspired by [Fluent Results Library for C#](https://github.com/altmann/FluentResults)
# Install
```
npm install @lgse/ts-results
```

# Usage

**Result.ok()**:
```typescript
const result = Result.ok();

// result.isOk() returns true
```

**Result\<T>.ok()**:
```typescript
const result = Result<Array<number>>.ok([1, 2, 3]);
const data = result.data(); // [1,2,3]

// result.IsOk() returns true
```

**Result.ok().withData()**:
```typescript
const result = Result.ok().withData([1, 2, 3]);
```

**Result.ok\<T>()**:
```typescript
const typedResult = Result.ok<Array<number>>();

typedResult.withData(['Joe', 'Bill']); // Wrong type, will throw error
typedResult.withData([1, 2, 3]) // OK
```

**Result.fail()**:
```typescript
const result = Result.fail();

// With Error
const result2 = Result.fail(new Error('Failed because X'));
```

**Result.failIf()**:
```typescript
const result = Result.failIf(1 + 1 === 2); // Fails with truthy condition

// With Error
const result2 = Result.failIf(1 + 1 === 2, new Error('Failed because X'));
```

**Result.try()**:
```typescript
const result = Result.try(() => {
  throw new Error('An error occurred');
}); // Will fail

// With Optional Error Transformer
const result2 = Result.try(() => {
  throw new Error('An error occurred');
}, (e: Error) => new CustomError('...'));
```

**Result.hasErrors()**:
```typescript
  const error = new Error();
  const result = Result.fail(error);
  
  result.hasError(); // true
```

**Result.hasErrorType()**:
```typescript
  class CustomError extends Error {}

  const error = new CustomError();
  const result = Result.fail(error);

  result.hasErrorType(CustomError); // true
```
