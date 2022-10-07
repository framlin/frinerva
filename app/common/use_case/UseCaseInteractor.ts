import {UseCaseHelper} from "./UseCaseHelper";
import {UseCaseResponseBoundary} from "./UseCaseResponseBoundary";
import {UseCaseRequestBoundary} from "./UseCaseRequestBoundary";

abstract class UseCaseInteractor implements UseCaseRequestBoundary{

    abstract execute(...data: any[]): any;

    get helper() {
        return this._helper;
    }

    set helper(value) {
        this._helper = value;
    }

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