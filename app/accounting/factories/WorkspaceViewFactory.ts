class WorkspaceViewFactory {
    static AccountingWorkspace: any
    static config(accountingWS: any) {
        WorkspaceViewFactory.AccountingWorkspace = accountingWS;
        return WorkspaceViewFactory;
    };
    static async create() {
        await WorkspaceViewFactory.AccountingWorkspace.create_workspace();
        return new WorkspaceViewFactory.AccountingWorkspace();
    }
}


module.exports = {WorkspaceViewFactory};
export {WorkspaceViewFactory}