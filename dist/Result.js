"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(success, data = null) {
        this._data = null;
        this._errors = [];
        this.success = success;
        this._data = data;
    }
    isOk() {
        return this.success;
    }
    IsOk() {
        return this.isOk();
    }
    data() {
        return this._data;
    }
    Data() {
        return this.data();
    }
    withData(data) {
        this._data = data;
        return this;
    }
    WithData(data) {
        return this.withData(data);
    }
    errors() {
        return this._errors;
    }
    Errors() {
        return this.errors();
    }
    withError(error) {
        this._errors.push(error);
        return this;
    }
    WithError(error) {
        return this.withError(error);
    }
    hasErrors() {
        return this._errors.length > 0;
    }
    HasErrors() {
        return this.hasErrors();
    }
    hasErrorType(errorType) {
        for (let i = 0; i < this._errors.length; i += 1) {
            if (this._errors[i] instanceof errorType) {
                return true;
            }
        }
        return false;
    }
    HasErrorType(errorType) {
        return this.hasErrorType(errorType);
    }
    static ok(data = null) {
        return new Result(true, data);
    }
    static Ok(data = null) {
        return this.ok(data);
    }
    static okIf(condition) {
        return new Result(condition);
    }
    static OkIf(condition) {
        return this.okIf(condition);
    }
    static fail(error) {
        const result = new Result(false);
        return error ? result.withError(error) : result;
    }
    static Fail(error) {
        return this.fail(error);
    }
    static failIf(condition, error) {
        return condition ? Result.fail(error) : Result.Ok();
    }
    static FailIf(condition, error) {
        return this.failIf(condition, error);
    }
    static try(callback, errorTransformer) {
        try {
            const data = callback();
            return Result.ok(data);
        }
        catch (e) {
            const error = typeof errorTransformer === 'function' ? errorTransformer(e) : null;
            return Result.fail(error);
        }
    }
    static Try(callback, errorTransformer) {
        return this.try(callback, errorTransformer);
    }
}
exports.Result = Result;
