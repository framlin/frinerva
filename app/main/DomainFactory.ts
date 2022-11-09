import {Accounting} from "../accounting/entites/Accounting";
import {factories} from '../accounting/factories';
import {UseCases} from "../accounting/use_cases";
import {Domain} from '../common/domain/Domain';
import {DomainEntity} from "../common/domain/DomainEntity";
import {DomainHelper} from "../common/domain/DomainHelper";
import {Observatory} from "../common/observation/Observatory";
import {AccountingHelper} from "../common/persistence/helper/AccountingHelper";
import {MainWindow} from "./MainWindow";
import {Balancing} from "../balancing/entities/Balancing";

type DomainEntityConstructor = { new(domain_helper: typeof DomainHelper): DomainEntity } & typeof DomainEntity;

const domain_factories: Record<string, typeof factories> = {
    accounting: factories,
}

const domain_entities: Record<string, DomainEntityConstructor> = {
    accounting: Accounting,
    balancing: Balancing
}

const domain_helper: Record<string, typeof DomainHelper> = {
    accounting: AccountingHelper
}

function create_domain_entity(
    ctor: DomainEntityConstructor,
    helper: typeof DomainHelper
): DomainEntity {
    return new ctor(helper);
}

function create_domain(domain_name: string, main_window: MainWindow) {

    const observatory = new Observatory();
    const factories = domain_factories[domain_name];
    const helper = domain_helper[domain_name]

    const domain_entity = create_domain_entity(domain_entities[domain_name], helper);

    domain_entity.provide_at(observatory);
    factories.use_case.IPCChannel = main_window.webContents;
    factories.use_case.DomainEntity = domain_entity;
    factories.use_case.Observatory = observatory;
    factories.use_case.UseCases = UseCases;
    return new Domain(domain_name, factories, domain_entity);
}

export class DomainFactory {
    static main_window: MainWindow;

    static create(domain_name: string) {
        return create_domain(domain_name, this.main_window);
    }

    static get_domains() {
        const domains = [];
        for (const domain in domain_factories) {
            domains.push(domain);
        }
        return domains;
    }
}
