const workspaces = {
    accounting: require('../accounting/workspace/AccountingWorkspaceView'),
}
const factories = {
    accounting: require ('../accounting/factories/WorkspaceViewFactory'),
}

class DomainViewFactory {
    static async create_workspace(domain_name: string) {
        // @ts-ignore
        return factories[domain_name]
            // @ts-ignore
            .config(workspaces[domain_name])
            .create();
    }
}

module.exports = {DomainViewFactory};
export {DomainViewFactory}