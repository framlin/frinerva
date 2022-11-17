import {Accounting} from "../../accounting/entites/Accounting";
import {UseCases as AccountingUseCases} from "../../accounting/usecases";
import {Balancing} from "../../balancing/entities/Balancing";
import {UseCases as BalancingUseCases} from "../../balancing/usecases";
import {Domain} from '../domain/Domain';
import {DomainEntity} from "../domain/DomainEntity";
import {DomainHelper} from "../domain/DomainHelper";
import {create_use_case_factory} from "./UseCaseFactory";
import {Observatory} from "../observation/Observatory";
import {AccountingHelper} from "../persistence/helper/AccountingHelper";
import {BalancingHelper} from "../persistence/helper/BalancingHelper";
import {UseCaseList} from "../usecase/UseCaseList";
import {MainWindow} from "../../main/MainWindow";

type DomainEntityConstructor = { new(domain_helper: typeof DomainHelper): DomainEntity } & typeof DomainEntity;

const use_cases: Record<string, UseCaseList> = {
    accounting: AccountingUseCases,
    balancing: BalancingUseCases,
};

const domain_entities: Record<string, DomainEntityConstructor> = {
    accounting: Accounting,
    balancing: Balancing
}

const domain_helper: Record<string, typeof DomainHelper> = {
    accounting: AccountingHelper,
    balancing: BalancingHelper
}

function create_domain_entity(
    ctor: DomainEntityConstructor,
    helper: typeof DomainHelper
): DomainEntity {
    return new ctor(helper);
}

function create_domain(domain_name: string, main_window: MainWindow) {
    console.log(`Creating domain ${domain_name}`);

    const observatory = new Observatory();
    const helper = domain_helper[domain_name]
    const domain_entity = create_domain_entity(domain_entities[domain_name], helper);
    domain_entity.provide_at(observatory);

    const use_case_factory = create_use_case_factory(domain_entity, use_cases[domain_name], main_window.webContents, observatory);

    return new Domain(domain_name, use_case_factory, domain_entity);
}

export class DomainFactory {
    static main_window: MainWindow;

    static create(domain_name: string) {
        return create_domain(domain_name, this.main_window);
    }

    static get_domains() {
        const domains = [];
        for (const domain in use_cases) {
            domains.push(domain);
        }
        return domains;
    }
}
