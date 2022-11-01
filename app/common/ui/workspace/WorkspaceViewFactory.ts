import {AccountingWorkspaceView} from "../../../accounting/workspace/AccountingWorkspaceView";

export class WorkspaceViewFactory {
    static AccountingWorkspace: typeof AccountingWorkspaceView

    static config(accountingWS: typeof AccountingWorkspaceView) {
        WorkspaceViewFactory.AccountingWorkspace = accountingWS;
        return WorkspaceViewFactory;
    };

    static async create(domain_name: string) {
        await WorkspaceViewFactory.AccountingWorkspace.create_workspace(domain_name);
        return new WorkspaceViewFactory.AccountingWorkspace();
    }
}
