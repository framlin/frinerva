import {UseCaseHelper} from "./UseCaseHelper";
import {UseCaseResponseBoundary} from "./UseCaseResponseBoundary";
import {UseCaseRequestBoundary} from "./UseCaseRequestBoundary";
import {DomainEntity} from "../domain/DomainEntity";

abstract class UseCaseInteractor implements UseCaseRequestBoundary{

    constructor(
        protected _domain_entity: DomainEntity,
        protected _response_boundary: UseCaseResponseBoundary,
        protected _helper : UseCaseHelper
    ) {}

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
}

module.exports = {UseCaseInteractor};
export {UseCaseInteractor}