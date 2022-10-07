"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainFactory = void 0;
const Domain_1 = require("../common/domain/Domain");
const factories_1 = require("../accounting/factories/factories");
const domain_factories = {
    accounting: factories_1.factories,
};
function create_domain(domain_name, main_window) {
    // @ts-ignore
    let factories = domain_factories[domain_name];
    factories.use_case.IPCChannel = main_window.webContents;
    return new Domain_1.Domain(domain_name, factories);
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