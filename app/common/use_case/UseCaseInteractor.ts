import {UseCaseHelper} from "./UseCaseHelper";
import {UseCaseResponseBoundary} from "./UseCaseResponseBoundary";

abstract class UseCaseInteractor{
    get helper() {
        return this._helper;
    }

    set helper(value) {
        this._helper = value;
    }
    abstract execute(...data: any[]): any;

    get response_boundary() {
        return this._response_boundary;
    }

    set response_boundary(value) {
        this._response_boundary = value;
    }

    _response_boundary: UseCaseResponseBoundary | undefined;
    _helper: UseCaseHelper | undefined;
}

module.exports = {UseCaseInteractor};
export {UseCaseInteractor}