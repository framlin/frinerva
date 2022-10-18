import {DomainEntity} from "../../common/domain/DomainEntity";
import {UseCaseResponseBoundary} from "../../common/use_case/UseCaseResponseBoundary";
import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";

const {Interactors} = require('./interactors');

class InteractorFactory{
    static create(use_case_name: string, domain_entity: DomainEntity, response_boundary: UseCaseResponseBoundary, helper: UseCaseHelper) {
        return new Interactors[use_case_name](domain_entity, response_boundary, helper);
    }
}

module.exports = {InteractorFactory};
export {InteractorFactory}