import {MainWindow} from "./MainWindow";

import {Domain} from '../common/domain/Domain';
import {factories} from '../accounting/factories/factories';
import {Accounting} from "../accounting/account/Accounting";
import {AccountingHelper} from "../common/persistence/helper/AccountingHelper";

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
    // @ts-ignore
    let factories = domain_factories[domain_name];
    // @ts-ignore
    let helper = domain_helper[domain_name]
    // @ts-ignore
    let domain_entity: Accounting = new domain_entities[domain_name](helper)
    factories.use_case.IPCChannel = main_window.webContents;
    factories.use_case.DomainEntity = domain_entity;
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