class Domain {
    get domain_name() {
        return this._domain_name;
    }

    constructor(domain_name,factories) {
        this._domain_name = domain_name;
        this._factories = factories;
    }

    create_use_case(use_case_name) {
        return this._factories.use_case.create(use_case_name);
    }

    /*
        const workspaces = {
        accounting:  require("../accounting/workspace/AccountingWorkspaceView"),
    }
    // factories.workspace.config(workspaces[domain_name]);
    // let workspace = await factories.workspace.create(domain_name);

     */
    // get workspace() {
    //     return this._workspace;
    // }

    _factories;
    _workspace;
    _domain_name;
}

module.exports = Domain;