import {DomainEntity} from "../../common/domain/DomainEntity";
import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import {UseCaseInteractor} from "../../common/use_case/UseCaseInteractor";
import {UseCaseResponseBoundary} from "../../common/use_case/UseCaseResponseBoundary";

export class InteractorFactory {
    static create(ctor: typeof UseCaseInteractor,
                  domain_entity: DomainEntity,
                  response_boundary: UseCaseResponseBoundary,
                  helper: UseCaseHelper)
        : UseCaseInteractor {
        return new ctor(domain_entity, response_boundary, helper);
    }
}
