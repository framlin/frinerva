import {DomainEntity} from "../domain/DomainEntity";
import {UseCaseHelper} from "./UseCaseHelper";
import {UseCaseInteractor} from "./UseCaseInteractor";
import {UseCaseResponseBoundary} from "./UseCaseResponseBoundary";

export type UseCaseInteractorConstructor = {
    new(domain_entity: DomainEntity,
        response_boundary: UseCaseResponseBoundary,
        helper: UseCaseHelper): UseCaseInteractor
} & typeof UseCaseInteractor;



