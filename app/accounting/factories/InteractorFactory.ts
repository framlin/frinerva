import {DomainEntity} from "../../common/domain/DomainEntity";
import {UseCaseResponseBoundary} from "../../common/use_case/UseCaseResponseBoundary";
import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import {UseCaseInteractor} from "../../common/use_case/UseCaseInteractor";

const {Interactors} = require('./interactors');

export class InteractorFactory{
    static create(use_case_name: string,
                  domain_entity: DomainEntity,
                  response_boundary: UseCaseResponseBoundary,
                  helper: UseCaseHelper)
    : UseCaseInteractor {
        return new Interactors[use_case_name](domain_entity, response_boundary, helper) ;
    }
}
