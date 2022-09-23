const Domain = require('../common/domain/Domain');

const domain_factories = {
    accounting: require('../accounting/factories/factories'),
}


function create_domain(domain_name, main_window) {
    let factories = domain_factories[domain_name];
    factories.use_case.config(factories.presenter, factories.interactor, factories.controller, factories.helper, main_window.webContents)
    return new Domain(domain_name, factories);
}


class DomainFactory {
    static main_window;
    static create(domain_name) {
        return create_domain(domain_name, this.main_window);
    }
}

module.exports = DomainFactory;