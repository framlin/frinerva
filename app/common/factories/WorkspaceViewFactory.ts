import path from "path";
import {AccountingDomain} from "../../accounting";
import {BalancingDomain} from "../../balancing";
import {InvoicingDomain} from "../../invoicing";
import {ManagementDomain} from "../../management";

const blueprints = {
    accounting: AccountingDomain,
    balancing: BalancingDomain,
    invoicing: InvoicingDomain,
    management: ManagementDomain,
}

export class WorkspaceViewFactory {
    static async create(domain_name: string) {
        const workspace_path = path.join(__dirname, '..', '..', domain_name, 'workspace');
        // @ts-ignore
        const workspace_view = blueprints[domain_name].workspace;
        // @ts-ignore
        const usecase_list = blueprints[domain_name].usecases;
        await workspace_view.create_workspace(usecase_list, domain_name, 'show_list', workspace_path);
        return new workspace_view(usecase_list);
    }
}
