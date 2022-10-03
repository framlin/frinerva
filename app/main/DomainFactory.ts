import {MainWindow} from "./MainWindow";

const Domain = require('../common/domain/Domain');

const domain_factories = {
    accounting: require('../accounting/factories/factories'),
}



function create_domain(domain_name: string, main_window: MainWindow) {
    // @ts-ignore
    let factories = domain_factories[domain_name];
    factories.use_case.config(factories.presenter, factories.interactor, factories.controller, factories.helper, main_window.webContents)
    return new Domain(domain_name, factories);
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

module.exports = DomainFactory;