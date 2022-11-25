import {UseCaseFactory} from "../factories/UseCaseFactory";
import {UseCaseName} from "../usecase/UseCaseName";
import {DomainEntity} from "./DomainEntity";

export class Domain {
    get domain_name() {
        return this._domain_name;
    }

    constructor(domain_name: string, use_case_factory: UseCaseFactory, entity: DomainEntity) {
        this._domain_name = domain_name;
        this._use_case_factory = use_case_factory;
        this._entity = entity
    }

    create_use_case(use_case_name: UseCaseName) {
        return this._use_case_factory.create(use_case_name);
    }

   protected _use_case_factory;
   protected _domain_name;
   protected _entity;
}
