import {AccountingWorkspaceView} from "../../../accounting/workspace/AccountingWorkspaceView";

export class WorkspaceViewFactory {
    static AccountingWorkspace: typeof AccountingWorkspaceView

    static config(accountingWS: typeof AccountingWorkspaceView) {
        WorkspaceViewFactory.AccountingWorkspace = accountingWS;
        return WorkspaceViewFactory;
    };

    static async create() {
        await WorkspaceViewFactory.AccountingWorkspace.create_workspace();
        return new WorkspaceViewFactory.AccountingWorkspace();
    }
}
