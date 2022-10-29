import {MainWindow} from "./MainWindow";

import {Domain} from '../common/domain/Domain';
import {factories} from '../accounting/factories/factories';
import {UseCases} from "../accounting/factories/use_cases";
import {Accounting} from "../accounting/account/Accounting";
import {AccountingHelper} from "../common/persistence/helper/AccountingHelper";
import {Observatory} from "../common/observation/Observatory";

const domain_factories = {
    accounting: factories,
}

const domain_entities = {
    accounting: Accounting,
}

const domain_helper = {
    accounting: AccountingHelper
}

function create_domain(domain_name: string, main_window: MainWindow) {
    let observatory = new Observatory();
    // @ts-ignore
    let factories = domain_factories[domain_name];
    // @ts-ignore
    let helper = domain_helper[domain_name]
    // @ts-ignore
    let domain_entity: DomainEntty = new domain_entities[domain_name](helper);
    domain_entity.provide_at(observatory);
    factories.use_case.IPCChannel = main_window.webContents;
    factories.use_case.DomainEntity = domain_entity;
    factories.use_case.Observatory = observatory;
    factories.use_case.UseCases = UseCases;
    return new Domain(domain_name, factories, domain_entity);
}

class DomainFactory {
    static main_window: MainWindow;
    static create(domain_name: string) {
        return create_domain(domain_name, this.main_window);
    }
    static get_domains() {
        let domains = [];
        for (let domain in domain_factories) {
            domains.push(domain);
        }
        return domains;
    }
}

module.exports = {DomainFactory};
export {DomainFactory}