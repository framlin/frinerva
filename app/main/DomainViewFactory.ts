import {BalancingWorkspaceView} from "../balancing/workspace/BalancingWorkspaceView";
import {WorkspaceViewFactory}  from '../common/ui/workspace/WorkspaceViewFactory';
import {AccountingWorkspaceView} from '../accounting/workspace/AccountingWorkspaceView';
import {WorkspaceView} from "../common/ui/workspace/WorkspaceView";

const workspaces : Record<string, typeof WorkspaceView> = {
    accounting: AccountingWorkspaceView,
    balancing: BalancingWorkspaceView,
}

const factories: Record<string, typeof WorkspaceViewFactory> = {
    accounting: WorkspaceViewFactory,
    balancing: WorkspaceViewFactory,
}

export class DomainViewFactory {
    static async create_workspace(domain_name: string) {
        return factories[domain_name]
            // @ts-expect-error
            .config(workspaces[domain_name])
            .create(domain_name);
    }
}
