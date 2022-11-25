import {AccountingDomain} from "../../accounting";
import {BalancingDomain} from "../../balancing";
import {InvoicingDomain} from "../../invoicing";
import {MainWindow} from "../../main/MainWindow";
import {ManagementDomain} from "../../management";
import {Domain} from '../domain/Domain';
import {DomainEntity} from "../domain/DomainEntity";
import {DomainHelper} from "../domain/DomainHelper";
import {Observatory} from "../observation/Observatory";
import {create_use_case_factory} from "./UseCaseFactory";

type DomainEntityConstructor = { new(domain_helper: typeof DomainHelper): DomainEntity } & typeof DomainEntity;

const blueprints = {
    accounting: AccountingDomain,
    balancing: BalancingDomain,
    invoicing: InvoicingDomain,
    management: ManagementDomain,
}

function create_domain_entity(
    ctor: DomainEntityConstructor,
    helper: typeof DomainHelper
): DomainEntity {
    return new ctor(helper);
}

function create_domain(domain_name: string, main_window: MainWindow) {
    const observatory = new Observatory();

    // @ts-ignore
    const helper = blueprints[domain_name].helper;

    // @ts-ignore
    const usecases = blueprints[domain_name].usecases;

    // @ts-ignore
    const domain_entity = create_domain_entity(blueprints[domain_name].entity, helper);
    if (domain_entity.provide_at) {
        domain_entity.provide_at(observatory);
    }


    const use_case_factory = create_use_case_factory(
        domain_name,
        domain_entity,
        usecases,
        main_window.webContents,
        observatory
    );

    return new Domain(domain_name, use_case_factory, domain_entity);
}

export class DomainFactory {
    static main_window: MainWindow;

    static create(domain_name: string) {
        return create_domain(domain_name, this.main_window);
    }

    static get_domains() {
        const domains = [];
        for (const domain in blueprints) {
            domains.push(domain);
        }
        return domains;
    }
}
