"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainFactory = void 0;
const Domain_1 = require("../common/domain/Domain");
const factories_1 = require("../accounting/factories/factories");
const Accounting_1 = require("../accounting/account/Accounting");
const AccountingHelper_1 = require("../common/persistence/helper/AccountingHelper");
const domain_factories = {
    accounting: factories_1.factories,
};
const domain_entities = {
    accounting: Accounting_1.Accounting,
};
const domain_helper = {
    accounting: AccountingHelper_1.AccountingHelper
};
function create_domain(domain_name, main_window) {
    // @ts-ignore
    let factories = domain_factories[domain_name];
    // @ts-ignore
    let helper = domain_helper[domain_name];
    // @ts-ignore
    let domain_entity = new domain_entities[domain_name](helper);
    factories.use_case.IPCChannel = main_window.webContents;
    factories.use_case.DomainEntity = domain_entity;
    return new Domain_1.Domain(domain_name, factories, domain_entity);
}
class DomainFactory {
    static create(domain_name) {
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
exports.DomainFactory = DomainFactory;
module.exports = { DomainFactory };
//# sourceMappingURL=DomainFactory.js.map