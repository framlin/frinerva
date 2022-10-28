import {DomainEntity} from "../../common/domain/DomainEntity";
import {UseCaseResponseBoundary} from "../../common/use_case/UseCaseResponseBoundary";
import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import {UseCaseInteractor} from "../../common/use_case/UseCaseInteractor";
import {Blueprint} from "../../common/use_case/Blueprint";

export class InteractorFactory{
    static create(blueprint: Blueprint,
                  domain_entity: DomainEntity,
                  response_boundary: UseCaseResponseBoundary,
                  helper: UseCaseHelper)
    : UseCaseInteractor {
        return new blueprint.interactor(domain_entity, response_boundary, helper) ;
    }
}
