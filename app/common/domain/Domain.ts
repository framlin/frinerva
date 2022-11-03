import {TUseCaseName} from "../use_case/TUseCaseName";
import {DomainEntity} from "./DomainEntity";

class Domain {
    get domain_name() {
        return this._domain_name;
    }

    constructor(domain_name: string, factories: any, entity: DomainEntity) {
        this._domain_name = domain_name;
        this._factories = factories;
        this._entity = entity
    }

    create_use_case(use_case_name: TUseCaseName) {
        return this._factories.use_case.create(use_case_name);
    }

   protected _factories;
   protected _domain_name;
   protected _entity;
}

module.exports = {Domain};
export {Domain}