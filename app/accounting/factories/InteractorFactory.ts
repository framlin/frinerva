import {DomainEntity} from "../../common/domain/DomainEntity";

const {Interactors} = require('./interactors');

class InteractorFactory{
    static create(use_case_name: string, domain_entity: DomainEntity) {
        return new Interactors[use_case_name](domain_entity);
    }
}

module.exports = {InteractorFactory};
export {InteractorFactory}