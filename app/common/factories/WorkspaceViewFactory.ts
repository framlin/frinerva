import {AccountingWorkspaceView} from "../../accounting/workspace/AccountingWorkspaceView";
import {BalancingWorkspaceView} from "../../balancing/workspace/BalancingWorkspaceView";
import {WorkspaceView} from "../ui/workspace/WorkspaceView";


const workspaces : Record<string, typeof WorkspaceView> = {
    accounting: AccountingWorkspaceView,
    balancing: BalancingWorkspaceView,
}


export class WorkspaceViewFactory {
    static AccountingWorkspace: typeof AccountingWorkspaceView

    static config(accountingWS: typeof AccountingWorkspaceView) {
        WorkspaceViewFactory.AccountingWorkspace = accountingWS;
        return WorkspaceViewFactory;
    };

    static async create(domain_name: string) {
        const WorkspaceView = workspaces[domain_name];
        await WorkspaceView.create_workspace(domain_name);
        return new WorkspaceView();
    }
}
