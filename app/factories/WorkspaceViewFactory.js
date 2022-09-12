
const workspace_views = {
    accounting: async (partials_path) => {
        await WorkspaceViewFactory.AccountingWorkspace.create_workspace();
    }
}

class WorkspaceViewFactory {
    static AccountingWorkspace
    static config(accountingWS) {
        WorkspaceViewFactory.AccountingWorkspace = accountingWS;
    };
    static async create(business_case_name, partials_path) {
        await workspace_views[business_case_name](partials_path);
    }
}


module.exports = WorkspaceViewFactory;