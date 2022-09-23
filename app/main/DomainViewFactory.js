const WorkspaceViewFactory = require ('../accounting/factories/WorkspaceViewFactory');

const workspaces = {
    accounting: require('../accounting/workspace/AccountingWorkspaceView'),
}

async function create_workspace(domain_name) {
    WorkspaceViewFactory.config(workspaces[domain_name]);
    return await WorkspaceViewFactory.create(domain_name);
}


class DomainViewFactory {
    static async create_workspace(domain_name) {
        return await create_workspace(domain_name);
    }
}

module.exports = DomainViewFactory;