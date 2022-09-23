
const workspace_views = {
    accounting: async () => {
        await WorkspaceViewFactory.AccountingWorkspace.create_workspace();
        return new WorkspaceViewFactory.AccountingWorkspace();
    }
}

class WorkspaceViewFactory {
    static AccountingWorkspace
    static config(accountingWS) {
        WorkspaceViewFactory.AccountingWorkspace = accountingWS;
    };
    static async create(business_case_name) {
        return await workspace_views[business_case_name]();
    }
}


module.exports = WorkspaceViewFactory;