"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(success, data = null) {
        this.data = null;
        this.errors = [];
        this.success = success;
        this.data = data;
    }
    IsOk() {
        return this.success;
    }
    Data() {
        return this.data;
    }
    WithData(data) {
        this.data = data;
        return this;
    }
    Errors() {
        return this.errors;
    }
    WithError(error) {
        this.errors.push(error);
        return this;
    }
    HasErrors() {
        return this.errors.length > 0;
    }
    HasErrorType(errorType) {
        for (let i = 0; i < this.errors.length; i += 1) {
            if (this.errors[i] instanceof errorType) {
                return true;
            }
        }
        return false;
    }
    static Ok(data = null) {
        return new Result(true, data);
    }
    static OkIf(condition) {
        return new Result(condition);
    }
    static Fail(error) {
        const result = new Result(false);
        return error ? result.WithError(error) : result;
    }
    static FailIf(condition, error) {
        return condition ? Result.Fail(error) : Result.Ok();
    }
    static Try(callback, errorTransformer) {
        try {
            const data = callback();
            return new Result(true).WithData(data);
        }
        catch (e) {
            const error = typeof errorTransformer === 'function' ? errorTransformer(e) : null;
            return Result.Fail(error);
        }
    }
}
exports.Result = Result;
