class WorkspaceViewFactory {
    static AccountingWorkspace
    static config(accountingWS) {
        WorkspaceViewFactory.AccountingWorkspace = accountingWS;
        return WorkspaceViewFactory;
    };
    static async create() {
        console.log("FACTORY: CREATE WORKSPACE")
        await WorkspaceViewFactory.AccountingWorkspace.create_workspace();
        return new WorkspaceViewFactory.AccountingWorkspace();
    }
}


module.exports = WorkspaceViewFactory;